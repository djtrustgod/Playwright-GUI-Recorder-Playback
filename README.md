<p align="center">
  <img src="assets/logo/Logo128.png" alt="PlaywrightVCR Logo" width="128" />
</p>

# PlaywrightVCR — VS Code Extension

**Lightweight [Playwright](https://github.com/microsoft/playwright) browser record, playback, and recording file export within VSCode.**

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

### Install (Sideload)

Precompiled `.vsix` files are available on the [Releases](https://github.com/djtrustgod/Playwright-GUI-Recorder-Playback/releases) page — download the latest and skip straight to the install step below.

To build from source instead:

```bash
git clone https://github.com/djtrustgod/Playwright-GUI-Recorder-Playback.git
cd Playwright-GUI-Recorder-Playback
npm install
npx playwright install
npm run build
```

Then package and install the extension:

```bash
npx @vscode/vsce package        # Creates playwright-vcr-0.5.1.vsix
code --install-extension playwright-vcr-0.5.1.vsix
```

Alternatively, install from the VS Code UI:

1. Open VS Code.
2. Go to the **Extensions** view (`Ctrl+Shift+X`).
3. Click the **`···`** menu (top-right of the Extensions sidebar) → **Install from VSIX…**
4. Select the generated `.vsix` file.
5. Reload VS Code when prompted.

> **Tip:** To update after pulling new changes, run `npm run build` and `npx @vscode/vsce package` again, then reinstall the `.vsix`.

### Development

To run the extension in development mode without packaging:

```bash
npm run watch    # Rebuild on save
```

Then press **F5** in VS Code to launch the Extension Development Host.

```bash
npm test         # Run tests
npm run lint     # Lint
```

## Commands

Open the Command Palette (`Ctrl+Shift+P`) and type **"PlaywrightVCR"**:

| Command | Description |
|---|---|
| `Start Recording` | Open the recording panel and begin capturing actions. |
| `Stop Recording` | Finish and save the current recording. |
| `Play Recording` | Play back a saved recording with self-healing. |
| `Export Recording` | Export to a test script or CI config. |
| `Open Monitoring` | View execution history and scheduling. |
| `Delete Recording` | Remove a recording and its artifacts. |

## How Self-Healing Works

1. **Tier 1 — Direct** *(always on)*: Tries all stored locator strategies in priority order: `testId` → `role` → `label` → `text` → `placeholder` → `css` → `xpath`.
2. **Tier 2 — Embedding** *(on by default)*: Finds the closest matching element using local MiniLM embeddings (cosine similarity ≥ `selfHealing.embeddingThreshold`).
3. **Tier 3 — LLM Repair** *(off by default)*: Sends a simplified DOM snapshot + element fingerprint to an LLM to generate a repaired CSS selector. Supports OpenAI, Anthropic, and local Ollama.

Healed selectors are cached in SQLite and reused on subsequent runs.

### Enabling LLM Self-Healing

Tier 3 LLM repair is **disabled by default**. To turn it on:

1. Set `playwrightVcr.selfHealing.llmEnabled` to `true` in VS Code settings.
2. Configure your AI provider and store an API key:
   - Run `Ctrl+Shift+P` → **"PlaywrightVCR: Open Settings"** to open the AI Settings panel.
   - Select a provider (OpenAI, Anthropic, or Ollama) and save your API key.
   - Ollama runs locally and does not require an API key.

See [AI Settings & API Key Setup](#ai-settings--api-key-setup) below for detailed provider instructions.

## AI Settings & API Key Setup

Open the **AI Settings** panel from the Recording Library toolbar or via `Ctrl+Shift+P` → **"PlaywrightVCR: Open Settings"**.

### Connecting to Anthropic (Claude)

1. Select **Anthropic** as the LLM provider.
2. Click **Get API Key →** — this opens the [Anthropic Console](https://console.anthropic.com/settings/keys) in your browser.
3. Create or copy your API key from the Console.
4. Switch back to VS Code — the key input is auto-focused for pasting.
5. Click **Save**, then **Test Connection** to verify.

> **Note:** Anthropic does not support OAuth login for third-party apps. An API key from the Anthropic Console is required (usage-based billing applies).

### Connecting to OpenAI

1. Select **OpenAI** as the provider.
2. Enter your API key (from [platform.openai.com](https://platform.openai.com/api-keys)) and click **Save**.
3. Click **Test Connection** to verify.

### Using Ollama (Local / Free)

1. Select **Ollama (local)** as the provider.
2. Ensure Ollama is running locally (default: `http://localhost:11434`).
3. No API key needed — click **Test Connection** to verify.

## Configuration

Settings live under `playwrightVcr.*` in VS Code settings. Key options:

| Setting | Default | Description |
|---|---|---|
| `defaultBrowser` | `chromium` | Browser engine (chromium/firefox/webkit). |
| `headless` | `false` | Run playback headlessly. |
| `selfHealing.enabled` | `true` | Enable self-healing selectors. |
| `selfHealing.embeddingThreshold` | `0.85` | Similarity threshold for Tier 2 embedding matching. |
| `selfHealing.llmEnabled` | `false` | Enable Tier 3 LLM-based repair. |
| `ai.provider` | `openai` | LLM provider for Tier 3 repair (openai/anthropic/ollama). |
| `ai.model` | `gpt-4o-mini` | Model name sent to the provider's API. |
| `ai.ollamaUrl` | `http://localhost:11434` | Local Ollama server URL. |

See [Implementation.md](Implementation.md) for the full settings reference and technical details.

## Project Status

| Area | Status |
|---|---|
| Project scaffold & build | ✅ Complete — esbuild dual-target, `.vsix` packaged |
| Recording engine | 🔧 In progress — fully implemented, needs reliability fixes |
| Playback + self-healing | 🔧 In progress — all 3 tiers built, needs debugging |
| Storage (SQLite via sql.js) | ✅ Complete — full CRUD, 7 tables, 19 tests passing |
| Webview UI (React) | ⚠️ Scaffolded — all panels wired up, needs visual polish |
| Export (multi-language) | 🔧 In progress — 7/8 formats complete, HAR export pending |
| Orchestration (scheduling) | ⚠️ Scaffolded — cron + queue + executor work, needs load testing |
| AI layer (embeddings + LLM) | ⚠️ Scaffolded — all integrations built, needs end-to-end testing |
| Test suite | 🔧 In progress — 87 tests passing, missing AI & orchestration coverage |
| Documentation | 🔧 In progress — comprehensive, kept in sync with code |
| VS Code Marketplace | ⚠️ Pre-release — v0.5.0 `.vsix` on [GitHub Releases](https://github.com/djtrustgod/Playwright-GUI-Recorder-Playback/releases), not yet on marketplace |

## Documentation

- [Implementation.md](Implementation.md) — Detailed technical architecture, file reference, and configuration
- [Plan](.github/prompts/plan-playwrightGuiRecorderPlaybackVSCode.prompt.md) — Original design plan with completion status

## License

MIT
