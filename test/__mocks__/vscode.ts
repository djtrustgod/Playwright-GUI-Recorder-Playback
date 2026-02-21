/**
 * Mock for the vscode module — provides stubs for VS Code APIs
 * used by extension code during unit testing.
 */

/** In-memory config store for tests */
const _configStore: Record<string, unknown> = {};

export const workspace = {
  getConfiguration: (_section?: string) => ({
    get: (key: string, defaultValue?: unknown) => {
      const fullKey = _section ? `${_section}.${key}` : key;
      return fullKey in _configStore ? _configStore[fullKey] : defaultValue;
    },
    update: async (key: string, value: unknown, _target?: number) => {
      const fullKey = _section ? `${_section}.${key}` : key;
      _configStore[fullKey] = value;
    },
  }),
  /** Helper: reset all stored config (call in afterEach) */
  _resetConfig: () => { Object.keys(_configStore).forEach(k => delete _configStore[k]); },
};

export const window = {
  showInformationMessage: () => Promise.resolve(undefined),
  showWarningMessage: () => Promise.resolve(undefined),
  showErrorMessage: () => Promise.resolve(undefined),
  showQuickPick: () => Promise.resolve(undefined),
  showInputBox: () => Promise.resolve(undefined),
  showSaveDialog: () => Promise.resolve(undefined),
  createTreeView: () => ({ dispose: () => {} }),
  createTerminal: () => ({ show: () => {}, sendText: () => {} }),
  createWebviewPanel: (_viewType: string, title: string, _column: number, _options?: unknown) => {
    const _messageHandlers: Function[] = [];
    const _postedMessages: unknown[] = [];
    return {
      title,
      webview: {
        html: '',
        onDidReceiveMessage: (handler: Function) => {
          _messageHandlers.push(handler);
          return { dispose: () => {} };
        },
        postMessage: async (msg: unknown) => { _postedMessages.push(msg); return true; },
        asWebviewUri: (uri: unknown) => uri,
        /** Test helper: simulate a message from the webview */
        _simulateMessage: (msg: unknown) => { _messageHandlers.forEach(h => h(msg)); },
        /** Test helper: read posted messages */
        _postedMessages,
      },
      reveal: () => {},
      onDidDispose: (_handler: Function) => ({ dispose: () => {} }),
      dispose: () => {},
    };
  },
};

export const commands = {
  registerCommand: () => ({ dispose: () => {} }),
};

export const env = {
  openExternal: async (_uri: unknown) => true,
};

export const Uri = {
  file: (path: string) => ({ fsPath: path, scheme: 'file' }),
  parse: (str: string) => ({ fsPath: str, scheme: 'file' }),
  joinPath: (...parts: unknown[]) => ({ fsPath: String(parts.join('/')), scheme: 'file' }),
};

export enum ViewColumn {
  One = 1,
  Two = 2,
  Three = 3,
}

export enum ConfigurationTarget {
  Global = 1,
  Workspace = 2,
  WorkspaceFolder = 3,
}

export class TreeItem {
  label: string;
  collapsibleState?: number;
  constructor(label: string, collapsibleState?: number) {
    this.label = label;
    this.collapsibleState = collapsibleState;
  }
}

export enum TreeItemCollapsibleState {
  None = 0,
  Collapsed = 1,
  Expanded = 2,
}

export class EventEmitter {
  private listeners: Function[] = [];
  event = (listener: Function) => {
    this.listeners.push(listener);
    return { dispose: () => {} };
  };
  fire(data?: unknown) {
    this.listeners.forEach(l => l(data));
  }
}

/** In-memory SecretStorage mock */
export function createMockSecretStorage(): {
  get: (key: string) => Promise<string | undefined>;
  store: (key: string, value: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
  _data: Map<string, string>;
} {
  const data = new Map<string, string>();
  return {
    get: async (key: string) => data.get(key),
    store: async (key: string, value: string) => { data.set(key, value); },
    delete: async (key: string) => { data.delete(key); },
    _data: data,
  };
}

/** Create a minimal ExtensionContext mock for testing */
export function createMockExtensionContext(overrides?: {
  secrets?: ReturnType<typeof createMockSecretStorage>;
  globalStoragePath?: string;
}): {
  secrets: ReturnType<typeof createMockSecretStorage>;
  globalStoragePath: string;
  extensionUri: { fsPath: string; scheme: string };
  extension: { packageJSON: Record<string, unknown> };
  subscriptions: { dispose: () => void }[];
} {
  return {
    secrets: overrides?.secrets ?? createMockSecretStorage(),
    globalStoragePath: overrides?.globalStoragePath ?? '/tmp/test-storage',
    extensionUri: { fsPath: '/tmp/test-ext', scheme: 'file' },
    extension: { packageJSON: { version: '0.0.0-test', description: 'Test description' } },
    subscriptions: [],
  };
}
