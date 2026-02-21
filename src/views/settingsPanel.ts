import * as vscode from 'vscode';

/**
 * Settings panel for AI / Self-Healing configuration.
 *
 * Provides a webview UI where users can:
 * - Select an LLM provider (OpenAI, Anthropic, Ollama)
 * - Enter / remove API keys (stored in SecretStorage)
 * - Choose the model name
 * - Toggle self-healing and LLM repair on/off
 * - Adjust the embedding similarity threshold
 * - Set the Ollama server URL
 */
export class SettingsPanelManager {
  private panel: vscode.WebviewPanel | undefined;

  constructor(
    private readonly context: vscode.ExtensionContext
  ) {}

  async show(): Promise<void> {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
      await this.sendCurrentSettings();
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      'playwrightVcr.settings',
      'PlaywrightVCR — AI Settings',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    this.panel.webview.html = this.getHtml();

    this.panel.webview.onDidReceiveMessage(async (message) => {
      await this.handleMessage(message);
    });

    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });

    // Send initial settings once the webview is ready
    setTimeout(() => this.sendCurrentSettings(), 200);
  }

  /** Gather current config + key status and push to webview */
  async sendCurrentSettings(): Promise<void> {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const provider = config.get<string>('ai.provider', 'openai');

    // Check which providers have keys stored
    const hasOpenAIKey = !!(await this.context.secrets.get('playwrightVcr.apiKey.openai'));
    const hasAnthropicKey = !!(await this.context.secrets.get('playwrightVcr.apiKey.anthropic'));

    this.panel?.webview.postMessage({
      type: 'settingsLoaded',
      payload: {
        selfHealingEnabled: config.get<boolean>('selfHealing.enabled', true),
        embeddingThreshold: config.get<number>('selfHealing.embeddingThreshold', 0.85),
        llmEnabled: config.get<boolean>('selfHealing.llmEnabled', false),
        provider,
        model: config.get<string>('ai.model', 'gpt-4o-mini'),
        ollamaUrl: config.get<string>('ai.ollamaUrl', 'http://localhost:11434'),
        hasOpenAIKey,
        hasAnthropicKey,
      },
    });
  }

  /** Handle messages sent from the webview */
  async handleMessage(message: { type: string; payload?: Record<string, unknown> }): Promise<void> {
    switch (message.type) {
      case 'getSettings':
        await this.sendCurrentSettings();
        break;

      case 'updateSetting': {
        const { key, value } = message.payload as { key: string; value: unknown };
        const config = vscode.workspace.getConfiguration('playwrightVcr');
        await config.update(key, value, vscode.ConfigurationTarget.Global);
        this.panel?.webview.postMessage({ type: 'settingSaved', payload: { key } });
        break;
      }

      case 'setApiKey': {
        const { provider, apiKey } = message.payload as { provider: string; apiKey: string };
        if (!apiKey) {
          await this.context.secrets.delete(`playwrightVcr.apiKey.${provider}`);
          vscode.window.showInformationMessage(`${provider} API key removed.`);
        } else {
          await this.context.secrets.store(`playwrightVcr.apiKey.${provider}`, apiKey);
          vscode.window.showInformationMessage(`${provider} API key saved securely.`);
        }
        // Push updated key status back
        await this.sendCurrentSettings();
        break;
      }

      case 'testConnection': {
        const { provider } = message.payload as { provider: string };
        const result = await this.testProviderConnection(provider);
        this.panel?.webview.postMessage({ type: 'connectionTestResult', payload: result });
        break;
      }

      case 'openAnthropicConsole': {
        const url = vscode.Uri.parse('https://console.anthropic.com/settings/keys');
        await vscode.env.openExternal(url);
        setTimeout(() => {
          this.panel?.webview.postMessage({ type: 'focusAnthropicKey' });
        }, 500);
        break;
      }
    }
  }

  /** Quick connectivity test for the selected provider */
  private async testProviderConnection(provider: string): Promise<{ ok: boolean; message: string }> {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const model = config.get<string>('ai.model', 'gpt-4o-mini');

    if (provider === 'ollama') {
      const ollamaUrl = config.get<string>('ai.ollamaUrl', 'http://localhost:11434');
      try {
        const res = await fetch(`${ollamaUrl}/api/tags`);
        if (res.ok) {
          const data = await res.json() as { models?: { name: string }[] };
          const names = (data.models ?? []).map((m: { name: string }) => m.name).join(', ');
          return { ok: true, message: `Connected. Available models: ${names || '(none)'}` };
        }
        return { ok: false, message: `Ollama returned status ${res.status}` };
      } catch {
        return { ok: false, message: `Cannot reach Ollama at ${ollamaUrl}` };
      }
    }

    // For cloud providers, verify the API key is present
    const apiKey = await this.context.secrets.get(`playwrightVcr.apiKey.${provider}`);
    if (!apiKey) {
      return { ok: false, message: `No API key stored for ${provider}. Enter one above.` };
    }

    // Lightweight validation: send a tiny request
    try {
      if (provider === 'openai') {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${apiKey}` },
        });
        if (res.ok) return { ok: true, message: `Connected to OpenAI. Model: ${model}` };
        if (res.status === 401) return { ok: false, message: 'Invalid OpenAI API key.' };
        return { ok: false, message: `OpenAI returned status ${res.status}` };
      }

      if (provider === 'anthropic') {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: model || 'claude-3-haiku-20240307',
            max_tokens: 1,
            messages: [{ role: 'user', content: 'Hi' }],
          }),
        });

        if (res.ok) {
          return { ok: true, message: `Connected to Anthropic. Model: ${model}` };
        }
        if (res.status === 401) {
          return { ok: false, message: 'Invalid Anthropic API key. Check that the key is correct and active.' };
        }
        if (res.status === 403) {
          return { ok: false, message: 'Anthropic API key lacks permissions. Check your account settings.' };
        }
        if (res.status === 429) {
          return { ok: true, message: `Connected to Anthropic (rate limited). Model: ${model}` };
        }
        if (res.status === 400 || res.status === 404) {
          const body = await res.json().catch(() => ({})) as { error?: { message?: string } };
          const errMsg = body?.error?.message || `Anthropic returned status ${res.status}`;
          if (errMsg.toLowerCase().includes('model')) {
            return { ok: true, message: `Anthropic key is valid, but model "${model}" may not be available. ${errMsg}` };
          }
          return { ok: false, message: errMsg };
        }
        return { ok: false, message: `Anthropic returned status ${res.status}` };
      }

      return { ok: false, message: `Unknown provider: ${provider}` };
    } catch (err) {
      return { ok: false, message: `Connection failed: ${(err as Error).message}` };
    }
  }

  private getHtml(): string {
    const nonce = getNonce();
    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlaywrightVCR — AI Settings</title>
  <style>
    :root {
      --bg: var(--vscode-editor-background);
      --fg: var(--vscode-editor-foreground);
      --input-bg: var(--vscode-input-background);
      --input-fg: var(--vscode-input-foreground);
      --input-border: var(--vscode-input-border);
      --btn-bg: var(--vscode-button-background);
      --btn-fg: var(--vscode-button-foreground);
      --btn-hover: var(--vscode-button-hoverBackground);
      --secondary-bg: var(--vscode-button-secondaryBackground);
      --secondary-fg: var(--vscode-button-secondaryForeground);
      --border: var(--vscode-panel-border, #444);
      --success: #4caf50;
      --error: var(--vscode-errorForeground, #f44);
      --muted: var(--vscode-descriptionForeground);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--vscode-font-family); color: var(--fg); background: var(--bg); padding: 20px; line-height: 1.5; }
    h1 { font-size: 1.4em; margin-bottom: 4px; }
    .subtitle { color: var(--muted); margin-bottom: 20px; font-size: 0.9em; }
    .section { border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    .section h2 { font-size: 1.1em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    .field { margin-bottom: 14px; }
    .field:last-child { margin-bottom: 0; }
    label { display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.9em; }
    .hint { color: var(--muted); font-size: 0.8em; margin-top: 2px; }
    select, input[type="text"], input[type="password"], input[type="number"] {
      width: 100%; padding: 6px 10px; background: var(--input-bg); color: var(--input-fg);
      border: 1px solid var(--input-border); border-radius: 4px; font-size: 0.9em;
    }
    select { cursor: pointer; }
    input[type="range"] { width: 100%; }
    .toggle-row { display: flex; align-items: center; gap: 10px; }
    .toggle-row label { margin-bottom: 0; font-weight: normal; }
    .toggle { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle .slider { position: absolute; inset: 0; background: #555; border-radius: 22px; cursor: pointer; transition: .2s; }
    .toggle .slider::before { content: ''; position: absolute; height: 16px; width: 16px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; }
    .toggle input:checked + .slider { background: var(--btn-bg); }
    .toggle input:checked + .slider::before { transform: translateX(18px); }
    .api-key-row { display: flex; gap: 8px; align-items: flex-end; }
    .api-key-row input { flex: 1; }
    .btn { padding: 6px 14px; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em; white-space: nowrap; }
    .btn-primary { background: var(--btn-bg); color: var(--btn-fg); }
    .btn-primary:hover { background: var(--btn-hover); }
    .btn-secondary { background: var(--secondary-bg); color: var(--secondary-fg); }
    .btn-danger { background: var(--error); color: #fff; }
    .key-status { display: inline-flex; align-items: center; gap: 4px; font-size: 0.8em; margin-top: 4px; }
    .key-status.stored { color: var(--success); }
    .key-status.missing { color: var(--error); }
    .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .dot.green { background: var(--success); }
    .dot.red { background: var(--error); }
    .test-result { margin-top: 10px; padding: 8px 12px; border-radius: 4px; font-size: 0.85em; }
    .test-result.ok { border: 1px solid var(--success); color: var(--success); }
    .test-result.fail { border: 1px solid var(--error); color: var(--error); }
    .test-result.hidden { display: none; }
    .row { display: flex; gap: 12px; }
    .row > * { flex: 1; }
    .provider-note { color: var(--muted); font-size: 0.8em; font-style: italic; margin-top: 4px; }
  </style>
</head>
<body>
  <h1>AI &amp; Self-Healing Settings</h1>
  <p class="subtitle">Configure LLM providers and self-healing behaviour for selector repair.</p>

  <!-- Self-Healing Section -->
  <div class="section">
    <h2>Self-Healing</h2>

    <div class="field">
      <div class="toggle-row">
        <label class="toggle">
          <input type="checkbox" id="selfHealingEnabled" />
          <span class="slider"></span>
        </label>
        <label for="selfHealingEnabled">Enable self-healing selector resolution</label>
      </div>
      <p class="hint">When enabled, failed locators are automatically repaired using multiple strategies.</p>
    </div>

    <div class="field">
      <label for="embeddingThreshold">Embedding similarity threshold</label>
      <div style="display:flex;align-items:center;gap:10px;">
        <input type="range" id="embeddingThreshold" min="0.5" max="1" step="0.01" />
        <span id="thresholdValue" style="min-width:40px;text-align:right;">0.85</span>
      </div>
      <p class="hint">Higher = stricter matching. Recommended 0.80–0.90.</p>
    </div>

    <div class="field">
      <div class="toggle-row">
        <label class="toggle">
          <input type="checkbox" id="llmEnabled" />
          <span class="slider"></span>
        </label>
        <label for="llmEnabled">Enable LLM-based repair (Tier 3)</label>
      </div>
      <p class="hint">Uses an LLM as a last resort when direct and embedding strategies fail. Requires an API key below (unless using Ollama).</p>
    </div>
  </div>

  <!-- LLM Provider Section -->
  <div class="section" id="llmSection">
    <h2>LLM Provider</h2>

    <div class="field">
      <label for="provider">Provider</label>
      <select id="provider">
        <option value="openai">OpenAI</option>
        <option value="anthropic">Anthropic</option>
        <option value="ollama">Ollama (local)</option>
      </select>
    </div>

    <div class="field">
      <label for="model">Model</label>
      <input type="text" id="model" placeholder="e.g. gpt-4o-mini" />
      <p class="hint" id="modelHint">Model name sent to the provider's API.</p>
    </div>

    <!-- API Key for OpenAI -->
    <div class="field" id="openaiKeyField">
      <label>OpenAI API Key</label>
      <div class="api-key-row">
        <input type="password" id="openaiKey" placeholder="sk-..." />
        <button class="btn btn-primary" id="saveOpenaiKey">Save</button>
        <button class="btn btn-danger" id="removeOpenaiKey">Remove</button>
      </div>
      <div class="key-status" id="openaiKeyStatus"></div>
    </div>

    <!-- API Key for Anthropic -->
    <div class="field" id="anthropicKeyField">
      <label>Anthropic API Key</label>
      <div class="api-key-row">
        <input type="password" id="anthropicKey" placeholder="sk-ant-..." />
        <button class="btn btn-primary" id="saveAnthropicKey">Save</button>
        <button class="btn btn-danger" id="removeAnthropicKey">Remove</button>
      </div>
      <div style="margin-top:6px;">
        <button class="btn btn-secondary" id="getAnthropicKey"
          title="Opens the Anthropic Console in your browser where you can create or copy an API key">
          Get API Key &rarr;
        </button>
      </div>
      <div class="key-status" id="anthropicKeyStatus"></div>
    </div>

    <!-- Ollama URL -->
    <div class="field" id="ollamaUrlField">
      <label for="ollamaUrl">Ollama Server URL</label>
      <input type="text" id="ollamaUrl" placeholder="http://localhost:11434" />
      <p class="hint">Local Ollama server. No API key required.</p>
    </div>

    <!-- Test Connection -->
    <div class="field">
      <button class="btn btn-secondary" id="testConnection">Test Connection</button>
      <div class="test-result hidden" id="testResult"></div>
    </div>
  </div>

  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();

    // Elements
    const selfHealingEnabled = document.getElementById('selfHealingEnabled');
    const embeddingThreshold = document.getElementById('embeddingThreshold');
    const thresholdValue = document.getElementById('thresholdValue');
    const llmEnabled = document.getElementById('llmEnabled');
    const provider = document.getElementById('provider');
    const model = document.getElementById('model');
    const ollamaUrl = document.getElementById('ollamaUrl');
    const openaiKey = document.getElementById('openaiKey');
    const anthropicKey = document.getElementById('anthropicKey');
    const testResult = document.getElementById('testResult');
    const llmSection = document.getElementById('llmSection');

    // Key status elements
    const openaiKeyStatus = document.getElementById('openaiKeyStatus');
    const anthropicKeyStatus = document.getElementById('anthropicKeyStatus');

    // Provider-specific field visibility
    const openaiKeyField = document.getElementById('openaiKeyField');
    const anthropicKeyField = document.getElementById('anthropicKeyField');
    const ollamaUrlField = document.getElementById('ollamaUrlField');

    function updateProviderVisibility() {
      const p = provider.value;
      openaiKeyField.style.display = p === 'openai' ? '' : 'none';
      anthropicKeyField.style.display = p === 'anthropic' ? '' : 'none';
      ollamaUrlField.style.display = p === 'ollama' ? '' : 'none';
    }

    function updateLlmSectionVisibility() {
      llmSection.style.opacity = llmEnabled.checked ? '1' : '0.5';
      llmSection.style.pointerEvents = llmEnabled.checked ? '' : 'none';
    }

    function updateKeyStatus(el, hasKey) {
      if (hasKey) {
        el.innerHTML = '<span class="dot green"></span> Key stored securely';
        el.className = 'key-status stored';
      } else {
        el.innerHTML = '<span class="dot red"></span> No key configured';
        el.className = 'key-status missing';
      }
    }

    // Settings change handlers
    selfHealingEnabled.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'selfHealing.enabled', value: selfHealingEnabled.checked } });
    });

    embeddingThreshold.addEventListener('input', () => {
      thresholdValue.textContent = Number(embeddingThreshold.value).toFixed(2);
    });
    embeddingThreshold.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'selfHealing.embeddingThreshold', value: Number(embeddingThreshold.value) } });
    });

    llmEnabled.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'selfHealing.llmEnabled', value: llmEnabled.checked } });
      updateLlmSectionVisibility();
    });

    provider.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'ai.provider', value: provider.value } });
      updateProviderVisibility();
      testResult.className = 'test-result hidden';
    });

    model.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'ai.model', value: model.value } });
    });

    ollamaUrl.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'ai.ollamaUrl', value: ollamaUrl.value } });
    });

    // API key save / remove
    document.getElementById('saveOpenaiKey').addEventListener('click', () => {
      const key = openaiKey.value.trim();
      if (!key) return;
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'openai', apiKey: key } });
      openaiKey.value = '';
    });
    document.getElementById('removeOpenaiKey').addEventListener('click', () => {
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'openai', apiKey: '' } });
    });

    document.getElementById('saveAnthropicKey').addEventListener('click', () => {
      const key = anthropicKey.value.trim();
      if (!key) return;
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'anthropic', apiKey: key } });
      anthropicKey.value = '';
    });
    document.getElementById('removeAnthropicKey').addEventListener('click', () => {
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'anthropic', apiKey: '' } });
    });

    // Get API Key — opens Anthropic Console in browser, then focuses the key input
    document.getElementById('getAnthropicKey').addEventListener('click', () => {
      vscode.postMessage({ type: 'openAnthropicConsole' });
      setTimeout(() => {
        const keyInput = document.getElementById('anthropicKey');
        keyInput.type = 'text';
        keyInput.placeholder = 'Paste your API key here...';
        keyInput.focus();
        keyInput.addEventListener('input', function handler() {
          keyInput.type = 'password';
          keyInput.placeholder = 'sk-ant-...';
          keyInput.removeEventListener('input', handler);
        }, { once: true });
      }, 300);
    });

    // Test connection
    document.getElementById('testConnection').addEventListener('click', () => {
      testResult.textContent = 'Testing...';
      testResult.className = 'test-result';
      vscode.postMessage({ type: 'testConnection', payload: { provider: provider.value } });
    });

    // Receive messages from the extension host
    window.addEventListener('message', (event) => {
      const msg = event.data;
      switch (msg.type) {
        case 'settingsLoaded': {
          const s = msg.payload;
          selfHealingEnabled.checked = s.selfHealingEnabled;
          embeddingThreshold.value = s.embeddingThreshold;
          thresholdValue.textContent = Number(s.embeddingThreshold).toFixed(2);
          llmEnabled.checked = s.llmEnabled;
          provider.value = s.provider;
          model.value = s.model;
          ollamaUrl.value = s.ollamaUrl;
          updateKeyStatus(openaiKeyStatus, s.hasOpenAIKey);
          updateKeyStatus(anthropicKeyStatus, s.hasAnthropicKey);
          updateProviderVisibility();
          updateLlmSectionVisibility();
          break;
        }
        case 'connectionTestResult': {
          const r = msg.payload;
          testResult.textContent = r.message;
          testResult.className = 'test-result ' + (r.ok ? 'ok' : 'fail');
          break;
        }
        case 'focusAnthropicKey': {
          const keyInput = document.getElementById('anthropicKey');
          keyInput.type = 'text';
          keyInput.placeholder = 'Paste your API key here...';
          keyInput.focus();
          keyInput.addEventListener('input', function handler() {
            keyInput.type = 'password';
            keyInput.placeholder = 'sk-ant-...';
            keyInput.removeEventListener('input', handler);
          }, { once: true });
          break;
        }
      }
    });

    // Request settings on load
    vscode.postMessage({ type: 'getSettings' });
  </script>
</body>
</html>`;
  }
}

function getNonce(): string {
  let text = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}
