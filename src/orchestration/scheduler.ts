import * as cron from 'node-cron';
import { Database, Schedule } from '../storage/database';
import { JobQueue } from './queue';

/**
 * Evaluates cron expressions from the schedules table and enqueues
 * playback jobs when they match.
 */
export class Scheduler {
  private tasks: Map<string, cron.ScheduledTask> = new Map();
  private running = false;

  constructor(
    private readonly db: Database,
    private readonly queue: JobQueue
  ) {}

  /** Start all enabled schedules */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.loadSchedules();
  }

  /** Stop all cron tasks */
  stop(): void {
    this.running = false;
    for (const [id, task] of this.tasks) {
      task.stop();
    }
    this.tasks.clear();
  }

  /** Reload schedules from the database (call after add/update/delete) */
  reload(): void {
    this.stop();
    this.running = true;
    this.loadSchedules();
  }

  private loadSchedules(): void {
    const schedules = this.db.getEnabledSchedules();

    for (const schedule of schedules) {
      if (!cron.validate(schedule.cron_expression)) {
        console.warn(`Invalid cron expression for schedule ${schedule.id}: ${schedule.cron_expression}`);
        continue;
      }

      const task = cron.schedule(schedule.cron_expression, () => {
        this.onScheduleTrigger(schedule);
      });

      this.tasks.set(schedule.id, task);
    }
  }

  private onScheduleTrigger(schedule: Schedule): void {
    console.log(`Schedule ${schedule.id} triggered for recording ${schedule.recording_id}`);

    // Enqueue a playback job
    this.queue.enqueue(schedule.recording_id);

    // Update last_run timestamp
    this.db.updateSchedule(schedule.id, {
      last_run: new Date().toISOString(),
    });
  }
}
