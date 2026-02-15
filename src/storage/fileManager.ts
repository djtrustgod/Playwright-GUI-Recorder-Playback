import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import * as path from 'path';

export class FileManager {
  private readonly recordingsDir: string;
  private readonly modelsDir: string;

  constructor(private readonly storagePath: string) {
    this.recordingsDir = path.join(storagePath, 'recordings');
    this.modelsDir = path.join(storagePath, 'models');
  }

  /** Create required directories if they don't exist */
  async ensureDirectories(): Promise<void> {
    await fs.mkdir(this.recordingsDir, { recursive: true });
    await fs.mkdir(this.modelsDir, { recursive: true });
  }

  /** Get the base directory for a recording's files */
  getRecordingDir(recordingId: string): string {
    return path.join(this.recordingsDir, recordingId);
  }

  /** Ensure a recording's directory exists */
  private async ensureRecordingDir(recordingId: string): Promise<string> {
    const dir = this.getRecordingDir(recordingId);
    await fs.mkdir(dir, { recursive: true });
    return dir;
  }

  /** Get the path where a recording's trace ZIP should be stored */
  getTracePath(recordingId: string): string {
    return path.join(this.getRecordingDir(recordingId), 'trace.zip');
  }

  /** Get the path for a playback's trace ZIP */
  getPlaybackTracePath(recordingId: string, executionId: string): string {
    return path.join(this.getRecordingDir(recordingId), `playback-${executionId}.zip`);
  }

  /** Get the path for a step's screenshot */
  getStepScreenshotPath(recordingId: string, stepIndex: number): string {
    return path.join(this.getRecordingDir(recordingId), `step-${stepIndex}.png`);
  }

  /** Save authentication state to disk */
  async saveAuthState(recordingId: string, storageState: unknown): Promise<string> {
    const dir = await this.ensureRecordingDir(recordingId);
    const filePath = path.join(dir, 'auth-state.json');
    await fs.writeFile(filePath, JSON.stringify(storageState, null, 2), 'utf-8');
    return filePath;
  }

  /** Load authentication state from disk */
  async loadAuthState(recordingId: string): Promise<unknown | null> {
    const filePath = path.join(this.getRecordingDir(recordingId), 'auth-state.json');
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  /** Save the raw actions JSON for a recording */
  async saveActionsJson(recordingId: string, actions: unknown[]): Promise<void> {
    const dir = await this.ensureRecordingDir(recordingId);
    const filePath = path.join(dir, 'actions.json');
    await fs.writeFile(filePath, JSON.stringify(actions, null, 2), 'utf-8');
  }

  /** Load the raw actions JSON for a recording */
  async loadActionsJson(recordingId: string): Promise<unknown[] | null> {
    const filePath = path.join(this.getRecordingDir(recordingId), 'actions.json');
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  /** Delete all files for a recording */
  async deleteRecordingFiles(recordingId: string): Promise<void> {
    const dir = this.getRecordingDir(recordingId);
    try {
      await fs.rm(dir, { recursive: true, force: true });
    } catch {
      // Directory might not exist
    }
  }

  /** Get the models directory for embedding model storage */
  getModelsDir(): string {
    return this.modelsDir;
  }

  /** Check if a file exists */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /** List all screenshot files for a recording */
  async getScreenshots(recordingId: string): Promise<string[]> {
    const dir = this.getRecordingDir(recordingId);
    try {
      const files = await fs.readdir(dir);
      return files
        .filter(f => f.startsWith('step-') && f.endsWith('.png'))
        .sort((a, b) => {
          const aNum = parseInt(a.replace('step-', '').replace('.png', ''));
          const bNum = parseInt(b.replace('step-', '').replace('.png', ''));
          return aNum - bNum;
        })
        .map(f => path.join(dir, f));
    } catch {
      return [];
    }
  }
}
