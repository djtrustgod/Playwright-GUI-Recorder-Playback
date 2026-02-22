import * as vscode from 'vscode';
import type { Page } from 'playwright';
import { LocatorStrategies } from '../playwright/selfHealing';
import { DomSimplifier } from './domSimplifier';

/**
 * LLM-based selector repair — sends a simplified DOM snapshot
 * and the element description to an LLM to get a corrected selector.
 *
 * Supported providers: OpenAI, Anthropic, Ollama (local).
 * API keys are stored securely via VS Code SecretStorage.
 */
export class LlmRepair {
  private domSimplifier = new DomSimplifier();

  constructor(private readonly secrets?: vscode.SecretStorage) {}

  /**
   * Ask the LLM to repair a broken selector.
   * Returns a Playwright-compatible locator string, or null if repair fails.
   */
  async repairSelector(page: Page, locators: LocatorStrategies): Promise<string | null> {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const provider = config.get<string>('ai.provider', 'openai');
    const model = config.get<string>('ai.model', 'gpt-4o-mini');
    const apiKey = await this.secrets?.get(`playwrightVcr.apiKey.${provider}`) ?? '';

    if (!apiKey && provider !== 'ollama') {
      console.warn('LLM repair: No API key configured. Use "PlaywrightVCR: Set AI Provider API Key" command.');
      return null;
    }

    // Get simplified DOM from the current page
    const simplifiedDom = await this.domSimplifier.simplify(page);

    // Build the repair prompt
    const prompt = this.buildPrompt(locators, simplifiedDom);

    // Call the appropriate LLM provider
    let response: string | null = null;
    switch (provider) {
      case 'openai':
        response = await this.callOpenAI(apiKey, model, prompt);
        break;
      case 'anthropic':
        response = await this.callAnthropic(apiKey, model, prompt);
        break;
      case 'ollama':
        response = await this.callOllama(model, prompt);
        break;
      default:
        console.warn(`Unknown LLM provider: ${provider}`);
        return null;
    }

    if (!response) return null;

    // Extract the selector from the LLM response
    return this.extractSelector(response);
  }

  private buildPrompt(locators: LocatorStrategies, dom: string): string {
    const elementDesc: string[] = [];
    if (locators.fingerprint) {
      const fp = locators.fingerprint;
      elementDesc.push(`Tag: ${fp.tag}`);
      if (fp.id) elementDesc.push(`ID: ${fp.id}`);
      if (fp.testId) elementDesc.push(`Test ID: ${fp.testId}`);
      if (fp.ariaRole) elementDesc.push(`ARIA Role: ${fp.ariaRole}`);
      if (fp.ariaLabel) elementDesc.push(`ARIA Label: ${fp.ariaLabel}`);
      if (fp.text) elementDesc.push(`Text: ${fp.text.substring(0, 100)}`);
      if (fp.placeholder) elementDesc.push(`Placeholder: ${fp.placeholder}`);
      if (fp.classes.length) elementDesc.push(`Classes: ${fp.classes.join(', ')}`);
      elementDesc.push(`Position: (${Math.round(fp.boundingRect.x)}, ${Math.round(fp.boundingRect.y)})`);
    }

    const originalSelectors: string[] = [];
    if (locators.testId) originalSelectors.push(`data-testid="${locators.testId}"`);
    if (locators.role) originalSelectors.push(`role="${locators.role.role}" name="${locators.role.name}"`);
    if (locators.label) originalSelectors.push(`label="${locators.label}"`);
    if (locators.text) originalSelectors.push(`text="${locators.text}"`);
    if (locators.css) originalSelectors.push(`css="${locators.css}"`);
    if (locators.xpath) originalSelectors.push(`xpath="${locators.xpath}"`);

    return `You are a Playwright selector repair tool. An automated test cannot find an element on a web page.

## Original Element Description
${elementDesc.join('\n')}

## Original Selectors (all failed)
${originalSelectors.join('\n')}

## Current Page DOM (simplified)
\`\`\`html
${dom}
\`\`\`

## Task
Find the element that best matches the original element description in the current DOM.
Return ONLY a single Playwright-compatible CSS selector string that uniquely identifies the element.
Do not include any explanation, code blocks, or extra text — just the raw selector string.

If you cannot find a matching element, respond with: NONE`;
  }

  /** Call OpenAI Chat Completions API */
  private async callOpenAI(apiKey: string, model: string, prompt: string): Promise<string | null> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'You are a Playwright selector repair assistant. Return only the selector string.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 200,
          temperature: 0,
        }),
      });

      if (!response.ok) {
        console.error(`OpenAI API error: ${response.status}`);
        return null;
      }

      const data = await response.json() as any;
      return data.choices?.[0]?.message?.content?.trim() || null;
    } catch (err) {
      console.error('OpenAI API call failed:', err);
      return null;
    }
  }

  /** Call Anthropic Messages API */
  private async callAnthropic(apiKey: string, model: string, prompt: string): Promise<string | null> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 200,
          messages: [
            { role: 'user', content: prompt },
          ],
        }),
      });

      if (!response.ok) {
        console.error(`Anthropic API error: ${response.status}`);
        return null;
      }

      const data = await response.json() as any;
      return data.content?.[0]?.text?.trim() || null;
    } catch (err) {
      console.error('Anthropic API call failed:', err);
      return null;
    }
  }

  /** Call local Ollama API */
  private async callOllama(model: string, prompt: string): Promise<string | null> {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const ollamaUrl = config.get<string>('ai.ollamaUrl', 'http://localhost:11434');

    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          options: { temperature: 0 },
        }),
      });

      if (!response.ok) {
        console.error(`Ollama API error: ${response.status}`);
        return null;
      }

      const data = await response.json() as any;
      return data.response?.trim() || null;
    } catch (err) {
      console.error('Ollama API call failed:', err);
      return null;
    }
  }

  /** Extract a clean selector from the LLM response */
  private extractSelector(response: string): string | null {
    const trimmed = response.trim();

    if (trimmed === 'NONE' || trimmed.toLowerCase().includes('cannot find')) {
      return null;
    }

    // Strip code block markers if present
    let selector = trimmed
      .replace(/^```[a-z]*\n?/i, '')
      .replace(/\n?```$/i, '')
      .trim();

    // Remove quotes if the entire string is quoted
    if ((selector.startsWith('"') && selector.endsWith('"')) ||
        (selector.startsWith("'") && selector.endsWith("'"))) {
      selector = selector.slice(1, -1);
    }

    // Basic validation: should look like a CSS selector or Playwright locator
    if (selector.length === 0 || selector.length > 500) {
      return null;
    }

    return selector;
  }
}
