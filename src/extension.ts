import * as vscode from 'vscode';
import { RecordingLibraryProvider } from './views/sidebarProvider';
import { ExecutionsProvider } from './views/executionsProvider';
import { SchedulesProvider } from './views/schedulesProvider';
import { RecordingPanelManager } from './views/recordingPanel';
import { PlaybackPanelManager } from './views/playbackPanel';
import { MonitoringPanelManager } from './views/monitoringPanel';
import { Database } from './storage/database';
import { FileManager } from './storage/fileManager';
import { Recorder } from './playwright/recorder';
import { Player } from './playwright/player';
import { Exporter } from './playwright/exporter';
import { Scheduler } from './orchestration/scheduler';
import { JobQueue } from './orchestration/queue';
import { Executor } from './orchestration/executor';

let database: Database;
let fileManager: FileManager;
let recorder: Recorder;
let player: Player;
let scheduler: Scheduler;
let jobQueue: JobQueue;
let executor: Executor;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  console.log('Playwright RPA extension activating...');

  // Initialize storage
  database = new Database(context.globalStoragePath);
  await database.waitReady();
  fileManager = new FileManager(context.globalStoragePath);
  await fileManager.ensureDirectories();

  // Initialize Playwright services
  recorder = new Recorder(database, fileManager);
  player = new Player(database, fileManager, { secrets: context.secrets });
  const exporter = new Exporter(database, fileManager);

  // Initialize orchestration
  jobQueue = new JobQueue(database);
  executor = new Executor(jobQueue, player);
  scheduler = new Scheduler(database, jobQueue);

  // Initialize tree view providers
  const libraryProvider = new RecordingLibraryProvider(database);
  const executionsProvider = new ExecutionsProvider(database);
  const schedulesProvider = new SchedulesProvider(database);

  // Register tree views
  const libraryView = vscode.window.createTreeView('playwrightRpa.library', {
    treeDataProvider: libraryProvider,
    showCollapseAll: true,
  });
  const executionsView = vscode.window.createTreeView('playwrightRpa.executions', {
    treeDataProvider: executionsProvider,
  });
  const schedulesView = vscode.window.createTreeView('playwrightRpa.schedules', {
    treeDataProvider: schedulesProvider,
  });

  // Status bar item — visible only while recording
  const recordingStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  recordingStatusBar.text = '$(debug-stop) Stop Recording';
  recordingStatusBar.tooltip = 'Click to stop and save the current recording';
  recordingStatusBar.command = 'playwrightRpa.stopRecording';
  recordingStatusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
  context.subscriptions.push(recordingStatusBar);

  const showRecordingStatus = () => recordingStatusBar.show();
  const hideRecordingStatus = () => recordingStatusBar.hide();

  // Initialize webview panel managers
  const recordingPanelManager = new RecordingPanelManager(
    context,
    recorder,
    () => { libraryProvider.refresh(); hideRecordingStatus(); },
    () => { showRecordingStatus(); }
  );
  const playbackPanelManager = new PlaybackPanelManager(context, player);
  const monitoringPanelManager = new MonitoringPanelManager(context, database);

  // Register commands
  const commands: Array<[string, (...args: unknown[]) => unknown]> = [
    ['playwrightRpa.startRecording', async () => {
      await recordingPanelManager.show();
    }],
    ['playwrightRpa.stopRecording', async () => {
      await recorder.stop();
      libraryProvider.refresh();
      hideRecordingStatus();
    }],
    ['playwrightRpa.playRecording', async (...args: any[]) => {
      const item = args[0] as { recordingId?: string } | undefined;
      const recordingId = item?.recordingId;
      if (!recordingId) {
        vscode.window.showWarningMessage('No recording selected.');
        return;
      }
      await playbackPanelManager.show(recordingId);
    }],
    ['playwrightRpa.openRecordingPanel', async () => {
      await recordingPanelManager.show();
    }],
    ['playwrightRpa.openPlaybackPanel', async () => {
      await playbackPanelManager.show();
    }],
    ['playwrightRpa.openMonitoringPanel', async () => {
      await monitoringPanelManager.show();
    }],
    ['playwrightRpa.deleteRecording', async (...args: any[]) => {
      const item = args[0] as { recordingId?: string } | undefined;
      const recordingId = item?.recordingId;
      if (!recordingId) { return; }
      const confirm = await vscode.window.showWarningMessage(
        'Delete this recording and all its data?',
        { modal: true },
        'Delete'
      );
      if (confirm === 'Delete') {
        database.deleteRecording(recordingId);
        await fileManager.deleteRecordingFiles(recordingId);
        libraryProvider.refresh();
        vscode.window.showInformationMessage('Recording deleted.');
      }
    }],
    ['playwrightRpa.exportRecording', async (...args: any[]) => {
      const item = args[0] as { recordingId?: string } | undefined;
      const recordingId = item?.recordingId;
      if (!recordingId) { return; }
      const format = await vscode.window.showQuickPick(
        ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'JSON', 'HAR', 'GitHub Actions YAML'],
        { placeHolder: 'Select export format' }
      );
      if (format) {
        await exporter.export(recordingId, format);
      }
    }],
    ['playwrightRpa.refreshLibrary', () => {
      libraryProvider.refresh();
      executionsProvider.refresh();
      schedulesProvider.refresh();
    }],
    ['playwrightRpa.installBrowsers', async () => {
      const terminal = vscode.window.createTerminal('Playwright Install');
      terminal.show();
      terminal.sendText('npx playwright install');
    }],
    ['playwrightRpa.setApiKey', async () => {
      const provider = await vscode.window.showQuickPick(
        ['openai', 'anthropic'],
        { placeHolder: 'Select the AI provider to set the API key for' }
      );
      if (!provider) { return; }
      const apiKey = await vscode.window.showInputBox({
        prompt: `Enter your ${provider} API key`,
        password: true,
        placeHolder: 'sk-...',
      });
      if (apiKey === undefined) { return; }
      if (apiKey === '') {
        await context.secrets.delete(`playwrightRpa.apiKey.${provider}`);
        vscode.window.showInformationMessage(`${provider} API key removed.`);
      } else {
        await context.secrets.store(`playwrightRpa.apiKey.${provider}`, apiKey);
        vscode.window.showInformationMessage(`${provider} API key saved securely.`);
      }
    }],
  ];

  for (const [id, handler] of commands) {
    context.subscriptions.push(
      vscode.commands.registerCommand(id, handler)
    );
  }

  // Start orchestration
  scheduler.start();
  executor.start();

  // Register disposables
  context.subscriptions.push(
    libraryView,
    executionsView,
    schedulesView,
    { dispose: () => recorder.dispose() },
    { dispose: () => player.dispose() },
    { dispose: () => scheduler.stop() },
    { dispose: () => executor.stop() },
    { dispose: () => database.close() },
  );

  console.log('Playwright RPA extension activated.');
}

export function deactivate(): void {
  scheduler?.stop();
  executor?.stop();
  recorder?.dispose();
  player?.dispose();
  database?.close();
}
