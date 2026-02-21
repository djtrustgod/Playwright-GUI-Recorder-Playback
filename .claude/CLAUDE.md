# PlaywrightVCR VS Code Extension - Project Memory

## Project Overview
VS Code extension (TypeScript) wrapping Playwright for RPA. TreeView sidebar + React webview panels. SQLite via sql.js (WASM).

## Key Architecture
- **Build**: esbuild dual-target (Node CJS extension host + browser IIFE webview)
- **External deps** (not bundled): `vscode`, `playwright`, `@huggingface/transformers`
- **Storage**: sql.js with debounced persistence (500ms) in `globalStoragePath`
- **AI keys**: Stored in `vscode.SecretStorage`, NOT in settings
- **Self-healing**: 3 tiers: direct locator → embedding similarity → LLM repair

## Documentation
- **Always update README.md and Implementation.md** when making significant changes (new features, changed behavior, new settings, new commands). Keep docs in sync with code.
- Update the Project Status table in README.md when milestones change.

## Git Conventions
- Single-line commit messages only (multi-line breaks PowerShell)
- Copilot instructions in `.github/copilot-instructions.md`
- Plan file at `.github/prompts/plan-playwrightGuiRecorderPlaybackVSCode.prompt.md`

## Testing
- Unit tests: Vitest with vscode mock at `test/__mocks__/vscode.ts`
- Integration tests: Playwright against `test/fixtures/test-page.html`
- Config: `vitest.config.ts` aliases `vscode` → mock

## Key Files
- Entry: `src/extension.ts`
- Recording: `src/playwright/recorder.ts` (CAPTURE_SCRIPT injection)
- Playback: `src/playwright/player.ts`
- Self-healing: `src/playwright/selfHealing.ts`
- Database: `src/storage/database.ts` (debounced persist)
- AI: `src/ai/llmRepair.ts`, `src/ai/locatorEmbeddings.ts`
