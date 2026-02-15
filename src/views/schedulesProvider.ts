import * as vscode from 'vscode';
import { Database } from '../storage/database';

export class SchedulesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
    const schedules = this.db.getAllSchedules();
    if (schedules.length === 0) {
      return [new vscode.TreeItem('No schedules configured.')];
    }

    return schedules.map(sched => {
      const recording = this.db.getRecording(sched.recording_id);
      const item = new vscode.TreeItem(
        recording?.name || sched.recording_id,
        vscode.TreeItemCollapsibleState.None
      );
      item.description = `${sched.cron_expression} · ${sched.enabled ? 'Active' : 'Paused'}`;
      item.iconPath = new vscode.ThemeIcon(sched.enabled ? 'clock' : 'debug-pause');
      item.tooltip = `Next run: ${sched.next_run || 'N/A'}\nLast run: ${sched.last_run || 'Never'}`;
      return item;
    });
  }
}
