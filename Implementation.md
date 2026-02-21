# Implementation Guide

Detailed technical reference for the PlaywrightVCR VS Code Extension. For a high-level overview, see [README.md](README.md).

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Build System](#build-system)
- [Extension Entry Point](#extension-entry-point)
- [Recording Engine](#recording-engine)
- [Playback Engine](#playback-engine)
- [Self-Healing System](#self-healing-system)
- [Storage Layer](#storage-layer)
- [Orchestration Layer](#orchestration-layer)
- [AI Layer](#ai-layer)
- [Webview UI](#webview-ui)
- [Export System](#export-system)
- [Configuration Reference](#configuration-reference)
- [Key Design Decisions](#key-design-decisions)
- [Known Limitations](#known-limitations)

---

## Architecture Overview

The extension runs entirely inside the VS Code extension host process (Node.js). It launches external Playwright browser instances for recording and playback, stores data in a SQLite database (via `sql.js` WASM), and renders rich UI in VS Code Webview panels using React.

```
┌─────────────────────────────────────────────────────┐
│                   VS Code Host                       │
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  TreeViews   │  │   Webview    │  │  Commands   │ │
│  │  (Sidebar)   │  │  (React)     │  │  (Palette)  │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬─────┘ │
│         │    postMessage   │                 │       │
│  ┌──────┴──────────────────┴─────────────────┴─────┐ │
│  │              Extension Host (Node.js)            │ │
│  │                                                  │ │
│  │  ┌──────────┐  ┌─────────┐  ┌───────────────┐  │ │
│  │  │ Recorder │  │ Player  │  │  Orchestrator  │  │ │
│  │  └────┬─────┘  └────┬────┘  └───────┬───────┘  │ │
│  │       │              │               │          │ │
│  │  ┌────┴──────────────┴───────────────┴───────┐  │ │
│  │  │         Playwright (browser process)       │  │ │
│  │  └───────────────────────────────────────────┘  │ │
│  │                                                  │ │
│  │  ┌────────────┐  ┌───────────┐  ┌────────────┐ │ │
│  │  │  Database   │  │   Files    │  │  AI Layer  │ │ │
│  │  │  (sql.js)   │  │  (traces)  │  │ (MiniLM/  │ │ │
│  │  │             │  │            │  │   LLM)    │ │ │
│  │  └─────────────┘  └───────────┘  └────────────┘ │ │
│  └──────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Project Structure

```
├── .github/
│   ├── copilot-instructions.md   # Agent behavior rules
│   └── prompts/
│       └── plan-*.prompt.md      # Design plan with status tracking
├── esbuild.js                    # Dual-target build script
├── package.json                  # Extension manifest + npm config
├── tsconfig.json                 # Extension host TS config
├── src/
│   ├── extension.ts              # Activation, command registration, service wiring
│   ├── types.d.ts                # Ambient type declarations (sql.js, node-cron)
│   ├── playwright/
│   │   ├── recorder.ts           # Browser launch, DOM event injection, tracing
│   │   ├── player.ts             # Step-by-step playback with self-healing
│   │   ├── selfHealing.ts        # 3-tier locator resolution
│   │   └── exporter.ts           # Multi-language test script generation
│   ├── storage/
│   │   ├── database.ts           # SQLite via sql.js — all CRUD operations
│   │   └── fileManager.ts        # Trace ZIPs, screenshots, auth state files
│   ├── orchestration/
│   │   ├── scheduler.ts          # node-cron schedule evaluation
│   │   ├── queue.ts              # SQLite-backed job queue
│   │   └── executor.ts           # Job polling, retry, webhook notifications
│   ├── ai/
│   │   ├── locatorEmbeddings.ts  # @xenova/transformers MiniLM embeddings
│   │   ├── llmRepair.ts          # OpenAI / Anthropic / Ollama selector repair
│   │   └── domSimplifier.ts      # DOM reduction for LLM context windows
│   ├── views/
│   │   ├── sidebarProvider.ts    # TreeDataProvider: recording library
│   │   ├── executionsProvider.ts # TreeDataProvider: execution history
│   │   ├── schedulesProvider.ts  # TreeDataProvider: cron schedules
│   │   ├── recordingPanel.ts     # WebviewPanel manager: recording controls
│   │   ├── playbackPanel.ts      # WebviewPanel manager: playback dashboard
│   │   └── monitoringPanel.ts    # WebviewPanel manager: monitoring/scheduling
│   └── webview/
│       ├── index.tsx             # Webview entry point (reads data-panel attribute)
│       ├── App.tsx               # Panel router component
│       ├── tsconfig.json         # Webview-specific TS config (DOM, ESNext)
│       └── components/
│           ├── RecordingControls.tsx   # URL input, browser selection, live feed
│           ├── PlaybackTimeline.tsx    # Step timeline with status indicators
│           ├── ScheduleManager.tsx     # Cron schedule CRUD + execution list
│           └── SelfHealingReport.tsx   # Original vs healed selector comparison
└── out/                          # Build output (gitignored)
    ├── extension.js              # Bundled extension host
    └── webview.js                # Bundled React webview
```

## Build System

The project uses a single `esbuild.js` script that produces two bundles:

| Bundle | Entry | Target | Format | Externals |
|---|---|---|---|---|
| Extension host | `src/extension.ts` | Node 18 | CommonJS | `vscode`, `playwright`, `@xenova/transformers` |
| Webview | `src/webview/index.tsx` | ES2020 browser | IIFE | (none — fully bundled) |

Commands:
- `npm run build` — Production build
- `npm run watch` — Watch mode (both targets)
- `npm run build` with `--production` flag via `vscode:prepublish`

Playwright and `@xenova/transformers` are externalized because they're large and have native/WASM components that don't bundle well.

## Extension Entry Point

**File**: `src/extension.ts`

The `activate()` function:
1. Creates the `Database` instance and awaits `waitReady()` (sql.js is async)
2. Creates `FileManager` and ensures directory structure
3. Instantiates all services: `Recorder`, `Player`, `Exporter`, `Scheduler`, `JobQueue`, `Executor`
4. Registers 3 TreeView providers (library, executions, schedules)
5. Creates 3 WebviewPanel managers (recording, playback, monitoring)
6. Registers 10 commands with the VS Code command registry
7. Starts the scheduler and executor

The `deactivate()` function stops the scheduler, executor, and closes the database.

## Recording Engine

**File**: `src/playwright/recorder.ts`

### Flow
1. Launches a headed browser via `playwright.chromium.launch()`
2. Creates a browser context with tracing enabled
3. Injects a `CAPTURE_SCRIPT` via `context.addInitScript()` that attaches event listeners for: `click`, `input`, `change`, `submit`, `keydown`, `scroll`, `select`
4. Exposes `__rpaEvent` callback via `page.exposeFunction()` for real-time event streaming
5. Each captured event includes a full element fingerprint:
   - Tag name, id, classes, text content
   - ARIA attributes (role, label)
   - Data attributes (`data-testid`)
   - Computed CSS selector (unique selector algorithm)
   - XPath (positional)
   - Bounding rectangle
   - Input value, placeholder, name, type
6. On stop: saves auth state via `context.storageState()`, stops tracing (saves ZIP), persists actions to database, writes JSON log

### Event Types Captured
`navigation`, `click`, `dblclick`, `input`, `change`, `submit`, `keydown`, `scroll`, `select`

## Playback Engine

**File**: `src/playwright/player.ts`

### Flow
1. Loads recording metadata + actions from database
2. Launches browser (headed/headless per config)
3. Restores auth state if available
4. Registers overlay dismissal handlers via `page.addLocatorHandler()`
5. Iterates through each action:
   - Resolves element via self-healing system
   - Executes the action (click, fill, press, etc.)
   - Captures screenshot after each step
   - Records step result (pass/healed/fail) with timing
6. Creates execution record in database
7. Reports real-time progress to webview via `postMessage`

### Action Execution

| Action Type | Playwright Method |
|---|---|
| `navigation` | `page.goto()` |
| `click` | `locator.click()` |
| `dblclick` | `locator.dblclick()` |
| `input` / `change` | `locator.fill()` |
| `keydown` | `locator.press()` |
| `select` | `locator.selectOption()` |
| `scroll` | `page.evaluate(window.scrollTo)` |
| `submit` | `locator.evaluate(form.submit)` |

## Self-Healing System

**File**: `src/playwright/selfHealing.ts`

### Three-Tier Resolution

**Tier 1 — Direct Match** (~50ms)
- Checks for a previously cached healed selector first
- Tries locator strategies in priority order: `data-testid` → ARIA role → text → CSS → XPath
- Uses `locator.count()` to verify exactly one match

**Tier 2 — Embedding Similarity** (~100ms)
- Uses `@xenova/transformers` with `all-MiniLM-L6-v2` (loaded lazily, ~50MB download on first use)
- Generates embeddings from element attribute strings (tag + id + classes + text + aria)
- Computes cosine similarity between recorded fingerprint and all visible page elements
- Accepts matches above configurable threshold (default: 0.7)

**Tier 3 — LLM Repair** (~2-5s)
- Simplifies current page DOM via `domSimplifier.ts` (strips scripts/styles/SVGs, limits depth to 8, max 200 elements, ~16KB)
- Sends structured prompt to configured LLM provider with: original selector, element fingerprint, simplified DOM
- Parses returned CSS selector, validates against live page
- Supports: OpenAI API, Anthropic API, local Ollama

**Caching**: All healed selectors are stored in `healed_selectors` table with success counts. Higher success count selectors are preferred on subsequent runs.

### Interfaces

```typescript
interface ElementFingerprint {
  tag: string;
  id: string | null;
  classes: string[];
  text: string;
  ariaLabel: string | null;
  ariaRole: string | null;
  testId: string | null;
  placeholder: string | null;
  name: string | null;
  type: string | null;
  boundingRect: { x: number; y: number; width: number; height: number } | null;
}

interface LocatorStrategies {
  css: string;
  xpath: string;
  testId: string | null;
  role: { role: string; name: string } | null;
  text: string | null;
  label: string | null;
  placeholder: string | null;
  fingerprint: ElementFingerprint;
}
```

## Storage Layer

### Database (`src/storage/database.ts`)

Uses `sql.js` (SQLite compiled to WASM) — chosen over `better-sqlite3` to avoid requiring C++ build tools on Windows.

**Initialization is async**: The constructor starts initialization, and consumers must `await db.waitReady()` before first access.

**Persistence**: The WASM database is held in memory and flushed to disk (`fs.writeFileSync`) after every write operation.

#### Tables

| Table | Purpose | Key Columns |
|---|---|---|
| `recordings` | Recording metadata | id, name, url, created_at, action_count, duration_ms, auth_state_path |
| `actions` | Individual recorded actions | recording_id, step_index, action_type, locators (JSON), timestamp_ms |
| `executions` | Playback execution history | recording_id, started_at, status, trigger_type, failure_step, error_message |
| `healed_selectors` | Cached self-healed selectors | recording_id, step_index, original_locator, healed_locator, strategy_used, success_count |
| `schedules` | Cron schedules | recording_id, cron_expression, enabled, last_run, next_run |
| `jobs` | Job queue entries | recording_id, status, attempts, max_attempts, result_json |

### File Manager (`src/storage/fileManager.ts`)

Manages files in `globalStoragePath/`:
- `recordings/{id}/` — trace ZIPs, JSON action logs
- `screenshots/{id}/` — per-step screenshots
- `auth/` — serialized browser storage states
- `models/` — cached ML model files

## Orchestration Layer

### Scheduler (`src/orchestration/scheduler.ts`)
- Loads enabled schedules from database on start
- Creates `node-cron` tasks that enqueue jobs on trigger
- Supports dynamic reload when schedules are added/removed

### Queue (`src/orchestration/queue.ts`)
- SQLite-backed FIFO queue
- Operations: `enqueue()`, `dequeue()`, `markRunning()`, `markCompleted()`, `markFailed()`

### Executor (`src/orchestration/executor.ts`)
- Polls queue every 5 seconds
- Configurable concurrency (default: 2)
- Exponential backoff retry: 1s → 2s → 4s (up to `maxRetries`)
- On completion/failure: sends webhook POST to configured URL (if set)
- Shows VS Code notifications on failure

**Important limitation**: Scheduling only runs while VS Code is open. The extension host process must be active.

## AI Layer

### Locator Embeddings (`src/ai/locatorEmbeddings.ts`)
- Dynamic import of `@xenova/transformers` (external dependency, not bundled)
- Loads `Xenova/all-MiniLM-L6-v2` model lazily on first self-healing attempt
- Generates embeddings from concatenated element attributes
- Batch processes all visible page elements
- Returns best match above confidence threshold via cosine similarity

### LLM Repair (`src/ai/llmRepair.ts`)
- Reads provider config from VS Code settings (`playwrightVcr.ai.*`)
- Supports three providers:
  - **OpenAI**: `POST https://api.openai.com/v1/chat/completions`
  - **Anthropic**: `POST https://api.anthropic.com/v1/messages`
  - **Ollama**: `POST {ollamaUrl}/api/generate` (local, no API key needed)
- Structured prompt includes: original selector, element fingerprint, simplified DOM context
- Extracts CSS selector from LLM response via regex

### DOM Simplifier (`src/ai/domSimplifier.ts`)
- Runs inside `page.evaluate()` (browser context)
- Strips `<script>`, `<style>`, `<svg>` elements
- Skips hidden elements (`display: none`)
- Limits traversal depth to 8
- Caps output at 200 elements
- Truncates final output to ~16KB
- Preserves element attributes relevant for locator generation

## Webview UI

### Architecture
- Single React app (`src/webview/`) bundled as IIFE by esbuild
- Entry point reads `data-panel` attribute from root element to determine which panel to render
- Communication: `vscode.postMessage()` (webview → extension) / `panel.webview.postMessage()` (extension → webview)
- Styling: Inline styles using VS Code CSS custom properties (e.g., `var(--vscode-button-background)`) for theme consistency

### Components

| Component | Panel | Description |
|---|---|---|
| `RecordingControls` | Recording | URL input, browser dropdown, auth toggle, record/stop buttons, live action feed |
| `PlaybackTimeline` | Playback | Step list with pass/healed/fail indicators, headless toggle, slowMo setting |
| `ScheduleManager` | Monitoring | Execution history list, cron schedule CRUD (add/pause/delete) |
| `SelfHealingReport` | Self-Healing | Expandable rows showing original (broken) vs healed selectors with confidence scores |

### Panel Managers
Each panel has a corresponding manager class in `src/views/` that:
- Creates/reveals the webview panel
- Generates HTML with nonce-based CSP
- Handles bidirectional message routing

## Export System

**File**: `src/playwright/exporter.ts`

Generates test scripts from recorded actions using semantic locators in preference order:
1. `getByRole()` (if ARIA role available)
2. `getByText()` (if text content available)
3. `getByTestId()` (if data-testid available)
4. CSS selector (fallback)

### Supported Formats

| Format | Output |
|---|---|
| TypeScript | Playwright test with `@playwright/test` imports |
| JavaScript | CommonJS Playwright script |
| Python | `pytest-playwright` test file |
| Java | JUnit + Playwright Java test class |
| C# | NUnit + Playwright .NET test class |
| JSON | Portable recording format (importable) |
| GitHub Actions | CI workflow YAML with Playwright setup |

## Configuration Reference

All settings are under the `playwrightVcr` namespace in VS Code settings.

| Setting | Type | Default | Description |
|---|---|---|---|
| `playwrightVcr.defaultBrowser` | enum | `chromium` | Browser engine: `chromium`, `firefox`, `webkit` |
| `playwrightVcr.headless` | boolean | `false` | Run playback in headless mode |
| `playwrightVcr.slowMo` | number | `0` | Delay between actions in ms |
| `playwrightVcr.selfHealing.enabled` | boolean | `true` | Enable self-healing selector resolution |
| `playwrightVcr.selfHealing.confidenceThreshold` | number | `0.7` | Minimum cosine similarity for Tier 2 matches |
| `playwrightVcr.ai.provider` | enum | `openai` | LLM provider: `openai`, `anthropic`, `ollama` |
| `playwrightVcr.ai.model` | string | `gpt-4o-mini` | Model identifier for Tier 3 repair |
| `playwrightVcr.ai.apiKey` | string | `""` | API key for OpenAI or Anthropic |
| `playwrightVcr.ai.ollamaUrl` | string | `http://localhost:11434` | Ollama server URL |
| `playwrightVcr.orchestration.maxRetries` | number | `3` | Maximum retry attempts for failed jobs |
| `playwrightVcr.orchestration.concurrency` | number | `2` | Maximum parallel job executions |
| `playwrightVcr.overlayDismissals` | array | `[]` | CSS selectors for auto-dismissing overlays (cookie banners, chat widgets) |
| `playwrightVcr.webhookUrl` | string | `""` | Webhook URL for execution-complete notifications |

## Key Design Decisions

### sql.js over better-sqlite3
`better-sqlite3` is a native Node.js addon requiring C++ build tools (Visual Studio on Windows). `sql.js` compiles SQLite to WASM, eliminating the native build dependency. Trade-off: slightly slower queries and manual persistence (flush to disk after writes), but dramatically simpler installation.

### Inline styles over Tailwind CSS
Webview panels use inline styles with VS Code CSS custom properties rather than Tailwind. This ensures the extension UI matches the user's VS Code theme without requiring a CSS build pipeline or risking style conflicts.

### Externalized Playwright and @xenova/transformers
Both libraries are too large to bundle and have complex native/WASM dependencies. They're listed as `external` in the esbuild config and resolved at runtime from `node_modules`.

### Async Database initialization
`sql.js` requires an async `initSqlJs()` call to load the WASM binary. The `Database` constructor starts this asynchronously and exposes `waitReady()` for consumers. The extension entry point awaits this before proceeding.

### Single webview bundle with panel routing
All webview panels share a single React bundle (`out/webview.js`). The panel type is passed via a `data-panel` attribute on the root HTML element, and `App.tsx` routes to the appropriate component. This avoids maintaining multiple build targets for the webview.

## Known Limitations

1. **Scheduling requires VS Code open** — The `node-cron` scheduler runs in the extension host process. Jobs won't fire when VS Code is closed. For always-on scheduling, export recordings and run them via a system scheduler (cron, Task Scheduler).

2. **MiniLM model download** — The `all-MiniLM-L6-v2` model (~50MB) downloads on first use of Tier 2 self-healing. A progress indicator should be shown (not yet implemented).

3. **sql.js persistence** — The database is flushed to disk after every write. Under heavy write loads (many rapid actions during recording), this could be a bottleneck. Consider batching writes.

4. **HAR export** — Listed in the plan but not yet implemented in `exporter.ts`.

5. **Visual regression (Pixelmatch)** — `pixelmatch` and `pngjs` are included as dependencies but screenshot comparison UI is not yet wired up in the playback panel.

6. **No import functionality** — JSON export is supported but there's no corresponding import flow to load recordings from another machine.

7. **Single-page recordings only** — The recorder captures events on the initial page. Multi-tab or popup workflows are not yet handled.
