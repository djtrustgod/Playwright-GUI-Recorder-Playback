import * as vscode from 'vscode';
import { Database, Job } from '../storage/database';

/**
 * Lightweight SQLite-backed job queue.
 * No Redis required — uses the same database as the rest of the extension.
 */
export class JobQueue {
  constructor(private readonly db: Database) {}

  /** Add a recording playback to the queue */
  enqueue(recordingId: string, maxAttempts?: number): string {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const retries = maxAttempts ?? config.get<number>('orchestration.maxRetries', 3);
    return this.db.createJob(recordingId, retries);
  }

  /** Get the next queued job (FIFO) */
  dequeue(): Job | null {
    return this.db.getNextQueuedJob();
  }

  /** Mark a job as running */
  markRunning(jobId: string): void {
    this.db.updateJob(jobId, {
      status: 'running',
      started_at: new Date().toISOString(),
      attempts: undefined, // Will be incremented by executor
    });
  }

  /** Mark a job as completed */
  markCompleted(jobId: string, result?: unknown): void {
    this.db.updateJob(jobId, {
      status: 'completed',
      finished_at: new Date().toISOString(),
      result_json: result ? JSON.stringify(result) : null,
    });
  }

  /** Mark a job as failed. Returns true if the job can be retried. */
  markFailed(jobId: string, error: string, currentAttempts: number, maxAttempts: number): boolean {
    if (currentAttempts < maxAttempts) {
      // Re-queue for retry
      this.db.updateJob(jobId, {
        status: 'queued',
        finished_at: null,
        result_json: JSON.stringify({ lastError: error }),
      });
      return true;
    }

    // Max retries exceeded
    this.db.updateJob(jobId, {
      status: 'failed',
      finished_at: new Date().toISOString(),
      result_json: JSON.stringify({ error }),
    });
    return false;
  }

  /** Get the number of currently running jobs */
  runningCount(): number {
    return this.db.getRunningJobCount();
  }
}
