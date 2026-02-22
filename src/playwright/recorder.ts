import type { Browser, BrowserContext, Page } from 'playwright';
import { v4 as uuidv4 } from 'uuid';
import { Database, Recording, ActionRecord } from '../storage/database';
import { FileManager } from '../storage/fileManager';
import { generateLocators, ElementFingerprint } from './selfHealing';

/** Script injected into every page to capture user interactions */
const CAPTURE_SCRIPT = `
(() => {
  const RPA_EVENTS = ['click', 'dblclick', 'input', 'change', 'submit', 'keydown', 'select', 'scroll'];

  function getElementFingerprint(el) {
    const rect = el.getBoundingClientRect();
    const labels = el.labels ? Array.from(el.labels).map(l => l.textContent?.trim()) : [];
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      classes: Array.from(el.classList),
      text: (el.textContent || '').trim().substring(0, 200),
      innerText: (el.innerText || '').trim().substring(0, 200),
      placeholder: el.placeholder || null,
      ariaLabel: el.getAttribute('aria-label') || null,
      ariaRole: el.getAttribute('role') || el.tagName.toLowerCase(),
      testId: el.getAttribute('data-testid') || el.getAttribute('data-test') || null,
      name: el.getAttribute('name') || null,
      type: el.getAttribute('type') || null,
      href: el.getAttribute('href') || null,
      value: el.value || null,
      boundingRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      parentTag: el.parentElement?.tagName.toLowerCase() || null,
      parentId: el.parentElement?.id || null,
      parentClasses: el.parentElement ? Array.from(el.parentElement.classList) : [],
      labels,
      childIndex: el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0,
    };
  }

  function createXPath(el) {
    const parts = [];
    let current = el;
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let index = 1;
      let sibling = current.previousElementSibling;
      while (sibling) {
        if (sibling.tagName === current.tagName) index++;
        sibling = sibling.previousElementSibling;
      }
      parts.unshift(current.tagName.toLowerCase() + '[' + index + ']');
      current = current.parentElement;
    }
    return '/' + parts.join('/');
  }

  function createCssSelector(el) {
    if (el.id) return '#' + CSS.escape(el.id);
    const parts = [];
    let current = el;
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      if (current.id) {
        selector = '#' + CSS.escape(current.id);
        parts.unshift(selector);
        break;
      }
      if (current.className && typeof current.className === 'string') {
        const classes = current.className.trim().split(/\\s+/).slice(0, 3);
        if (classes.length) selector += '.' + classes.map(c => CSS.escape(c)).join('.');
      }
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
        if (siblings.length > 1) {
          const idx = siblings.indexOf(current) + 1;
          selector += ':nth-of-type(' + idx + ')';
        }
      }
      parts.unshift(selector);
      current = current.parentElement;
    }
    return parts.join(' > ');
  }

  for (const eventType of RPA_EVENTS) {
    document.addEventListener(eventType, (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Debounce scroll events
      if (eventType === 'scroll') {
        if (window.__rpaScrollTimeout) clearTimeout(window.__rpaScrollTimeout);
        window.__rpaScrollTimeout = setTimeout(() => {
          window.__rpaEvent(JSON.stringify({
            type: 'scroll',
            url: window.location.href,
            timestamp: Date.now(),
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            fingerprint: getElementFingerprint(target),
            cssSelector: createCssSelector(target),
            xpath: createXPath(target),
          }));
        }, 300);
        return;
      }

      const payload = {
        type: eventType,
        url: window.location.href,
        timestamp: Date.now(),
        value: target.value || null,
        key: e.key || null,
        fingerprint: getElementFingerprint(target),
        cssSelector: createCssSelector(target),
        xpath: createXPath(target),
      };

      window.__rpaEvent(JSON.stringify(payload));
    }, { capture: true, passive: true });
  }

  // Capture navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    window.__rpaEvent(JSON.stringify({
      type: 'navigation',
      url: window.location.href,
      timestamp: Date.now(),
    }));
  };
})();
`;

export interface RecordedAction {
  type: string;
  url: string;
  timestamp: number;
  value?: string | null;
  key?: string | null;
  scrollX?: number;
  scrollY?: number;
  fingerprint?: ElementFingerprint;
  cssSelector?: string;
  xpath?: string;
}

type ActionCallback = (action: RecordedAction) => void;

export class Recorder {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private actions: RecordedAction[] = [];
  private currentRecordingId: string | null = null;
  private actionCallbacks: ActionCallback[] = [];
  private startTime = 0;
  private isRecording = false;

  constructor(
    private readonly db: Database,
    private readonly fileManager: FileManager
  ) {}

  onAction(callback: ActionCallback): void {
    this.actionCallbacks.push(callback);
  }

  private emitAction(action: RecordedAction): void {
    for (const cb of this.actionCallbacks) {
      cb(action);
    }
  }

  async start(url: string, browserType = 'chromium', saveAuth = false): Promise<string> {
    if (this.isRecording) {
      throw new Error('Already recording. Stop the current recording first.');
    }

    const recordingId = uuidv4();
    this.currentRecordingId = recordingId;
    this.actions = [];
    this.startTime = Date.now();
    this.isRecording = true;

    // Lazy-load playwright to avoid top-level require (breaks sideloaded VSIX)
    const pw = await import('playwright');
    const engines = { chromium: pw.chromium, firefox: pw.firefox, webkit: pw.webkit };
    const engine = engines[browserType as keyof typeof engines] || pw.chromium;

    this.browser = await engine.launch({
      headless: false,
      slowMo: 0,
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: undefined, // Could enable video recording
    });

    // Start tracing
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
    });

    this.page = await this.context.newPage();

    // Expose the event callback before navigating
    await this.page.exposeFunction('__rpaEvent', (eventJson: string) => {
      try {
        const action: RecordedAction = JSON.parse(eventJson);
        this.actions.push(action);
        this.emitAction(action);
      } catch {
        // Ignore parse errors from the injected script
      }
    });

    // Inject DOM event capture script
    await this.context.addInitScript(CAPTURE_SCRIPT);

    // Navigate to the target URL
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });

    // Create the recording entry in the database
    this.db.createRecording({
      id: recordingId,
      name: `Recording ${new Date().toLocaleString()}`,
      url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: '',
      description: '',
      action_count: 0,
      duration_ms: 0,
      auth_state_path: null,
    });

    return recordingId;
  }

  async stop(): Promise<Recording | null> {
    if (!this.isRecording || !this.currentRecordingId) {
      return null;
    }

    const recordingId = this.currentRecordingId;
    const duration = Date.now() - this.startTime;

    // Save auth state if configured
    let authStatePath: string | null = null;
    if (this.context) {
      try {
        const storageState = await this.context.storageState();
        authStatePath = await this.fileManager.saveAuthState(recordingId, storageState);
      } catch {
        // Auth state save is best-effort
      }
    }

    // Stop tracing and save the trace ZIP
    if (this.context) {
      const tracePath = this.fileManager.getTracePath(recordingId);
      await this.context.tracing.stop({ path: tracePath });
    }

    // Save actions to the database
    for (let i = 0; i < this.actions.length; i++) {
      const action = this.actions[i];
      const locators = generateLocators(action);

      this.db.createAction({
        id: uuidv4(),
        recording_id: recordingId,
        step_index: i,
        action_type: action.type,
        url: action.url,
        locators: JSON.stringify(locators),
        screenshot_path: null,
        timestamp_ms: action.timestamp - this.startTime,
      });
    }

    // Save actions JSON file
    await this.fileManager.saveActionsJson(recordingId, this.actions);

    // Update recording metadata
    this.db.updateRecording(recordingId, {
      action_count: this.actions.length,
      duration_ms: duration,
      auth_state_path: authStatePath,
      updated_at: new Date().toISOString(),
    });

    // Clean up browser
    await this.page?.close().catch(() => {});
    await this.context?.close().catch(() => {});
    await this.browser?.close().catch(() => {});

    this.browser = null;
    this.context = null;
    this.page = null;
    this.isRecording = false;
    this.actionCallbacks = [];

    const recording = this.db.getRecording(recordingId);
    this.currentRecordingId = null;
    return recording;
  }

  dispose(): void {
    this.page?.close().catch(() => {});
    this.context?.close().catch(() => {});
    this.browser?.close().catch(() => {});
    this.isRecording = false;
  }
}
