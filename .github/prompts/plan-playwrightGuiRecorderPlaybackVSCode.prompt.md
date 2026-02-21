## Plan: PlaywrightVCR — VS Code Extension

> **Status Legend**: ✅ Complete | 🔧 Scaffolded (needs refinement/testing) | ⬜ Not started

Build a VS Code extension (TypeScript) that wraps Playwright's recording, tracing, and playback APIs into a light-duty RPA tool. Uses a **Tree View** sidebar for recording library management, **Webview panels** for rich playback visualization and monitoring, and a **Node.js backend** running inside the extension host for Playwright orchestration. Self-healing uses a tiered locator strategy (testId → role → text → css → xpath) with LLM-based selector repair as a last resort. Basic cron-like scheduling via `node-cron` with a SQLite-backed job queue.

### Key Architectural Decisions

| Concern | Decision | Rationale |
|---|---|---|
| Shell | VS Code Extension | Lightest weight, no Electron overhead, built-in terminal/editor/file system, Marketplace distribution |
| UI | TreeView sidebar + Webview panels (React) | TreeView for library browsing; Webview for recording controls, playback dashboard, and monitoring |
| Recording | Injected DOM event listeners via `addInitScript` + `context.tracing` | Dual-track: real-time event stream for UI feedback + trace ZIP for reliable action extraction |
| Storage | SQLite via `sql.js` (WASM) | Recordings metadata, execution history, healed selectors cache — stored in extension `globalStoragePath`. Changed from `better-sqlite3` to avoid native build toolchain requirement on Windows. |
| Self-healing | Tiered: multi-locator → embedding similarity → LLM repair | Local-first (fast, free), LLM only when local fails (configurable provider: OpenAI/Anthropic/local) |
| Orchestration | `node-cron` + SQLite-backed lightweight queue | Basic scheduling without infrastructure; no Redis dependency |
| Trace format | Custom JSON action log + Playwright trace ZIPs | JSON for fast parsing/playback; trace ZIP for rich debugging via embedded Trace Viewer |

### Steps

1. ✅ **Scaffold VS Code Extension project** — Create the project structure:

```
src/
  extension.ts              ← activation, command registration
  views/
    sidebarProvider.ts      ← TreeDataProvider for recording library
    recordingPanel.ts       ← Webview panel: record controls, URL input, device emulation
    playbackPanel.ts        ← Webview panel: playback dashboard, step timeline, screenshots
    monitoringPanel.ts      ← Webview panel: execution history, scheduling, alerts
  webview/                  ← React app bundled with esbuild/vite for webview panels
    App.tsx
    components/
      RecordingControls.tsx
      PlaybackTimeline.tsx
      LibraryList.tsx
      ScheduleManager.tsx
      SelfHealingReport.tsx
  playwright/
    recorder.ts             ← Browser launch, DOM event injection, tracing
    player.ts               ← Playback engine with self-healing
    exporter.ts             ← Export to JS/TS/Python/Java/C#, HAR, CI configs
    selfHealing.ts          ← Tiered locator resolution + LLM repair
  storage/
    database.ts             ← SQLite: recordings, execution history, healed selectors
    fileManager.ts          ← Trace ZIPs, screenshots in globalStoragePath
  orchestration/
    scheduler.ts            ← node-cron scheduling
    queue.ts                ← Lightweight job queue (SQLite-backed)
    executor.ts             ← Job execution: pick recording, run player, report results
  ai/
    locatorEmbeddings.ts    ← Generate/compare element embeddings for similarity matching
    llmRepair.ts            ← LLM-based selector repair (OpenAI/Anthropic/Ollama)
    domSimplifier.ts        ← Reduce DOM to fit LLM context window
```

Configure `package.json` with activation events, commands, views contribution points (sidebar, webview), and keybindings. Use `esbuild` for both the extension host bundle and the webview React bundle.

> ✅ **Done.** Full project structure scaffolded. `package.json` configured with 10 commands, 3 sidebar views, 14 configuration properties. `esbuild.js` handles dual-target bundling (Node extension host + browser webview). TypeScript compiles cleanly. Inline styles using VS Code theme CSS variables used instead of Tailwind CSS.

2. 🔧 **Build the recording engine** — Create `src/playwright/recorder.ts`:

- Launch a headed Chromium via `chromium.launch({ headless: false, slowMo: 0 })` from the extension host process
- Start tracing: `context.tracing.start({ screenshots: true, snapshots: true })`
- Inject a DOM event capture script via `context.addInitScript()` that listens for `click`, `input`, `change`, `submit`, `keydown`, `scroll`, `select` events
- Expose a callback via `page.exposeFunction('__rpaEvent', handler)` to stream events back to the extension in real-time
- For each captured event, generate **all locator strategies** for the target element:
  - `data-testid` attribute
  - ARIA role + accessible name
  - Associated label text
  - Visible text content
  - Placeholder text
  - CSS selector (computed via a lightweight unique-selector algorithm)
  - XPath (positional fallback)
  - **Element fingerprint**: tag, text, id, classes, aria attributes, bounding rect, parent chain hash → stored for embedding-based similarity
- Store the raw action sequence as a JSON document alongside the Playwright trace ZIP
- Support `--save-storage` equivalent: serialize `context.storageState()` for authenticated recordings
- Send real-time recording events to the Webview panel via `postMessage` for live preview

> 🔧 **Scaffolded.** `recorder.ts` implements browser launch, DOM event injection (`CAPTURE_SCRIPT`), tracing, `__rpaEvent` callback, multi-locator generation (CSS selector + XPath + element fingerprint), auth state persistence, and real-time event streaming. Needs integration testing against real websites.

3. 🔧 **Implement the recording library** — Create `src/storage/database.ts`:

- SQLite database in `context.globalStoragePath` with tables:
  - `recordings` — id, name, url, created_at, updated_at, tags, description, action_count, duration_ms, auth_state_path
  - `actions` — id, recording_id, step_index, action_type, url, locators (JSON), screenshot_path, timestamp_ms
  - `executions` — id, recording_id, started_at, finished_at, status (pass/fail/partial), trigger (manual/scheduled), failure_step, error_message
  - `healed_selectors` — id, recording_id, step_index, original_locator, healed_locator, strategy_used, healed_at, success_count
  - `schedules` — id, recording_id, cron_expression, enabled, last_run, next_run
- File manager stores trace ZIPs and screenshots in `globalStoragePath/recordings/{id}/`
- TreeView sidebar (`sidebarProvider.ts`) reads from SQLite to show library as a tree: grouped by tags, sortable by date/name/status

> 🔧 **Scaffolded.** `database.ts` implements all 6 tables with full CRUD using `sql.js` (WASM — changed from `better-sqlite3` to avoid native build toolchain on Windows). `fileManager.ts` manages trace ZIPs, screenshots, auth state files. Three TreeDataProviders created (`sidebarProvider.ts`, `executionsProvider.ts`, `schedulesProvider.ts`). Needs unit tests.

4. 🔧 **Build the playback engine with self-healing** — Create `src/playwright/player.ts` + `src/playwright/selfHealing.ts`:

Playback loop for each action in the recording:

1. Load the action's locator strategies from the DB
2. **Tier 1 — Direct match** (fast, ~50ms): Try locators in priority order: testId → role → label → text → css → xpath. Use Playwright's `locator.or()` chaining. If exactly one element matches, proceed.
3. **Tier 2 — Embedding similarity** (medium, ~100ms): If all direct locators fail, compute embeddings for all visible elements on the page (tag + text + attributes → vector via `@xenova/transformers` running `all-MiniLM-L6-v2`). Compare against the recorded element's fingerprint. Select the closest match above a configurable threshold (default 0.85).
4. **Tier 3 — LLM repair** (slow, ~2-5s): If embedding match is below threshold, send a simplified DOM snapshot + original element description to the configured LLM (OpenAI GPT-4o-mini, Anthropic Claude Haiku, or local Ollama). Parse the returned selector, validate against the live page.
5. **Cache healed selectors** in the `healed_selectors` table so future runs skip to the corrected locator.
6. After each action: capture screenshot, record timing, track status (success/healed/failed).
7. Support configurable `slowMo`, headed/headless toggle, and browser selection (Chromium/Firefox/WebKit).
8. Use `addLocatorHandler()` to auto-dismiss common overlays (cookie banners, chat widgets) — configurable list in extension settings.
9. Report per-step results back to the Webview playback panel in real-time via `postMessage`.

> 🔧 **Scaffolded.** `player.ts` implements the full playback loop with self-healing integration, overlay handler registration, screenshot capture, and execution record creation. `selfHealing.ts` implements all 3 tiers (direct locator → embedding similarity → LLM repair) with healed selector caching. Needs integration testing with intentionally broken selectors.

5. 🔧 **Build the Webview UI** — Create `src/webview/` React app (inline styles with VS Code theme variables):

Three webview panels:

- **Recording Panel** — URL input, browser/device dropdown, record/stop buttons, live action feed showing captured events in real-time, authentication toggle (save storage state)
- **Playback Panel** — Step timeline with status indicators (green/yellow/red for pass/healed/fail), screenshot at each step, timing breakdown, self-healing report showing original vs. healed selectors, diff view for visual regression (using Pixelmatch against baseline screenshots)
- **Monitoring Panel** — Execution history table (date, status, duration, trigger type), schedule manager (add/edit/remove cron schedules), alerts configuration (VS Code notifications + optional webhook URL)

Communication between Webview and extension host via `vscode.postMessage` / `onDidReceiveMessage` API.

> 🔧 **Scaffolded.** Four React components created: `RecordingControls.tsx`, `PlaybackTimeline.tsx`, `ScheduleManager.tsx`, `SelfHealingReport.tsx`. Uses inline styles with VS Code CSS theme variables (no Tailwind). Three WebviewPanel managers handle message routing between extension host and webview. Needs visual polish and end-to-end message flow testing.

6. 🔧 **Add export functionality** — Create `src/playwright/exporter.ts`:

- Generate Playwright test files in TypeScript and JavaScript (using the recorded locators with resilient `getByRole`/`getByText` preference)
- Generate Python (`pytest-playwright`), Java, and C# equivalents via template strings
- Export raw trace ZIP for Playwright Trace Viewer
- Export HAR files from trace data for network replay
- Generate GitHub Actions YAML for CI integration (workflow file that installs Playwright, runs the exported test)
- Export recording as a portable JSON format that can be imported on another machine

> 🔧 **Scaffolded.** `exporter.ts` implements generators for TypeScript, JavaScript, Python, Java, C#, JSON, and GitHub Actions YAML. Uses semantic locators (`getByRole`/`getByText`) in preference order. HAR export not yet implemented.

7. 🔧 **Implement basic orchestration** — Create `src/orchestration/`:

- **Scheduler**: `node-cron` library evaluates cron expressions. On match, enqueues a job.
- **Queue**: Lightweight SQLite-backed job queue (no Redis needed). Table: `jobs` — id, recording_id, status (queued/running/completed/failed), created_at, started_at, finished_at, attempts, max_attempts, result_json.
- **Executor**: Polls the queue, picks the next job, runs the playback engine, updates job status. Configurable concurrency (default: 1 — sequential).
- **Retry**: Exponential backoff (1s, 2s, 4s) up to configurable max attempts (default: 3).
- **Notifications**: On failure, show VS Code notification with action to open the execution report. Optional webhook POST for external alerting (Slack, Discord, Teams).
- Scheduling runs while VS Code is open — uses the extension host process. Does NOT run when VS Code is closed (document this limitation; suggest a complementary systemd/Windows Task Scheduler for always-on needs).

> 🔧 **Scaffolded.** `scheduler.ts` (node-cron), `queue.ts` (SQLite-backed), and `executor.ts` (polling + exponential backoff + webhook notifications) all implemented. Needs testing under load and with actual scheduled recordings.

8. 🔧 **AI integration layer** — Create `src/ai/`:

- **LLM Repair** (`src/ai/llmRepair.ts`): Configurable via VS Code settings — `rpa.ai.provider` (openai/anthropic/ollama), `rpa.ai.model`, `rpa.ai.apiKey`. Sends a structured prompt with: original selector, element description (tag, text, role, visual position), simplified DOM (max ~4K tokens via `domSimplifier.ts`), and asks for a replacement Playwright locator. Validates the response selector against the live page before accepting.
- **DOM Simplifier** (`src/ai/domSimplifier.ts`): Strips `<script>`, `<style>`, `<svg>` internals, collapses deep nesting, truncates long attribute values, keeps only elements in the viewport area near the target. Goal: reduce a full page DOM from ~100KB to ~4KB while preserving enough context for the LLM to locate the element.
- **Locator Embeddings** (`src/ai/locatorEmbeddings.ts`): Uses `@xenova/transformers` to run MiniLM locally in Node.js. Generates embeddings from a string representation of each element's attributes. At playback, computes cosine similarity between the recorded element embedding and all candidate elements. This runs entirely local — no API calls, no cost.
- **Future expansion point**: Natural language action definitions ("click the blue submit button") that resolve to locators via LLM, enabling non-coded recording editing.

> 🔧 **Scaffolded.** `llmRepair.ts` supports OpenAI, Anthropic, and Ollama with structured prompts and selector extraction. `domSimplifier.ts` strips non-essential DOM content (scripts, styles, SVGs), limits depth and element count. `locatorEmbeddings.ts` uses `@xenova/transformers` MiniLM for local embedding generation with cosine similarity matching. Needs real-world testing with actual LLM providers.

### Verification ⬜ Not started

- **Unit tests**: Vitest for the recording engine, self-healing logic, exporter templates, and database layer. Mock Playwright's browser APIs.
- **Integration tests**: Use Playwright to test against a local fixture HTML page. Record, then playback, then mutate the fixture (change selectors/text), then verify self-healing kicks in.
- **E2E**: Use `@vscode/test-electron` to test the full extension — activate, open sidebar, trigger a recording against a test server, verify execution history appears.
- **Manual**: Install the extension in VS Code, record a flow on a real website, verify playback with and without DOM changes, test scheduling.

### Further Considerations ⬜ Not started

1. **Browser binary management** — Use `playwright install` on first activation to download browsers. Show a progress notification in VS Code. Store in the extension's global storage path or the default Playwright cache location.

2. **Trace viewer integration** — Embed Playwright's built-in Trace Viewer in a webview panel for rich playback visualization, or build a custom lightweight timeline from the trace JSON data (screenshots + action log).

3. **Authentication handling** — Support `context.storageState()` to persist cookies/localStorage for authenticated recordings, allowing users to record behind login walls. Store auth states per-recording in the database.

4. **VS Code closed limitation** — Scheduling only works while VS Code is running. For always-on needs, provide a CLI companion (`npx playwright-vcr run --schedule`) or export systemd/Task Scheduler configs.

5. **Model download for embeddings** — The `@xenova/transformers` `all-MiniLM-L6-v2` model is ~50MB. Download on first use of self-healing with a progress indicator. Cache in `globalStoragePath/models/`.
