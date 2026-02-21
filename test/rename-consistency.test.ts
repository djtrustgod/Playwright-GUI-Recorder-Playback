import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');

/**
 * Validates that the rename from "Playwright RPA" / "playwrightRpa" to
 * "PlaywrightVCR" / "playwrightVcr" is complete and consistent across
 * the codebase. Catches any stale references that would cause runtime
 * mismatches (e.g., registering a command as playwrightVcr.* but
 * package.json still declaring playwrightRpa.*).
 */
describe('Rename consistency: PlaywrightVCR', () => {
  // ---------- package.json ----------

  describe('package.json', () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
    );

    it('should have the new package name', () => {
      expect(pkg.name).toBe('playwright-vcr');
    });

    it('should have the new display name', () => {
      expect(pkg.displayName).toBe('PlaywrightVCR');
    });

    it('should use playwrightVcr prefix for all commands', () => {
      for (const cmd of pkg.contributes.commands) {
        expect(cmd.command).toMatch(/^playwrightVcr\./);
        expect(cmd.command).not.toMatch(/playwrightRpa/);
      }
    });

    it('should use PlaywrightVCR for all command categories', () => {
      for (const cmd of pkg.contributes.commands) {
        expect(cmd.category).toBe('PlaywrightVCR');
      }
    });

    it('should use playwrightVcr for activation events', () => {
      for (const event of pkg.activationEvents) {
        expect(event).not.toMatch(/playwrightRpa/);
        expect(event).toMatch(/playwrightVcr/);
      }
    });

    it('should use playwrightVcr for view container id', () => {
      const containers = pkg.contributes.viewsContainers.activitybar;
      for (const container of containers) {
        expect(container.id).toBe('playwrightVcr');
        expect(container.title).toBe('PlaywrightVCR');
      }
    });

    it('should use playwrightVcr prefix for all view ids', () => {
      const views = pkg.contributes.views.playwrightVcr;
      expect(views).toBeDefined();
      for (const view of views) {
        expect(view.id).toMatch(/^playwrightVcr\./);
      }
    });

    it('should use playwrightVcr prefix for all configuration properties', () => {
      const props = Object.keys(pkg.contributes.configuration.properties);
      for (const prop of props) {
        expect(prop).toMatch(/^playwrightVcr\./);
        expect(prop).not.toMatch(/playwrightRpa/);
      }
    });

    it('should use PlaywrightVCR for configuration title', () => {
      expect(pkg.contributes.configuration.title).toBe('PlaywrightVCR');
    });

    it('should use playwrightVcr in menu when clauses', () => {
      const allMenus = [
        ...pkg.contributes.menus['view/title'],
        ...pkg.contributes.menus['view/item/context'],
      ];
      for (const menu of allMenus) {
        expect(menu.command).toMatch(/^playwrightVcr\./);
        if (menu.when) {
          expect(menu.when).not.toMatch(/playwrightRpa/);
        }
      }
    });

    it('should not contain any playwrightRpa references', () => {
      const raw = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8');
      expect(raw).not.toMatch(/playwrightRpa/);
      expect(raw).not.toMatch(/playwright-rpa/);
      expect(raw).not.toMatch(/Playwright RPA/);
    });
  });

  // ---------- Source files ----------

  describe('source files', () => {
    const srcFiles = getAllFiles(path.join(ROOT, 'src'), '.ts');

    it('should find source files to check', () => {
      expect(srcFiles.length).toBeGreaterThan(0);
    });

    it('should not contain "playwrightRpa" in any source file', () => {
      for (const file of srcFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const relativePath = path.relative(ROOT, file);
        expect(content, `Stale reference in ${relativePath}`).not.toMatch(/playwrightRpa/);
      }
    });

    it('should not contain "Playwright RPA" display name in any source file', () => {
      for (const file of srcFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const relativePath = path.relative(ROOT, file);
        expect(content, `Stale reference in ${relativePath}`).not.toMatch(/Playwright RPA/);
      }
    });

    it('should not contain "playwright-rpa" package name in any source file', () => {
      for (const file of srcFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const relativePath = path.relative(ROOT, file);
        expect(content, `Stale reference in ${relativePath}`).not.toMatch(/playwright-rpa/);
      }
    });
  });

  // ---------- Database filename ----------

  describe('database filename', () => {
    it('should use playwright-vcr.db in database.ts', () => {
      const dbFile = fs.readFileSync(
        path.join(ROOT, 'src', 'storage', 'database.ts'),
        'utf-8'
      );
      expect(dbFile).toContain('playwright-vcr.db');
      expect(dbFile).not.toContain('playwright-rpa.db');
    });
  });

  // ---------- Documentation ----------

  describe('documentation', () => {
    const docFiles = [
      'README.md',
      'Implementation.md',
      '.github/copilot-instructions.md',
      '.claude/CLAUDE.md',
    ];

    for (const docFile of docFiles) {
      it(`should not contain old naming in ${docFile}`, () => {
        const fullPath = path.join(ROOT, docFile);
        if (!fs.existsSync(fullPath)) return; // skip if file doesn't exist
        const content = fs.readFileSync(fullPath, 'utf-8');
        expect(content, `Stale "Playwright RPA" in ${docFile}`).not.toMatch(/Playwright RPA/);
        expect(content, `Stale "playwrightRpa" in ${docFile}`).not.toMatch(/playwrightRpa/);
      });
    }
  });

  // ---------- Built output ----------

  describe('built output', () => {
    const extensionJs = path.join(ROOT, 'out', 'extension.js');

    it('should have built output available', () => {
      expect(fs.existsSync(extensionJs)).toBe(true);
    });

    it('should not contain old identifiers in built extension.js', () => {
      const content = fs.readFileSync(extensionJs, 'utf-8');
      expect(content).not.toMatch(/playwrightRpa/);
      expect(content).not.toMatch(/playwright-rpa\.db/);
    });

    it('should contain new identifiers in built extension.js', () => {
      const content = fs.readFileSync(extensionJs, 'utf-8');
      expect(content).toMatch(/playwrightVcr/);
      expect(content).toMatch(/playwright-vcr\.db/);
    });
  });
});

/** Recursively collect all files with a given extension */
function getAllFiles(dir: string, ext: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}
