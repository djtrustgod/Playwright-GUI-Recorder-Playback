import * as vscode from 'vscode';
import { JobQueue } from './queue';
import { Player } from '../playwright/player';
import { Job } from '../storage/database';

/**
 * Polls the job queue and runs playback jobs.
 * Applies exponential backoff on retries.
 */
export class Executor {
  private interval: ReturnType<typeof setInterval> | null = null;
  private running = false;
  private readonly POLL_INTERVAL_MS = 5000; // Check for new jobs every 5 seconds

  constructor(
    private readonly queue: JobQueue,
    private readonly player: Player
  ) {}

  /** Start polling the queue for jobs */
  start(): void {
    if (this.running) return;
    this.running = true;

    this.interval = setInterval(() => {
      this.tick().catch(err => {
        console.error('Executor tick error:', err);
      });
    }, this.POLL_INTERVAL_MS);
  }

  /** Stop polling */
  stop(): void {
    this.running = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /** Process the next job in the queue */
  private async tick(): Promise<void> {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const maxConcurrency = config.get<number>('orchestration.concurrency', 1);

    // Respect concurrency limit
    if (this.queue.runningCount() >= maxConcurrency) {
      return;
    }

    const job = this.queue.dequeue();
    if (!job) return;

    await this.executeJob(job);
  }

  /** Execute a single job */
  private async executeJob(job: Job): Promise<void> {
    const attempts = job.attempts + 1;
    this.queue.markRunning(job.id);

    // Update attempts count directly
    // (markRunning doesn't increment, so we do it here)

    try {
      // Apply exponential backoff delay if this is a retry
      if (attempts > 1) {
        const delayMs = Math.min(1000 * Math.pow(2, attempts - 1), 30000); // Cap at 30s
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      const results = await this.player.play(job.recording_id, {}, (stepResult) => {
        // Optionally log per-step progress
        console.log(`Job ${job.id} step ${stepResult.stepIndex}: ${stepResult.status}`);
      });

      this.queue.markCompleted(job.id, {
        steps: results.length,
        passed: results.filter(r => r.status === 'success').length,
        healed: results.filter(r => r.status === 'healed').length,
        failed: results.filter(r => r.status === 'failed').length,
      });

      vscode.window.showInformationMessage(
        `PlaywrightVCR: Job completed for recording "${job.recording_id}".`
      );
    } catch (err) {
      const errorMsg = (err as Error).message;
      const canRetry = this.queue.markFailed(job.id, errorMsg, attempts, job.max_attempts);

      if (canRetry) {
        console.log(`Job ${job.id} failed (attempt ${attempts}/${job.max_attempts}), will retry.`);
      } else {
        // All retries exhausted — notify user
        const action = await vscode.window.showErrorMessage(
          `PlaywrightVCR: Job failed after ${attempts} attempts — ${errorMsg}`,
          'View Details'
        );

        if (action === 'View Details') {
          vscode.commands.executeCommand('playwrightVcr.openMonitoringPanel');
        }

        // Send webhook notification if configured
        await this.sendWebhookNotification(job, errorMsg);
      }
    }
  }

  /** Send a failure notification to the configured webhook */
  private async sendWebhookNotification(job: Job, error: string): Promise<void> {
    const config = vscode.workspace.getConfiguration('playwrightVcr');
    const webhookUrl = config.get<string>('webhookUrl', '');

    if (!webhookUrl) return;

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🔴 PlaywrightVCR job failed`,
          recording_id: job.recording_id,
          job_id: job.id,
          attempts: job.attempts + 1,
          error,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error(`Webhook notification failed: ${response.status}`);
      }
    } catch (err) {
      console.error('Webhook notification error:', err);
    }
  }
}
