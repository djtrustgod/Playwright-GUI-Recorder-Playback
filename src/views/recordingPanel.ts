import * as vscode from 'vscode';
import { Recorder } from '../playwright/recorder';

export class RecordingPanelManager {
  private panel: vscode.WebviewPanel | undefined;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly recorder: Recorder,
    private readonly onRecordingSaved?: () => void,
    private readonly onRecordingStarted?: () => void
  ) {}

  async show(): Promise<void> {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      'playwrightRpa.recording',
      'Playwright RPA — Record',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this.context.extensionUri, 'out'),
        ],
      }
    );

    this.panel.webview.html = this.getHtml(this.panel.webview);

    // Handle messages from the webview
    this.panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'startRecording': {
          const { url, browser, saveAuth } = message.payload;
          await this.recorder.start(url, browser, saveAuth);
          this.onRecordingStarted?.();

          // Forward recording events to the webview
          this.recorder.onAction((action) => {
            this.panel?.webview.postMessage({
              type: 'recordedAction',
              payload: action,
            });
          });
          break;
        }
        case 'stopRecording': {
          const recording = await this.recorder.stop();
          this.panel?.webview.postMessage({
            type: 'recordingStopped',
            payload: recording,
          });
          this.onRecordingSaved?.();
          break;
        }
      }
    });

    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });
  }

  private getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'out', 'webview.js')
    );

    const nonce = getNonce();

    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src ${webview.cspSource} 'unsafe-inline';">
  <title>Playwright RPA — Record</title>
</head>
<body>
  <div id="root" data-panel="recording"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
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
