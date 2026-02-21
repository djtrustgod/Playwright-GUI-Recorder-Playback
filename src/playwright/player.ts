import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import * as vscode from 'vscode';
import { Database, ActionRecord } from '../storage/database';
import { FileManager } from '../storage/fileManager';
import { SelfHealingResolver, LocatorStrategies } from './selfHealing';

export interface PlayerDependencies {
  secrets?: vscode.SecretStorage;
}

export interface PlaybackOptions {
  headless?: boolean;
  slowMo?: number;
  browser?: 'chromium' | 'firefox' | 'webkit';
}

export interface StepResult {
  stepIndex: number;
  actionType: string;
  status: 'success' | 'healed' | 'failed';
  strategy: string;
  durationMs: number;
  screenshotPath?: string;
  error?: string;
  healedFrom?: string;
  healedTo?: string;
}

type StepCallback = (result: StepResult) => void;

export class Player {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private isPlaying = false;
  private shouldStop = false;

  constructor(
    private readonly db: Database,
    private readonly fileManager: FileManager,
    private readonly deps: PlayerDependencies = {}
  ) {}

  async play(
    recordingId: string,
    options: PlaybackOptions = {},
    onStep?: StepCallback
  ): Promise<StepResult[]> {
    if (this.isPlaying) {
      throw new Error('Already playing. Stop the current playback first.');
    }

    const recording = this.db.getRecording(recordingId);
    if (!recording) {
      throw new Error(`Recording ${recordingId} not found.`);
    }

    const actions = this.db.getActions(recordingId);
    if (actions.length === 0) {
      throw new Error('Recording has no actions.');
    }

    this.isPlaying = true;
    this.shouldStop = false;

    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const headless = options.headless ?? config.get<boolean>('headless', false);
    const slowMo = options.slowMo ?? config.get<number>('slowMo', 0);
    const browserType = options.browser ?? config.get<string>('defaultBrowser', 'chromium');

    // Initialize self-healing resolver
    const resolver = new SelfHealingResolver(this.db, {
      enabled: config.get<boolean>('selfHealing.enabled', true),
      embeddingThreshold: config.get<number>('selfHealing.embeddingThreshold', 0.85),
      llmEnabled: config.get<boolean>('selfHealing.llmEnabled', false),
    }, this.deps.secrets);

    // Launch browser
    const engines = { chromium, firefox, webkit };
    const engine = engines[browserType as keyof typeof engines] || chromium;

    this.browser = await engine.launch({ headless, slowMo });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });

    // Load auth state if available
    if (recording.auth_state_path) {
      try {
        const authState = await this.fileManager.loadAuthState(recordingId);
        if (authState) {
          this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 },
            storageState: authState as string,
          });
        }
      } catch {
        // Auth state load is best-effort
      }
    }

    // Register overlay dismissal handlers
    this.page = await this.context.newPage();
    await this.registerOverlayHandlers(this.page);

    // Start tracing for this playback
    await this.context.tracing.start({ screenshots: true, snapshots: true });

    // Create execution record
    const executionId = this.db.createExecution({
      recording_id: recordingId,
      started_at: new Date().toISOString(),
      status: 'running',
      trigger: 'manual',
    });

    const results: StepResult[] = [];

    try {
      // Navigate to the recording's start URL
      await this.page.goto(recording.url, { waitUntil: 'domcontentloaded' });

      // Execute each action
      for (let i = 0; i < actions.length; i++) {
        if (this.shouldStop) {
          break;
        }

        const action = actions[i];
        const stepStart = Date.now();

        try {
          const result = await this.executeAction(this.page, action, resolver, recordingId);
          const stepResult: StepResult = {
            stepIndex: i,
            actionType: action.action_type,
            status: result.healed ? 'healed' : 'success',
            strategy: result.strategy,
            durationMs: Date.now() - stepStart,
          };

          // Capture screenshot after each step
          try {
            const screenshotPath = this.fileManager.getStepScreenshotPath(recordingId, i);
            await this.page.screenshot({ path: screenshotPath });
            stepResult.screenshotPath = screenshotPath;
          } catch {
            // Screenshot is best-effort
          }

          results.push(stepResult);
          onStep?.(stepResult);
        } catch (err) {
          const stepResult: StepResult = {
            stepIndex: i,
            actionType: action.action_type,
            status: 'failed',
            strategy: 'none',
            durationMs: Date.now() - stepStart,
            error: (err as Error).message,
          };

          // Capture failure screenshot
          try {
            const screenshotPath = this.fileManager.getStepScreenshotPath(recordingId, i);
            await this.page.screenshot({ path: screenshotPath });
            stepResult.screenshotPath = screenshotPath;
          } catch {
            // Screenshot is best-effort
          }

          results.push(stepResult);
          onStep?.(stepResult);

          // Update execution as failed
          this.db.updateExecution(executionId, {
            finished_at: new Date().toISOString(),
            status: 'fail',
            failure_step: i,
            error_message: (err as Error).message,
          });

          throw err;
        }

        // Apply slowMo between steps
        if (slowMo > 0 && i < actions.length - 1) {
          await new Promise(resolve => setTimeout(resolve, slowMo));
        }
      }

      // All steps passed
      this.db.updateExecution(executionId, {
        finished_at: new Date().toISOString(),
        status: 'pass',
      });

    } finally {
      // Save playback trace
      try {
        const tracePath = this.fileManager.getPlaybackTracePath(recordingId, executionId);
        await this.context.tracing.stop({ path: tracePath });
      } catch {
        // Trace save is best-effort
      }

      await this.cleanup();
    }

    return results;
  }

  /** Execute a single recorded action on the page */
  private async executeAction(
    page: Page,
    action: ActionRecord,
    resolver: SelfHealingResolver,
    recordingId: string
  ): Promise<{ healed: boolean; strategy: string }> {
    const locators: LocatorStrategies = JSON.parse(action.locators);

    switch (action.action_type) {
      case 'navigation': {
        await page.goto(action.url, { waitUntil: 'domcontentloaded' });
        return { healed: false, strategy: 'navigation' };
      }

      case 'scroll': {
        await page.evaluate(
          ({ x, y }) => window.scrollTo(x, y),
          { x: 0, y: 0 } // Would use stored scroll position
        );
        return { healed: false, strategy: 'scroll' };
      }

      case 'click':
      case 'dblclick': {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        if (action.action_type === 'dblclick') {
          await resolution.locator.dblclick({ timeout: 10000 });
        } else {
          await resolution.locator.click({ timeout: 10000 });
        }
        return { healed: resolution.healed, strategy: resolution.strategy };
      }

      case 'input':
      case 'change': {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        // Extract value from locators fingerprint
        const value = locators.fingerprint?.value || '';
        await resolution.locator.fill(value, { timeout: 10000 });
        return { healed: resolution.healed, strategy: resolution.strategy };
      }

      case 'keydown': {
        const key = locators.fingerprint?.value || 'Enter';
        await page.keyboard.press(key);
        return { healed: false, strategy: 'keyboard' };
      }

      case 'select': {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        const value = locators.fingerprint?.value || '';
        await resolution.locator.selectOption(value, { timeout: 10000 });
        return { healed: resolution.healed, strategy: resolution.strategy };
      }

      case 'submit': {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        await resolution.locator.press('Enter', { timeout: 10000 });
        return { healed: resolution.healed, strategy: resolution.strategy };
      }

      default: {
        // Unknown action type — skip
        return { healed: false, strategy: 'skipped' };
      }
    }
  }

  /** Register overlay dismissal handlers from extension settings */
  private async registerOverlayHandlers(page: Page): Promise<void> {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const dismissals = config.get<Array<{ detector: string; action: string }>>('overlayDismissals', []);

    for (const rule of dismissals) {
      try {
        await page.addLocatorHandler(
          page.locator(rule.detector),
          async () => {
            try {
              await page.locator(rule.action).click({ timeout: 5000 });
            } catch {
              // Dismissal action failed — not critical
            }
          }
        );
      } catch {
        // Handler registration failed — not critical
      }
    }
  }

  async stop(): Promise<void> {
    this.shouldStop = true;
  }

  private async cleanup(): Promise<void> {
    await this.page?.close().catch(() => {});
    await this.context?.close().catch(() => {});
    await this.browser?.close().catch(() => {});
    this.page = null;
    this.context = null;
    this.browser = null;
    this.isPlaying = false;
    this.shouldStop = false;
  }

  dispose(): void {
    this.shouldStop = true;
    this.cleanup();
  }
}
