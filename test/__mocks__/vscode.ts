/**
 * Mock for the vscode module — provides stubs for VS Code APIs
 * used by extension code during unit testing.
 */

export const workspace = {
  getConfiguration: () => ({
    get: (key: string, defaultValue?: unknown) => defaultValue,
  }),
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
};

export const commands = {
  registerCommand: () => ({ dispose: () => {} }),
};

export const Uri = {
  file: (path: string) => ({ fsPath: path, scheme: 'file' }),
  parse: (str: string) => ({ fsPath: str, scheme: 'file' }),
};

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
