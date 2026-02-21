import * as vscode from 'vscode';
import { Database } from '../storage/database';

export class MonitoringPanelManager {
  private panel: vscode.WebviewPanel | undefined;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly db: Database
  ) {}

  async show(): Promise<void> {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      'playwrightVcr.monitoring',
      'PlaywrightVCR — Monitoring',
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

    this.panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'getExecutions': {
          const executions = this.db.getRecentExecutions(50);
          this.panel?.webview.postMessage({
            type: 'executionsData',
            payload: executions,
          });
          break;
        }
        case 'getSchedules': {
          const schedules = this.db.getAllSchedules();
          this.panel?.webview.postMessage({
            type: 'schedulesData',
            payload: schedules,
          });
          break;
        }
        case 'addSchedule': {
          const { recordingId, cronExpression } = message.payload;
          this.db.createSchedule(recordingId, cronExpression);
          const schedules = this.db.getAllSchedules();
          this.panel?.webview.postMessage({
            type: 'schedulesData',
            payload: schedules,
          });
          break;
        }
        case 'toggleSchedule': {
          const { scheduleId, enabled } = message.payload;
          this.db.updateSchedule(scheduleId, { enabled });
          break;
        }
        case 'deleteSchedule': {
          this.db.deleteSchedule(message.payload.scheduleId);
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
  <title>PlaywrightVCR — Monitoring</title>
</head>
<body>
  <div id="root" data-panel="monitoring"></div>
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
