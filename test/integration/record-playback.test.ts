/**
 * Integration test: Record interactions against the fixture HTML page,
 * verify actions are captured and stored, then verify the locators
 * can resolve elements on the page.
 *
 * This test uses Playwright directly (not through the VS Code extension)
 * to validate the core recording and locator logic end-to-end.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Database } from '../../src/storage/database';
import { generateLocators, LocatorStrategies } from '../../src/playwright/selfHealing';
import { RecordedAction } from '../../src/playwright/recorder';

const FIXTURE_PATH = path.resolve(__dirname, '../fixtures/test-page.html');

describe('Record and Playback Integration', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let db: Database;
  let tempDir: string;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rpa-integration-'));
    db = new Database(tempDir);
    await db.waitReady();

    context = await browser.newContext();
    page = await context.newPage();
  });

  afterEach(async () => {
    await page.close();
    await context.close();
    db.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe('DOM event capture', () => {
    it('should capture click events via the injected script', async () => {
      const capturedEvents: RecordedAction[] = [];

      // Expose the callback the capture script sends events to
      await page.exposeFunction('__rpaEvent', (eventJson: string) => {
        capturedEvents.push(JSON.parse(eventJson));
      });

      // Inject the capture script (extracted from recorder.ts)
      await page.addInitScript(getCaptureScript());

      await page.goto(`file://${FIXTURE_PATH}`);

      // Click the submit button
      await page.click('[data-testid="submit-btn"]');

      // Wait for event to be captured
      await page.waitForTimeout(100);

      const clickEvents = capturedEvents.filter(e => e.type === 'click');
      expect(clickEvents.length).toBeGreaterThanOrEqual(1);

      const submitClick = clickEvents.find(e =>
        e.fingerprint?.testId === 'submit-btn'
      );
      expect(submitClick).toBeDefined();
      expect(submitClick!.fingerprint!.tag).toBe('button');
      expect(submitClick!.fingerprint!.ariaLabel).toBe('Submit form');
    });

    it('should capture input events', async () => {
      const capturedEvents: RecordedAction[] = [];

      await page.exposeFunction('__rpaEvent', (eventJson: string) => {
        capturedEvents.push(JSON.parse(eventJson));
      });
      await page.addInitScript(getCaptureScript());
      await page.goto(`file://${FIXTURE_PATH}`);

      await page.fill('[data-testid="username-input"]', 'testuser');
      await page.waitForTimeout(100);

      const inputEvents = capturedEvents.filter(e => e.type === 'input');
      expect(inputEvents.length).toBeGreaterThanOrEqual(1);

      const usernameInput = inputEvents.find(e =>
        e.fingerprint?.testId === 'username-input'
      );
      expect(usernameInput).toBeDefined();
      expect(usernameInput!.fingerprint!.tag).toBe('input');
    });

    it('should generate element fingerprints with all fields', async () => {
      const capturedEvents: RecordedAction[] = [];

      await page.exposeFunction('__rpaEvent', (eventJson: string) => {
        capturedEvents.push(JSON.parse(eventJson));
      });
      await page.addInitScript(getCaptureScript());
      await page.goto(`file://${FIXTURE_PATH}`);

      await page.click('[data-testid="submit-btn"]');
      await page.waitForTimeout(100);

      const clickEvent = capturedEvents.find(e =>
        e.type === 'click' && e.fingerprint?.testId === 'submit-btn'
      )!;

      const fp = clickEvent.fingerprint!;
      expect(fp.tag).toBe('button');
      expect(fp.testId).toBe('submit-btn');
      expect(fp.ariaLabel).toBe('Submit form');
      expect(fp.ariaRole).toBe('button');
      expect(fp.boundingRect).toBeDefined();
      expect(fp.boundingRect.width).toBeGreaterThan(0);
      expect(fp.cssSelector).toBeUndefined(); // cssSelector is on the action, not the fingerprint
      expect(clickEvent.cssSelector).toBeDefined();
      expect(clickEvent.xpath).toBeDefined();
    });
  });

  describe('Locator generation', () => {
    it('should generate locators from captured actions', async () => {
      const capturedEvents: RecordedAction[] = [];

      await page.exposeFunction('__rpaEvent', (eventJson: string) => {
        capturedEvents.push(JSON.parse(eventJson));
      });
      await page.addInitScript(getCaptureScript());
      await page.goto(`file://${FIXTURE_PATH}`);

      await page.click('[data-testid="submit-btn"]');
      await page.waitForTimeout(100);

      const clickEvent = capturedEvents.find(e =>
        e.type === 'click' && e.fingerprint?.testId === 'submit-btn'
      )!;

      const locators = generateLocators(clickEvent);

      expect(locators.testId).toBe('submit-btn');
      expect(locators.role).toEqual({ role: 'button', name: 'Submit form' });
      expect(locators.text).toBeTruthy();
      expect(locators.css).toBeTruthy();
      expect(locators.xpath).toBeTruthy();
      expect(locators.fingerprint).toBeTruthy();
    });

    it('should generate locators that resolve to the correct element', async () => {
      const capturedEvents: RecordedAction[] = [];

      await page.exposeFunction('__rpaEvent', (eventJson: string) => {
        capturedEvents.push(JSON.parse(eventJson));
      });
      await page.addInitScript(getCaptureScript());
      await page.goto(`file://${FIXTURE_PATH}`);

      await page.click('[data-testid="submit-btn"]');
      await page.waitForTimeout(100);

      const clickEvent = capturedEvents.find(e =>
        e.type === 'click' && e.fingerprint?.testId === 'submit-btn'
      )!;
      const locators = generateLocators(clickEvent);

      // Verify each locator strategy resolves to exactly 1 element
      if (locators.testId) {
        const count = await page.getByTestId(locators.testId).count();
        expect(count).toBe(1);
      }

      if (locators.role) {
        const count = await page.getByRole(locators.role.role as any, { name: locators.role.name }).count();
        expect(count).toBe(1);
      }

      if (locators.css) {
        const count = await page.locator(locators.css).count();
        expect(count).toBeGreaterThanOrEqual(1);
      }

      if (locators.xpath) {
        const count = await page.locator(`xpath=${locators.xpath}`).count();
        expect(count).toBe(1);
      }
    });
  });

  describe('Self-healing scenario', () => {
    it('should find element by testId when css selector changes', async () => {
      // Simulate: record with one CSS selector, then page changes CSS but testId stays
      const locators: LocatorStrategies = {
        testId: 'submit-btn',
        role: { role: 'button', name: 'Submit form' },
        label: null,
        text: 'Submit',
        placeholder: null,
        css: '#old-nonexistent-id',  // Broken CSS selector
        xpath: '/html/body/form/button[99]',  // Broken XPath
        fingerprint: null,
      };

      await page.goto(`file://${FIXTURE_PATH}`);

      // Tier 1 should find it by testId even though css and xpath are broken
      const byTestId = page.getByTestId(locators.testId!);
      expect(await byTestId.count()).toBe(1);
      expect(await byTestId.textContent()).toContain('Submit');
    });

    it('should find element by role when testId is removed', async () => {
      const locators: LocatorStrategies = {
        testId: null,  // testId removed from page
        role: { role: 'button', name: 'Submit form' },
        label: null,
        text: 'Submit',
        placeholder: null,
        css: '#nonexistent',
        xpath: '/bad/xpath',
        fingerprint: null,
      };

      await page.goto(`file://${FIXTURE_PATH}`);

      // Should fall through to role locator
      const byRole = page.getByRole(locators.role!.role as any, { name: locators.role!.name });
      expect(await byRole.count()).toBe(1);
    });
  });

  describe('Full record-store-retrieve cycle', () => {
    it('should store recorded actions in database and retrieve them', async () => {
      const capturedEvents: RecordedAction[] = [];

      await page.exposeFunction('__rpaEvent', (eventJson: string) => {
        capturedEvents.push(JSON.parse(eventJson));
      });
      await page.addInitScript(getCaptureScript());
      await page.goto(`file://${FIXTURE_PATH}`);

      // Perform a sequence of actions
      await page.fill('[data-testid="username-input"]', 'testuser');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.click('[data-testid="submit-btn"]');
      await page.waitForTimeout(200);

      // Create recording in DB
      const recordingId = 'rec-integration-1';
      db.createRecording({
        id: recordingId,
        name: 'Integration Test',
        url: `file://${FIXTURE_PATH}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: 'test',
        description: '',
        action_count: capturedEvents.length,
        duration_ms: 1000,
        auth_state_path: null,
      });

      // Store actions
      for (let i = 0; i < capturedEvents.length; i++) {
        const action = capturedEvents[i];
        const locators = generateLocators(action);
        db.createAction({
          id: `act-${i}`,
          recording_id: recordingId,
          step_index: i,
          action_type: action.type,
          url: action.url,
          locators: JSON.stringify(locators),
          screenshot_path: null,
          timestamp_ms: action.timestamp,
        });
      }

      db.persistNow();

      // Retrieve and verify
      const storedRecording = db.getRecording(recordingId);
      expect(storedRecording).not.toBeNull();
      expect(storedRecording!.action_count).toBe(capturedEvents.length);

      const storedActions = db.getActions(recordingId);
      expect(storedActions.length).toBe(capturedEvents.length);
      expect(storedActions.length).toBeGreaterThanOrEqual(3); // At least fill + fill + click

      // Verify locators are parseable
      for (const action of storedActions) {
        const locators: LocatorStrategies = JSON.parse(action.locators);
        expect(locators).toBeDefined();
        // At least css or xpath should be present
        expect(locators.css || locators.xpath || locators.testId).toBeTruthy();
      }
    });
  });
});

/**
 * Returns the CAPTURE_SCRIPT from recorder.ts.
 * Duplicated here to avoid importing the full Recorder class
 * (which depends on vscode module).
 */
function getCaptureScript(): string {
  return `
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
})();
`;
}
