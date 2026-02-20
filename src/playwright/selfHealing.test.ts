import { describe, it, expect } from 'vitest';
import { generateLocators, LocatorStrategies, ElementFingerprint } from './selfHealing';
import { RecordedAction } from './recorder';

describe('generateLocators', () => {
  const makeFingerprint = (overrides: Partial<ElementFingerprint> = {}): ElementFingerprint => ({
    tag: 'button',
    id: 'submit-btn',
    classes: ['btn', 'btn-primary'],
    text: 'Submit',
    innerText: 'Submit',
    placeholder: null,
    ariaLabel: 'Submit form',
    ariaRole: 'button',
    testId: 'submit-button',
    name: null,
    type: 'submit',
    href: null,
    value: null,
    boundingRect: { x: 100, y: 200, width: 80, height: 32 },
    parentTag: 'form',
    parentId: 'myform',
    parentClasses: ['form-container'],
    labels: [],
    childIndex: 2,
    ...overrides,
  });

  const makeAction = (overrides: Partial<RecordedAction> = {}): RecordedAction => ({
    type: 'click',
    url: 'https://example.com',
    timestamp: Date.now(),
    fingerprint: makeFingerprint(),
    cssSelector: '#submit-btn',
    xpath: '/html/body/form/button[1]',
    ...overrides,
  });

  it('should extract testId from fingerprint', () => {
    const locators = generateLocators(makeAction());
    expect(locators.testId).toBe('submit-button');
  });

  it('should extract role and name from fingerprint', () => {
    const locators = generateLocators(makeAction());
    expect(locators.role).toEqual({ role: 'button', name: 'Submit form' });
  });

  it('should use innerText as role name when ariaLabel is null', () => {
    const action = makeAction({
      fingerprint: makeFingerprint({ ariaLabel: null, innerText: 'Click me' }),
    });
    const locators = generateLocators(action);
    expect(locators.role!.name).toBe('Click me');
  });

  it('should extract label from fingerprint labels array', () => {
    const action = makeAction({
      fingerprint: makeFingerprint({ labels: ['Email address'] }),
    });
    const locators = generateLocators(action);
    expect(locators.label).toBe('Email address');
  });

  it('should extract text from fingerprint', () => {
    const locators = generateLocators(makeAction());
    expect(locators.text).toBe('Submit');
  });

  it('should extract placeholder from fingerprint', () => {
    const action = makeAction({
      fingerprint: makeFingerprint({ placeholder: 'Enter email' }),
    });
    const locators = generateLocators(action);
    expect(locators.placeholder).toBe('Enter email');
  });

  it('should extract css selector from action', () => {
    const locators = generateLocators(makeAction());
    expect(locators.css).toBe('#submit-btn');
  });

  it('should extract xpath from action', () => {
    const locators = generateLocators(makeAction());
    expect(locators.xpath).toBe('/html/body/form/button[1]');
  });

  it('should include element fingerprint', () => {
    const locators = generateLocators(makeAction());
    expect(locators.fingerprint).not.toBeNull();
    expect(locators.fingerprint!.tag).toBe('button');
    expect(locators.fingerprint!.id).toBe('submit-btn');
  });

  it('should handle action with no fingerprint', () => {
    const action = makeAction({
      fingerprint: undefined,
      cssSelector: '.fallback',
      xpath: '//div',
    });
    const locators = generateLocators(action);
    expect(locators.testId).toBeNull();
    expect(locators.role).toBeNull();
    expect(locators.css).toBe('.fallback');
    expect(locators.xpath).toBe('//div');
    expect(locators.fingerprint).toBeNull();
  });

  it('should handle action with no fingerprint and no selectors', () => {
    const action = makeAction({
      fingerprint: undefined,
      cssSelector: undefined,
      xpath: undefined,
    });
    const locators = generateLocators(action);
    expect(locators.css).toBeNull();
    expect(locators.xpath).toBeNull();
  });

  it('should truncate long text to 100 chars', () => {
    const longText = 'A'.repeat(200);
    const action = makeAction({
      fingerprint: makeFingerprint({ innerText: longText }),
    });
    const locators = generateLocators(action);
    expect(locators.text!.length).toBeLessThanOrEqual(100);
  });

  it('should return null role when ariaRole is missing', () => {
    const action = makeAction({
      fingerprint: makeFingerprint({ ariaRole: '' }),
    });
    const locators = generateLocators(action);
    // Empty string is falsy, so role should be null
    expect(locators.role).toBeNull();
  });
});

describe('LocatorStrategies', () => {
  it('should be JSON serializable', () => {
    const strategies: LocatorStrategies = {
      testId: 'my-btn',
      role: { role: 'button', name: 'Submit' },
      label: 'Submit button',
      text: 'Submit',
      placeholder: null,
      css: '#my-btn',
      xpath: '//button[@id="my-btn"]',
      fingerprint: null,
    };

    const json = JSON.stringify(strategies);
    const parsed = JSON.parse(json) as LocatorStrategies;

    expect(parsed.testId).toBe('my-btn');
    expect(parsed.role?.role).toBe('button');
    expect(parsed.css).toBe('#my-btn');
  });
});
