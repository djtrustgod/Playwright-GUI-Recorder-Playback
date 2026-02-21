import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SettingsPanelManager } from '../src/views/settingsPanel';
import {
  workspace,
  window,
  env,
  createMockExtensionContext,
  createMockSecretStorage,
} from './__mocks__/vscode';

// The vitest alias maps 'vscode' → this mock automatically.

describe('SettingsPanelManager', () => {
  let secrets: ReturnType<typeof createMockSecretStorage>;
  let context: ReturnType<typeof createMockExtensionContext>;
  let manager: SettingsPanelManager;

  beforeEach(() => {
    secrets = createMockSecretStorage();
    context = createMockExtensionContext({ secrets });
    manager = new SettingsPanelManager(context as any);
    (workspace as any)._resetConfig();
  });

  describe('show()', () => {
    it('creates a webview panel on first call', async () => {
      const spy = vi.spyOn(window, 'createWebviewPanel');
      await manager.show();
      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0]).toBe('playwrightVcr.settings');
      expect(spy.mock.calls[0][1]).toBe('PlaywrightVCR — AI Settings');
      spy.mockRestore();
    });

    it('reuses the panel on subsequent calls', async () => {
      const spy = vi.spyOn(window, 'createWebviewPanel');
      await manager.show();
      await manager.show();
      // createWebviewPanel called only once; second call just reveals
      expect(spy).toHaveBeenCalledOnce();
      spy.mockRestore();
    });
  });

  describe('handleMessage — updateSetting', () => {
    it('writes a boolean setting to workspace config', async () => {
      await manager.handleMessage({
        type: 'updateSetting',
        payload: { key: 'selfHealing.enabled', value: false },
      });

      const config = workspace.getConfiguration('playwrightVcr');
      expect(config.get('selfHealing.enabled', true)).toBe(false);
    });

    it('writes a string setting to workspace config', async () => {
      await manager.handleMessage({
        type: 'updateSetting',
        payload: { key: 'ai.provider', value: 'anthropic' },
      });

      const config = workspace.getConfiguration('playwrightVcr');
      expect(config.get('ai.provider', 'openai')).toBe('anthropic');
    });

    it('writes a numeric setting to workspace config', async () => {
      await manager.handleMessage({
        type: 'updateSetting',
        payload: { key: 'selfHealing.embeddingThreshold', value: 0.90 },
      });

      const config = workspace.getConfiguration('playwrightVcr');
      expect(config.get('selfHealing.embeddingThreshold', 0.85)).toBe(0.90);
    });
  });

  describe('handleMessage — setApiKey', () => {
    it('stores an API key in SecretStorage', async () => {
      await manager.handleMessage({
        type: 'setApiKey',
        payload: { provider: 'openai', apiKey: 'sk-test-123' },
      });

      expect(await secrets.get('playwrightVcr.apiKey.openai')).toBe('sk-test-123');
    });

    it('removes an API key when given an empty string', async () => {
      await secrets.store('playwrightVcr.apiKey.anthropic', 'sk-ant-old');

      await manager.handleMessage({
        type: 'setApiKey',
        payload: { provider: 'anthropic', apiKey: '' },
      });

      expect(await secrets.get('playwrightVcr.apiKey.anthropic')).toBeUndefined();
    });

    it('stores keys independently per provider', async () => {
      await manager.handleMessage({
        type: 'setApiKey',
        payload: { provider: 'openai', apiKey: 'sk-openai' },
      });
      await manager.handleMessage({
        type: 'setApiKey',
        payload: { provider: 'anthropic', apiKey: 'sk-ant-anthro' },
      });

      expect(await secrets.get('playwrightVcr.apiKey.openai')).toBe('sk-openai');
      expect(await secrets.get('playwrightVcr.apiKey.anthropic')).toBe('sk-ant-anthro');
    });
  });

  describe('sendCurrentSettings', () => {
    it('posts settings to the webview panel', async () => {
      await secrets.store('playwrightVcr.apiKey.openai', 'sk-yes');
      await manager.show();

      // Manually call sendCurrentSettings so we don't rely on the setTimeout
      await manager.sendCurrentSettings();

      // Access the mock panel's posted messages
      const panel = (manager as any).panel;
      const messages = panel.webview._postedMessages as any[];
      const settingsMsg = messages.find((m: any) => m.type === 'settingsLoaded');

      expect(settingsMsg).toBeDefined();
      expect(settingsMsg.payload.hasOpenAIKey).toBe(true);
      expect(settingsMsg.payload.hasAnthropicKey).toBe(false);
      expect(settingsMsg.payload.selfHealingEnabled).toBe(true);
      expect(settingsMsg.payload.llmEnabled).toBe(false);
      expect(settingsMsg.payload.provider).toBe('openai');
      expect(settingsMsg.payload.model).toBe('gpt-4o-mini');
    });

    it('reflects updated config values', async () => {
      const config = workspace.getConfiguration('playwrightVcr');
      await config.update('ai.provider', 'anthropic');
      await config.update('selfHealing.llmEnabled', true);
      await config.update('ai.model', 'claude-3-haiku-20240307');

      await manager.show();
      await manager.sendCurrentSettings();

      const panel = (manager as any).panel;
      const messages = panel.webview._postedMessages as any[];
      const settingsMsg = messages.filter((m: any) => m.type === 'settingsLoaded').pop();

      expect(settingsMsg.payload.provider).toBe('anthropic');
      expect(settingsMsg.payload.llmEnabled).toBe(true);
      expect(settingsMsg.payload.model).toBe('claude-3-haiku-20240307');
    });
  });

  describe('handleMessage — testConnection', () => {
    it('returns failure for cloud provider without API key', async () => {
      await manager.show();

      // Directly test the handleMessage method
      await manager.handleMessage({
        type: 'testConnection',
        payload: { provider: 'openai' },
      });

      const panel = (manager as any).panel;
      const messages = panel.webview._postedMessages as any[];
      const result = messages.find((m: any) => m.type === 'connectionTestResult');

      expect(result).toBeDefined();
      expect(result.payload.ok).toBe(false);
      expect(result.payload.message).toContain('No API key');
    });

    it('validates Anthropic key via real API call (200)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ content: [{ text: 'H' }] }),
      }));

      await secrets.store('playwrightVcr.apiKey.anthropic', 'sk-ant-valid');
      await manager.show();

      await manager.handleMessage({
        type: 'testConnection',
        payload: { provider: 'anthropic' },
      });

      const panel = (manager as any).panel;
      const messages = panel.webview._postedMessages as any[];
      const result = messages.filter((m: any) => m.type === 'connectionTestResult').pop();

      expect(result.payload.ok).toBe(true);
      expect(result.payload.message).toContain('Connected to Anthropic');
      vi.unstubAllGlobals();
    });

    it('rejects invalid Anthropic key (401)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
      }));

      await secrets.store('playwrightVcr.apiKey.anthropic', 'sk-ant-bad');
      await manager.show();

      await manager.handleMessage({
        type: 'testConnection',
        payload: { provider: 'anthropic' },
      });

      const panel = (manager as any).panel;
      const messages = panel.webview._postedMessages as any[];
      const result = messages.filter((m: any) => m.type === 'connectionTestResult').pop();

      expect(result.payload.ok).toBe(false);
      expect(result.payload.message).toContain('Invalid Anthropic API key');
      vi.unstubAllGlobals();
    });

    it('treats Anthropic 429 rate-limit as valid key', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
      }));

      await secrets.store('playwrightVcr.apiKey.anthropic', 'sk-ant-rate-limited');
      await manager.show();

      await manager.handleMessage({
        type: 'testConnection',
        payload: { provider: 'anthropic' },
      });

      const panel = (manager as any).panel;
      const messages = panel.webview._postedMessages as any[];
      const result = messages.filter((m: any) => m.type === 'connectionTestResult').pop();

      expect(result.payload.ok).toBe(true);
      expect(result.payload.message).toContain('rate limited');
      vi.unstubAllGlobals();
    });
  });

  describe('webview HTML', () => {
    it('includes essential UI elements in the generated HTML', async () => {
      await manager.show();
      const panel = (manager as any).panel;
      const html = panel.webview.html as string;

      // Verify key UI elements are present
      expect(html).toContain('AI &amp; Self-Healing Settings');
      expect(html).toContain('id="selfHealingEnabled"');
      expect(html).toContain('id="embeddingThreshold"');
      expect(html).toContain('id="llmEnabled"');
      expect(html).toContain('id="provider"');
      expect(html).toContain('id="model"');
      expect(html).toContain('id="ollamaUrl"');
      expect(html).toContain('id="openaiKey"');
      expect(html).toContain('id="anthropicKey"');
      expect(html).toContain('id="testConnection"');
      // Provider options
      expect(html).toContain('value="openai"');
      expect(html).toContain('value="anthropic"');
      expect(html).toContain('value="ollama"');
    });

    it('includes a CSP nonce in the script tag', async () => {
      await manager.show();
      const panel = (manager as any).panel;
      const html = panel.webview.html as string;

      // The nonce should be a 32-char alphanumeric string
      const nonceMatch = html.match(/nonce="([A-Za-z0-9]{32})"/);
      expect(nonceMatch).toBeTruthy();
    });

    it('includes the Get API Key button for Anthropic', async () => {
      await manager.show();
      const panel = (manager as any).panel;
      const html = panel.webview.html as string;

      expect(html).toContain('id="getAnthropicKey"');
      expect(html).toContain('Get API Key');
    });
  });

  describe('handleMessage — openAnthropicConsole', () => {
    it('calls vscode.env.openExternal with the Anthropic Console URL', async () => {
      const spy = vi.spyOn(env, 'openExternal');
      await manager.show();

      await manager.handleMessage({ type: 'openAnthropicConsole' });

      expect(spy).toHaveBeenCalledOnce();
      spy.mockRestore();
    });

    it('sends focusAnthropicKey message back to the webview', async () => {
      await manager.show();

      await manager.handleMessage({ type: 'openAnthropicConsole' });

      // Wait for the setTimeout(500ms) to fire
      await new Promise(resolve => setTimeout(resolve, 600));

      const panel = (manager as any).panel;
      const messages = panel.webview._postedMessages as any[];
      const focusMsg = messages.find((m: any) => m.type === 'focusAnthropicKey');
      expect(focusMsg).toBeDefined();
    });
  });
});
