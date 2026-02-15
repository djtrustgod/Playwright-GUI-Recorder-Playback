import * as vscode from 'vscode';
import { Database, Recording } from '../storage/database';

export class RecordingLibraryProvider implements vscode.TreeDataProvider<RecordingTreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<RecordingTreeItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(private readonly db: Database) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: RecordingTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: RecordingTreeItem): RecordingTreeItem[] {
    if (element) {
      // Show actions under a recording
      if (element.recordingId) {
        const actions = this.db.getActions(element.recordingId);
        return actions.map((action, i) => {
          const item = new RecordingTreeItem(
            `${i + 1}. ${action.action_type} — ${action.url || ''}`,
            vscode.TreeItemCollapsibleState.None
          );
          item.description = `${action.timestamp_ms}ms`;
          item.iconPath = new vscode.ThemeIcon('debug-step-over');
          return item;
        });
      }
      return [];
    }

    // Top level: list all recordings grouped by tags
    const recordings = this.db.getAllRecordings();
    if (recordings.length === 0) {
      return [new RecordingTreeItem('No recordings yet. Click + to start.', vscode.TreeItemCollapsibleState.None)];
    }

    return recordings.map(rec => {
      const item = new RecordingTreeItem(
        rec.name,
        vscode.TreeItemCollapsibleState.Collapsed
      );
      item.recordingId = rec.id;
      item.contextValue = 'recording';
      item.description = `${rec.action_count} actions · ${new Date(rec.created_at).toLocaleDateString()}`;
      item.tooltip = `URL: ${rec.url}\nTags: ${rec.tags || 'none'}\nDuration: ${rec.duration_ms}ms`;
      item.iconPath = new vscode.ThemeIcon('file-media');
      return item;
    });
  }
}

export class RecordingTreeItem extends vscode.TreeItem {
  recordingId?: string;
}
