import * as vscode from 'vscode';
import { Player } from '../playwright/player';

export class PlaybackPanelManager {
  private panel: vscode.WebviewPanel | undefined;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly player: Player
  ) {}

  async show(recordingId?: string): Promise<void> {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
      if (recordingId) {
        this.panel.webview.postMessage({
          type: 'loadRecording',
          payload: { recordingId },
        });
      }
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      'playwrightRpa.playback',
      'Playwright RPA — Playback',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this.context.extensionUri, 'out', 'webview'),
        ],
      }
    );

    this.panel.webview.html = this.getHtml(this.panel.webview);

    if (recordingId) {
      // Wait for webview to be ready, then send recording ID
      setTimeout(() => {
        this.panel?.webview.postMessage({
          type: 'loadRecording',
          payload: { recordingId },
        });
      }, 500);
    }

    this.panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'startPlayback': {
          const { recordingId: id, options } = message.payload;
          try {
            await this.player.play(id, options, (stepResult) => {
              this.panel?.webview.postMessage({
                type: 'stepCompleted',
                payload: stepResult,
              });
            });
            this.panel?.webview.postMessage({ type: 'playbackCompleted' });
          } catch (err) {
            this.panel?.webview.postMessage({
              type: 'playbackError',
              payload: { error: (err as Error).message },
            });
          }
          break;
        }
        case 'stopPlayback': {
          await this.player.stop();
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
      vscode.Uri.joinPath(this.context.extensionUri, 'out', 'webview', 'webview.js')
    );
    const nonce = getNonce();

    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src ${webview.cspSource} 'unsafe-inline';">
  <title>Playwright RPA — Playback</title>
</head>
<body>
  <div id="root" data-panel="playback"></div>
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
