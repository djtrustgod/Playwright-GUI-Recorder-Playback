import * as vscode from 'vscode';
import { Database } from '../storage/database';

export class ExecutionsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(private readonly db: Database) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): vscode.TreeItem[] {
    const executions = this.db.getRecentExecutions(20);
    if (executions.length === 0) {
      return [new vscode.TreeItem('No executions yet.')];
    }

    return executions.map(exec => {
      const recording = this.db.getRecording(exec.recording_id);
      const statusIcon = exec.status === 'pass'
        ? 'pass'
        : exec.status === 'fail'
          ? 'error'
          : 'warning';

      const item = new vscode.TreeItem(
        recording?.name || exec.recording_id,
        vscode.TreeItemCollapsibleState.None
      );
      item.description = `${exec.status} · ${exec.trigger} · ${new Date(exec.started_at).toLocaleString()}`;
      item.iconPath = new vscode.ThemeIcon(`testing-${statusIcon}-icon`);
      item.tooltip = exec.error_message
        ? `Failed at step ${exec.failure_step}: ${exec.error_message}`
        : `Completed in ${exec.finished_at ? new Date(exec.finished_at).getTime() - new Date(exec.started_at).getTime() : '?'}ms`;
      return item;
    });
  }
}
