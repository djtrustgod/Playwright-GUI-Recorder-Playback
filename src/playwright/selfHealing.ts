import { Page, Locator } from 'playwright';
import * as vscode from 'vscode';
import { RecordedAction } from './recorder';
import { Database } from '../storage/database';
import { LlmRepair } from '../ai/llmRepair';
import { LocatorEmbeddings } from '../ai/locatorEmbeddings';

/** Fingerprint of a DOM element captured at record time */
export interface ElementFingerprint {
  tag: string;
  id: string | null;
  classes: string[];
  text: string;
  innerText: string;
  placeholder: string | null;
  ariaLabel: string | null;
  ariaRole: string;
  testId: string | null;
  name: string | null;
  type: string | null;
  href: string | null;
  value: string | null;
  boundingRect: { x: number; y: number; width: number; height: number };
  parentTag: string | null;
  parentId: string | null;
  parentClasses: string[];
  labels: string[];
  childIndex: number;
}

/** All locator strategies for an element, generated at record time */
export interface LocatorStrategies {
  testId: string | null;
  role: { role: string; name: string } | null;
  label: string | null;
  text: string | null;
  placeholder: string | null;
  css: string | null;
  xpath: string | null;
  fingerprint: ElementFingerprint | null;
}

/** Result of resolving a locator during playback */
export interface LocatorResolution {
  locator: Locator;
  strategy: string;
  healed: boolean;
  originalStrategy?: string;
}

/** Generate all locator strategies from a recorded action */
export function generateLocators(action: RecordedAction): LocatorStrategies {
  const fp = action.fingerprint;
  if (!fp) {
    return {
      testId: null,
      role: null,
      label: null,
      text: null,
      placeholder: null,
      css: action.cssSelector || null,
      xpath: action.xpath || null,
      fingerprint: null,
    };
  }

  return {
    testId: fp.testId,
    role: fp.ariaRole
      ? { role: fp.ariaRole, name: fp.ariaLabel || fp.innerText?.substring(0, 50) || '' }
      : null,
    label: fp.labels?.[0] || null,
    text: fp.innerText?.substring(0, 100) || null,
    placeholder: fp.placeholder,
    css: action.cssSelector || null,
    xpath: action.xpath || null,
    fingerprint: fp,
  };
}

/**
 * Tiered self-healing selector resolution.
 *
 * Tier 1: Direct locator match (testId → role → label → text → placeholder → css → xpath)
 * Tier 2: Embedding similarity via local MiniLM model
 * Tier 3: LLM-based selector repair
 */
export class SelfHealingResolver {
  private embeddings: LocatorEmbeddings | null = null;
  private llmRepair: LlmRepair | null = null;

  constructor(
    private readonly db: Database,
    private readonly config: {
      enabled: boolean;
      embeddingThreshold: number;
      llmEnabled: boolean;
    },
    private readonly secrets?: vscode.SecretStorage
  ) {}

  async resolve(
    page: Page,
    locators: LocatorStrategies,
    recordingId: string,
    stepIndex: number
  ): Promise<LocatorResolution> {
    // Check if we have a cached healed selector for this step
    const cached = this.db.getHealedSelector(recordingId, stepIndex);
    if (cached) {
      try {
        const locator = page.locator(cached.healed_locator);
        if (await locator.count() === 1) {
          this.db.incrementHealedSelectorSuccess(cached.id);
          return { locator, strategy: `cached:${cached.strategy_used}`, healed: true };
        }
      } catch {
        // Cached selector no longer works, continue with normal resolution
      }
    }

    // Tier 1: Direct locator match
    const tier1Result = await this.tryDirectLocators(page, locators);
    if (tier1Result) {
      return tier1Result;
    }

    if (!this.config.enabled) {
      throw new Error(
        `No element found for step ${stepIndex}. Self-healing is disabled.`
      );
    }

    // Tier 2: Embedding similarity
    if (locators.fingerprint) {
      const tier2Result = await this.tryEmbeddingSimilarity(page, locators.fingerprint);
      if (tier2Result) {
        // Cache the healed selector
        this.cacheHealedSelector(recordingId, stepIndex, locators, tier2Result);
        return tier2Result;
      }
    }

    // Tier 3: LLM repair
    if (this.config.llmEnabled && locators.fingerprint) {
      const tier3Result = await this.tryLlmRepair(page, locators);
      if (tier3Result) {
        this.cacheHealedSelector(recordingId, stepIndex, locators, tier3Result);
        return tier3Result;
      }
    }

    throw new Error(
      `Self-healing failed: no element found for step ${stepIndex} after all tiers.`
    );
  }

  /** Tier 1: Try each locator strategy in priority order */
  private async tryDirectLocators(
    page: Page,
    locators: LocatorStrategies
  ): Promise<LocatorResolution | null> {
    const strategies: Array<{ name: string; getLocator: () => Locator | null }> = [
      {
        name: 'testId',
        getLocator: () => locators.testId ? page.getByTestId(locators.testId) : null,
      },
      {
        name: 'role',
        getLocator: () =>
          locators.role
            ? page.getByRole(locators.role.role as any, { name: locators.role.name })
            : null,
      },
      {
        name: 'label',
        getLocator: () => locators.label ? page.getByLabel(locators.label) : null,
      },
      {
        name: 'text',
        getLocator: () => locators.text ? page.getByText(locators.text, { exact: false }) : null,
      },
      {
        name: 'placeholder',
        getLocator: () =>
          locators.placeholder ? page.getByPlaceholder(locators.placeholder) : null,
      },
      {
        name: 'css',
        getLocator: () => locators.css ? page.locator(locators.css) : null,
      },
      {
        name: 'xpath',
        getLocator: () => locators.xpath ? page.locator(`xpath=${locators.xpath}`) : null,
      },
    ];

    for (const { name, getLocator } of strategies) {
      try {
        const locator = getLocator();
        if (!locator) continue;
        const count = await locator.count();
        if (count === 1) {
          return { locator, strategy: name, healed: false };
        }
        // If multiple matches, try to narrow down
        if (count > 1 && locators.fingerprint) {
          const first = locator.first();
          return { locator: first, strategy: `${name}:first`, healed: false };
        }
      } catch {
        // Locator threw, try next strategy
        continue;
      }
    }

    return null;
  }

  /** Tier 2: Find element by embedding similarity */
  private async tryEmbeddingSimilarity(
    page: Page,
    fingerprint: ElementFingerprint
  ): Promise<LocatorResolution | null> {
    try {
      if (!this.embeddings) {
        this.embeddings = new LocatorEmbeddings();
        await this.embeddings.initialize();
      }

      const bestMatch = await this.embeddings.findMostSimilar(page, fingerprint, this.config.embeddingThreshold);
      if (bestMatch) {
        return {
          locator: bestMatch.locator,
          strategy: `embedding:${bestMatch.similarity.toFixed(3)}`,
          healed: true,
        };
      }
    } catch {
      // Embedding model not available or failed
    }
    return null;
  }

  /** Tier 3: Ask LLM to repair the selector */
  private async tryLlmRepair(
    page: Page,
    locators: LocatorStrategies
  ): Promise<LocatorResolution | null> {
    try {
      if (!this.llmRepair) {
        this.llmRepair = new LlmRepair(this.secrets);
      }

      const repairedSelector = await this.llmRepair.repairSelector(page, locators);
      if (repairedSelector) {
        const locator = page.locator(repairedSelector);
        if ((await locator.count()) >= 1) {
          return {
            locator: locator.first(),
            strategy: 'llm',
            healed: true,
          };
        }
      }
    } catch {
      // LLM repair failed
    }
    return null;
  }

  /** Cache a healed selector for future runs */
  private cacheHealedSelector(
    recordingId: string,
    stepIndex: number,
    originalLocators: LocatorStrategies,
    resolution: LocatorResolution
  ): void {
    const originalLocator =
      originalLocators.testId ||
      originalLocators.css ||
      originalLocators.xpath ||
      'unknown';

    // We need to extract the selector string from the resolved locator
    // This is a simplification — in practice we'd need the actual selector string
    this.db.createHealedSelector({
      recording_id: recordingId,
      step_index: stepIndex,
      original_locator: originalLocator,
      healed_locator: `[healed:${resolution.strategy}]`, // Placeholder — real impl would extract selector
      strategy_used: resolution.strategy,
    });
  }
}
