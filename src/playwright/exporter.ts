import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Database, ActionRecord, Recording } from '../storage/database';
import { FileManager } from '../storage/fileManager';
import { LocatorStrategies } from './selfHealing';

type ExportFormat = 'TypeScript' | 'JavaScript' | 'Python' | 'Java' | 'C#' | 'JSON' | 'HAR' | 'GitHub Actions YAML';

export class Exporter {
  constructor(
    private readonly db: Database,
    private readonly fileManager: FileManager
  ) {}

  async export(recordingId: string, format: string): Promise<void> {
    const recording = this.db.getRecording(recordingId);
    if (!recording) {
      throw new Error(`Recording ${recordingId} not found.`);
    }

    const actions = this.db.getActions(recordingId);
    const exportFormat = format as ExportFormat;

    // Prompt user for save location
    const defaultName = this.getDefaultFileName(recording.name, exportFormat);
    const uri = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file(defaultName),
      filters: this.getFileFilters(exportFormat),
    });

    if (!uri) {
      return; // User cancelled
    }

    let content: string;
    switch (exportFormat) {
      case 'TypeScript':
        content = this.generateTypeScript(recording, actions);
        break;
      case 'JavaScript':
        content = this.generateJavaScript(recording, actions);
        break;
      case 'Python':
        content = this.generatePython(recording, actions);
        break;
      case 'Java':
        content = this.generateJava(recording, actions);
        break;
      case 'C#':
        content = this.generateCSharp(recording, actions);
        break;
      case 'JSON':
        content = this.generateJson(recording, actions);
        break;
      case 'GitHub Actions YAML':
        content = this.generateGitHubActions(recording);
        break;
      case 'HAR':
        // HAR export copies the trace file
        await this.exportTraceZip(recordingId, uri.fsPath);
        vscode.window.showInformationMessage(`Trace exported to ${uri.fsPath}`);
        return;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }

    await fs.writeFile(uri.fsPath, content, 'utf-8');
    vscode.window.showInformationMessage(`Exported to ${uri.fsPath}`);

    // Open the exported file
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
  }

  private generateTypeScript(recording: Recording, actions: ActionRecord[]): string {
    const lines: string[] = [
      `import { test, expect } from '@playwright/test';`,
      ``,
      `test('${this.escapeString(recording.name)}', async ({ page }) => {`,
      `  // Recorded on ${recording.created_at} from ${recording.url}`,
      `  await page.goto('${this.escapeString(recording.url)}');`,
      ``,
    ];

    for (const action of actions) {
      const line = this.generatePlaywrightAction(action, '  ');
      if (line) lines.push(line);
    }

    lines.push(`});`, ``);
    return lines.join('\n');
  }

  private generateJavaScript(recording: Recording, actions: ActionRecord[]): string {
    const lines: string[] = [
      `const { test, expect } = require('@playwright/test');`,
      ``,
      `test('${this.escapeString(recording.name)}', async ({ page }) => {`,
      `  // Recorded on ${recording.created_at} from ${recording.url}`,
      `  await page.goto('${this.escapeString(recording.url)}');`,
      ``,
    ];

    for (const action of actions) {
      const line = this.generatePlaywrightAction(action, '  ');
      if (line) lines.push(line);
    }

    lines.push(`});`, ``);
    return lines.join('\n');
  }

  private generatePython(recording: Recording, actions: ActionRecord[]): string {
    const lines: string[] = [
      `import pytest`,
      `from playwright.sync_api import Page, expect`,
      ``,
      ``,
      `def test_${this.toSnakeCase(recording.name)}(page: Page):`,
      `    """Recorded on ${recording.created_at} from ${recording.url}"""`,
      `    page.goto("${this.escapeString(recording.url)}")`,
      ``,
    ];

    for (const action of actions) {
      const line = this.generatePythonAction(action, '    ');
      if (line) lines.push(line);
    }

    lines.push(``);
    return lines.join('\n');
  }

  private generateJava(recording: Recording, actions: ActionRecord[]): string {
    const className = this.toPascalCase(recording.name);
    const lines: string[] = [
      `import com.microsoft.playwright.*;`,
      `import org.junit.jupiter.api.*;`,
      ``,
      `public class ${className}Test {`,
      `    @Test`,
      `    void test${className}() {`,
      `        try (Playwright playwright = Playwright.create()) {`,
      `            Browser browser = playwright.chromium().launch();`,
      `            Page page = browser.newPage();`,
      `            // Recorded on ${recording.created_at} from ${recording.url}`,
      `            page.navigate("${this.escapeString(recording.url)}");`,
      ``,
    ];

    for (const action of actions) {
      const line = this.generateJavaAction(action, '            ');
      if (line) lines.push(line);
    }

    lines.push(`        }`, `    }`, `}`, ``);
    return lines.join('\n');
  }

  private generateCSharp(recording: Recording, actions: ActionRecord[]): string {
    const className = this.toPascalCase(recording.name);
    const lines: string[] = [
      `using Microsoft.Playwright;`,
      `using NUnit.Framework;`,
      ``,
      `[TestFixture]`,
      `public class ${className}Tests`,
      `{`,
      `    [Test]`,
      `    public async Task Test${className}()`,
      `    {`,
      `        using var playwright = await Playwright.CreateAsync();`,
      `        await using var browser = await playwright.Chromium.LaunchAsync();`,
      `        var page = await browser.NewPageAsync();`,
      `        // Recorded on ${recording.created_at} from ${recording.url}`,
      `        await page.GotoAsync("${this.escapeString(recording.url)}");`,
      ``,
    ];

    for (const action of actions) {
      const line = this.generateCSharpAction(action, '        ');
      if (line) lines.push(line);
    }

    lines.push(`    }`, `}`, ``);
    return lines.join('\n');
  }

  private generateJson(recording: Recording, actions: ActionRecord[]): string {
    return JSON.stringify(
      {
        version: '1.0.0',
        recording: {
          id: recording.id,
          name: recording.name,
          url: recording.url,
          createdAt: recording.created_at,
          actionCount: recording.action_count,
          durationMs: recording.duration_ms,
        },
        actions: actions.map(a => ({
          stepIndex: a.step_index,
          actionType: a.action_type,
          url: a.url,
          locators: JSON.parse(a.locators),
          timestampMs: a.timestamp_ms,
        })),
      },
      null,
      2
    );
  }

  private generateGitHubActions(recording: Recording): string {
    return `name: Playwright RPA - ${this.escapeString(recording.name)}

on:
  schedule:
    - cron: '0 9 * * MON-FRI'  # Weekdays at 9 AM UTC
  workflow_dispatch:

jobs:
  run-recording:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run recording playback
        run: npx playwright test ${this.toKebabCase(recording.name)}.spec.ts
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
`;
  }

  /** Generate a Playwright TS/JS action line from a recorded action */
  private generatePlaywrightAction(action: ActionRecord, indent: string): string | null {
    const locators: LocatorStrategies = JSON.parse(action.locators);
    const selector = this.getBestLocatorCode(locators);

    switch (action.action_type) {
      case 'navigation':
        return `${indent}await page.goto('${this.escapeString(action.url)}');`;
      case 'click':
        return selector ? `${indent}await ${selector}.click();` : null;
      case 'dblclick':
        return selector ? `${indent}await ${selector}.dblclick();` : null;
      case 'input':
      case 'change':
        return selector
          ? `${indent}await ${selector}.fill('${this.escapeString(locators.fingerprint?.value || '')}');`
          : null;
      case 'keydown':
        return `${indent}await page.keyboard.press('${this.escapeString(locators.fingerprint?.value || 'Enter')}');`;
      case 'select':
        return selector
          ? `${indent}await ${selector}.selectOption('${this.escapeString(locators.fingerprint?.value || '')}');`
          : null;
      case 'scroll':
        return `${indent}await page.mouse.wheel(0, 300);`;
      default:
        return `${indent}// Unknown action: ${action.action_type}`;
    }
  }

  private generatePythonAction(action: ActionRecord, indent: string): string | null {
    const locators: LocatorStrategies = JSON.parse(action.locators);
    const selector = this.getBestPythonLocator(locators);

    switch (action.action_type) {
      case 'navigation':
        return `${indent}page.goto("${this.escapeString(action.url)}")`;
      case 'click':
        return selector ? `${indent}${selector}.click()` : null;
      case 'dblclick':
        return selector ? `${indent}${selector}.dblclick()` : null;
      case 'input':
      case 'change':
        return selector
          ? `${indent}${selector}.fill("${this.escapeString(locators.fingerprint?.value || '')}")`
          : null;
      case 'keydown':
        return `${indent}page.keyboard.press("${this.escapeString(locators.fingerprint?.value || 'Enter')}")`;
      default:
        return `${indent}# Unknown action: ${action.action_type}`;
    }
  }

  private generateJavaAction(action: ActionRecord, indent: string): string | null {
    const locators: LocatorStrategies = JSON.parse(action.locators);

    switch (action.action_type) {
      case 'navigation':
        return `${indent}page.navigate("${this.escapeString(action.url)}");`;
      case 'click':
        if (locators.role) {
          return `${indent}page.getByRole(AriaRole.${locators.role.role.toUpperCase()}, new Page.GetByRoleOptions().setName("${this.escapeString(locators.role.name)}")).click();`;
        }
        if (locators.css) {
          return `${indent}page.locator("${this.escapeString(locators.css)}").click();`;
        }
        return null;
      default:
        return `${indent}// Unknown action: ${action.action_type}`;
    }
  }

  private generateCSharpAction(action: ActionRecord, indent: string): string | null {
    const locators: LocatorStrategies = JSON.parse(action.locators);

    switch (action.action_type) {
      case 'navigation':
        return `${indent}await page.GotoAsync("${this.escapeString(action.url)}");`;
      case 'click':
        if (locators.role) {
          return `${indent}await page.GetByRole(AriaRole.${this.toPascalCase(locators.role.role)}, new() { Name = "${this.escapeString(locators.role.name)}" }).ClickAsync();`;
        }
        if (locators.css) {
          return `${indent}await page.Locator("${this.escapeString(locators.css)}").ClickAsync();`;
        }
        return null;
      default:
        return `${indent}// Unknown action: ${action.action_type}`;
    }
  }

  /** Get best locator code for TS/JS export — prefers semantic locators */
  private getBestLocatorCode(locators: LocatorStrategies): string | null {
    if (locators.testId) return `page.getByTestId('${this.escapeString(locators.testId)}')`;
    if (locators.role) return `page.getByRole('${locators.role.role}', { name: '${this.escapeString(locators.role.name)}' })`;
    if (locators.label) return `page.getByLabel('${this.escapeString(locators.label)}')`;
    if (locators.text) return `page.getByText('${this.escapeString(locators.text)}')`;
    if (locators.placeholder) return `page.getByPlaceholder('${this.escapeString(locators.placeholder)}')`;
    if (locators.css) return `page.locator('${this.escapeString(locators.css)}')`;
    if (locators.xpath) return `page.locator('xpath=${this.escapeString(locators.xpath)}')`;
    return null;
  }

  private getBestPythonLocator(locators: LocatorStrategies): string | null {
    if (locators.testId) return `page.get_by_test_id("${this.escapeString(locators.testId)}")`;
    if (locators.role) return `page.get_by_role("${locators.role.role}", name="${this.escapeString(locators.role.name)}")`;
    if (locators.label) return `page.get_by_label("${this.escapeString(locators.label)}")`;
    if (locators.text) return `page.get_by_text("${this.escapeString(locators.text)}")`;
    if (locators.placeholder) return `page.get_by_placeholder("${this.escapeString(locators.placeholder)}")`;
    if (locators.css) return `page.locator("${this.escapeString(locators.css)}")`;
    return null;
  }

  private async exportTraceZip(recordingId: string, destPath: string): Promise<void> {
    const tracePath = this.fileManager.getTracePath(recordingId);
    await fs.copyFile(tracePath, destPath);
  }

  // --- String utilities ---

  private escapeString(str: string): string {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
  }

  private toSnakeCase(str: string): string {
    return str.replace(/[^a-zA-Z0-9]+/g, '_').replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '').replace(/_+/g, '_');
  }

  private toPascalCase(str: string): string {
    return str.replace(/[^a-zA-Z0-9]+/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  }

  private toKebabCase(str: string): string {
    return str.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().replace(/^-|-$/g, '');
  }

  private getDefaultFileName(name: string, format: ExportFormat): string {
    const base = this.toKebabCase(name);
    const ext: Record<ExportFormat, string> = {
      TypeScript: '.spec.ts',
      JavaScript: '.spec.js',
      Python: '_test.py',
      Java: 'Test.java',
      'C#': 'Tests.cs',
      JSON: '.json',
      HAR: '.zip',
      'GitHub Actions YAML': '.yml',
    };
    return base + (ext[format] || '.txt');
  }

  private getFileFilters(format: ExportFormat): Record<string, string[]> {
    const filters: Record<ExportFormat, Record<string, string[]>> = {
      TypeScript: { 'TypeScript': ['ts'] },
      JavaScript: { 'JavaScript': ['js'] },
      Python: { 'Python': ['py'] },
      Java: { 'Java': ['java'] },
      'C#': { 'C#': ['cs'] },
      JSON: { 'JSON': ['json'] },
      HAR: { 'ZIP': ['zip'] },
      'GitHub Actions YAML': { 'YAML': ['yml', 'yaml'] },
    };
    return filters[format] || { 'All': ['*'] };
  }
}
