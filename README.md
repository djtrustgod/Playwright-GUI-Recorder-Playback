# Playwright RPA — VS Code Extension

> **🚧 Work In Progress** — This project is under active development. Core scaffolding is complete and the project builds, but features are not yet integration-tested or production-ready. Contributions and feedback welcome!

A **light-duty RPA tool** built as a VS Code extension that uses [Playwright](https://playwright.dev) to **record**, **play back**, and **schedule** browser automation workflows — with AI-powered **self-healing selectors**.

## Features

| Capability | Details |
|---|---|
| **Recording** | Opens a headed browser, captures every user action with full element fingerprints. |
| **Playback** | Replays recordings step-by-step with live progress and screenshot capture. |
| **Self-Healing** | Three-tier selector repair: direct locator fallback → local embedding similarity → LLM-powered repair. |
| **Scheduling** | Cron-based scheduling with a job queue, retries, and webhook notifications. |
| **Export** | Generate test scripts in TypeScript, JavaScript, Python, Java, C#, JSON, and GitHub Actions YAML. |
| **Monitoring** | Execution history dashboard with per-step pass/heal/fail indicators. |

## Quick Start

### Prerequisites

- **VS Code** ≥ 1.85
- **Node.js** ≥ 18

### Install & Run

```bash
git clone https://github.com/djtrustgod/Playwright-GUI-Recorder-Playback.git
cd Playwright-GUI-Recorder-Playback
npm install
npx playwright install
npm run build
```

Then press **F5** in VS Code to launch the Extension Development Host.

### Development

```bash
npm run watch    # Rebuild on save
npm test         # Run tests
npm run lint     # Lint
```

## Commands

Open the Command Palette (`Ctrl+Shift+P`) and type **"Playwright RPA"**:

| Command | Description |
|---|---|
| `Start Recording` | Open the recording panel and begin capturing actions. |
| `Stop Recording` | Finish and save the current recording. |
| `Play Recording` | Play back a saved recording with self-healing. |
| `Export Recording` | Export to a test script or CI config. |
| `Open Monitoring` | View execution history and scheduling. |
| `Delete Recording` | Remove a recording and its artifacts. |

## How Self-Healing Works

1. **Tier 1 — Direct**: Try all stored locator strategies (CSS, XPath, text, role, testid) in order.
2. **Tier 2 — Embedding**: Find the closest matching element using local MiniLM embeddings (cosine similarity).
3. **Tier 3 — LLM Repair**: Send simplified DOM + element fingerprint to an LLM for a new selector. Supports OpenAI, Anthropic, and local Ollama.

Healed selectors are cached and reused on subsequent runs.

## Configuration

Settings live under `playwrightRpa.*` in VS Code settings. Key options:

| Setting | Default | Description |
|---|---|---|
| `defaultBrowser` | `chromium` | Browser engine (chromium/firefox/webkit). |
| `headless` | `false` | Run playback headlessly. |
| `selfHealing.enabled` | `true` | Enable self-healing selectors. |
| `ai.provider` | `openai` | LLM provider for Tier 3 repair. |

See [Implementation.md](Implementation.md) for the full settings reference and technical details.

## Project Status

| Area | Status |
|---|---|
| Project scaffold & build | ✅ Complete |
| Recording engine | 🔧 Scaffolded — needs integration testing |
| Playback + self-healing | 🔧 Scaffolded — needs integration testing |
| Storage (SQLite via sql.js) | 🔧 Scaffolded — needs unit tests |
| Webview UI (React) | 🔧 Scaffolded — needs visual polish |
| Export (multi-language) | 🔧 Scaffolded — HAR export pending |
| Orchestration (scheduling) | 🔧 Scaffolded — needs load testing |
| AI layer (embeddings + LLM) | 🔧 Scaffolded — needs real-world testing |
| Test suite | ⬜ Not started |
| Documentation | ⬜ In progress |

## Documentation

- [Implementation.md](Implementation.md) — Detailed technical architecture, file reference, and configuration
- [Plan](.github/prompts/plan-playwrightGuiRecorderPlaybackVSCode.prompt.md) — Original design plan with completion status

## License

MIT
