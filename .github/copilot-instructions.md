# Copilot Instructions — PlaywrightVCR VS Code Extension

## Project Context

This is a VS Code extension (TypeScript) that uses Playwright for browser automation recording, playback, and scheduling, with AI-powered self-healing selectors. It is a light-duty RPA tool.

## Documentation Requirements

**After every code change**, update the relevant documentation:

1. **README.md** — Keep high-level. Update the Project Status table if a feature area changes status (⬜ → 🔧 → ✅). Do not add implementation details here; link to Implementation.md instead.

2. **Implementation.md** — Update when:
   - A new file is added or removed (update Project Structure tree)
   - A public interface or data model changes (update the relevant section)
   - A new configuration setting is added (update Configuration Reference table)
   - A design decision is made or changed (update Key Design Decisions)
   - A limitation is resolved or a new one discovered (update Known Limitations)

3. **Plan** (`.github/prompts/plan-playwrightGuiRecorderPlaybackVSCode.prompt.md`) — Update the status indicator on the relevant step when:
   - A step moves from ⬜ (not started) to 🔧 (scaffolded) or ✅ (complete)
   - The status note (blockquote under each step) needs revision to reflect new work

### Status Legend
- ✅ Complete — Feature is implemented, tested, and working
- 🔧 Scaffolded — Code exists but needs refinement, testing, or integration
- ⬜ Not started — No implementation yet

## Code Conventions

- **Language**: TypeScript (strict mode)
- **Module system**: CommonJS for extension host, ESNext for webview
- **Styling**: Inline styles using VS Code CSS custom properties (`var(--vscode-*)`) — no Tailwind or external CSS frameworks
- **Database**: `sql.js` (WASM SQLite). Always call `this.persist()` after write operations. The `Database` class is async — await `waitReady()` before first access.
- **Build**: `esbuild.js` dual-target build. Playwright and `@xenova/transformers` are externalized (`external` in esbuild config), not bundled.
- **Testing**: Vitest. Tests go in `src/**/*.test.ts` or a `test/` directory.
- **Type declarations**: Ambient types for untyped packages go in `src/types.d.ts`.

## Architecture Rules

1. **Extension host vs Webview boundary** — Playwright, database, and file system operations run in the extension host. Webview panels only render UI. Communication crosses the boundary via `postMessage`/`onDidReceiveMessage`.

2. **Self-healing tier order** — Always: Tier 1 (direct locator) → Tier 2 (embedding) → Tier 3 (LLM). Never skip tiers. Cache healed selectors in the database.

3. **No native addons** — Use `sql.js` (WASM), not `better-sqlite3`. The project must install without C++ build tools.

4. **External dependencies** — Keep `playwright` and `@xenova/transformers` as externals in esbuild. They're resolved from `node_modules` at runtime.

5. **Webview panel pattern** — Each panel has a manager class in `src/views/` and a React component in `src/webview/components/`. The single webview bundle routes via a `data-panel` attribute.

## File Organization

When adding new functionality:
- Playwright integration code → `src/playwright/`
- Data persistence → `src/storage/`
- Scheduling and job management → `src/orchestration/`
- AI/ML features → `src/ai/`
- VS Code UI providers → `src/views/`
- React webview components → `src/webview/components/`
- Ambient type declarations → `src/types.d.ts`

## When Creating New Files

1. Add the file to the Project Structure section in `Implementation.md`
2. If it's a new webview component, register it in `src/webview/App.tsx`
3. If it's a new command, register it in `src/extension.ts` and add to `package.json` contributes.commands
4. If it adds a VS Code setting, add to `package.json` contributes.configuration and the Configuration Reference in `Implementation.md`

## Git Commit Rules

- **Always use single-line commit messages** — never use multi-line strings in `git commit -m`. Multi-line messages break the PowerShell terminal when quotes span multiple lines.
- Good: `git commit -m "feat: add recording panel with step list UI"`
- Bad: `git commit -m "feat: add recording\n\n- detail 1\n- detail 2"`
- If more detail is needed, put it in the PR description, not the commit message.

## When Fixing Bugs or Resolving Limitations

1. If a Known Limitation in `Implementation.md` is resolved, remove or update it
2. If a new limitation is discovered, add it to the list
3. Update the plan step status if the fix completes a previously scaffolded feature
