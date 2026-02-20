import initSqlJs, { type Database as SqlJsDatabase } from 'sql.js';
import * as path from 'path';
import * as fs from 'fs';

// --- Data types ---

export interface Recording {
  id: string;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
  tags: string;
  description: string;
  action_count: number;
  duration_ms: number;
  auth_state_path: string | null;
}

export interface ActionRecord {
  id: string;
  recording_id: string;
  step_index: number;
  action_type: string;
  url: string;
  locators: string; // JSON-serialized LocatorStrategies
  screenshot_path: string | null;
  timestamp_ms: number;
}

export interface Execution {
  id: string;
  recording_id: string;
  started_at: string;
  finished_at: string | null;
  status: 'running' | 'pass' | 'fail' | 'partial';
  trigger: 'manual' | 'scheduled';
  failure_step: number | null;
  error_message: string | null;
}

export interface HealedSelector {
  id: string;
  recording_id: string;
  step_index: number;
  original_locator: string;
  healed_locator: string;
  strategy_used: string;
  healed_at: string;
  success_count: number;
}

export interface Schedule {
  id: string;
  recording_id: string;
  cron_expression: string;
  enabled: boolean;
  last_run: string | null;
  next_run: string | null;
}

export interface Job {
  id: string;
  recording_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  attempts: number;
  max_attempts: number;
  result_json: string | null;
}

// --- Helpers ---

/** Convert a row from sql.js columns/values to a plain object */
function rowToObject<T>(columns: string[], values: (string | number | Uint8Array | null)[]): T {
  const obj: Record<string, unknown> = {};
  for (let i = 0; i < columns.length; i++) {
    obj[columns[i]] = values[i];
  }
  return obj as T;
}

/** Run a SELECT and return all rows as typed objects */
function queryAll<T>(db: SqlJsDatabase, sql: string, params?: unknown[]): T[] {
  const stmt = db.prepare(sql);
  if (params) stmt.bind(params);
  const results: T[] = [];
  while (stmt.step()) {
    results.push(rowToObject<T>(stmt.getColumnNames(), stmt.get()));
  }
  stmt.free();
  return results;
}

/** Run a SELECT and return the first row */
function queryOne<T>(db: SqlJsDatabase, sql: string, params?: unknown[]): T | null {
  const rows = queryAll<T>(db, sql, params);
  return rows.length > 0 ? rows[0] : null;
}

// --- Database ---

export class Database {
  private db!: SqlJsDatabase;
  private dbPath: string;
  private ready: Promise<void>;
  private persistTimer: ReturnType<typeof setTimeout> | null = null;
  private dirty = false;

  /** Debounce interval for batching rapid writes (ms) */
  private static readonly PERSIST_DEBOUNCE_MS = 500;

  constructor(storagePath: string) {
    // Ensure the storage directory exists
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }

    this.dbPath = path.join(storagePath, 'playwright-rpa.db');
    this.ready = this.initialize();
  }

  private async initialize(): Promise<void> {
    const SQL = await initSqlJs();

    if (fs.existsSync(this.dbPath)) {
      const buffer = fs.readFileSync(this.dbPath);
      this.db = new SQL.Database(buffer);
    } else {
      this.db = new SQL.Database();
    }

    this.createTables();
    this.persistNow();
  }

  /** Wait for async init to complete — call before first DB access */
  async waitReady(): Promise<void> {
    await this.ready;
  }

  /** Flush the database to disk immediately */
  persistNow(): void {
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
      this.persistTimer = null;
    }
    const data = this.db.export();
    fs.writeFileSync(this.dbPath, Buffer.from(data));
    this.dirty = false;
  }

  /**
   * Schedule a debounced persist. Rapid calls within PERSIST_DEBOUNCE_MS
   * are batched into a single disk write. Use persistNow() for critical writes.
   */
  private persist(): void {
    this.dirty = true;
    if (this.persistTimer) return;
    this.persistTimer = setTimeout(() => {
      this.persistTimer = null;
      if (this.dirty) {
        this.persistNow();
      }
    }, Database.PERSIST_DEBOUNCE_MS);
  }

  private createTables(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS recordings (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        tags TEXT DEFAULT '',
        description TEXT DEFAULT '',
        action_count INTEGER DEFAULT 0,
        duration_ms INTEGER DEFAULT 0,
        auth_state_path TEXT
      );

      CREATE TABLE IF NOT EXISTS actions (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        step_index INTEGER NOT NULL,
        action_type TEXT NOT NULL,
        url TEXT DEFAULT '',
        locators TEXT NOT NULL DEFAULT '{}',
        screenshot_path TEXT,
        timestamp_ms INTEGER DEFAULT 0,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS executions (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        started_at TEXT NOT NULL,
        finished_at TEXT,
        status TEXT NOT NULL DEFAULT 'running',
        trigger_type TEXT NOT NULL DEFAULT 'manual',
        failure_step INTEGER,
        error_message TEXT,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS healed_selectors (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        step_index INTEGER NOT NULL,
        original_locator TEXT NOT NULL,
        healed_locator TEXT NOT NULL,
        strategy_used TEXT NOT NULL,
        healed_at TEXT NOT NULL,
        success_count INTEGER DEFAULT 0,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS schedules (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        cron_expression TEXT NOT NULL,
        enabled INTEGER DEFAULT 1,
        last_run TEXT,
        next_run TEXT,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'queued',
        created_at TEXT NOT NULL,
        started_at TEXT,
        finished_at TEXT,
        attempts INTEGER DEFAULT 0,
        max_attempts INTEGER DEFAULT 3,
        result_json TEXT,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_actions_recording ON actions(recording_id, step_index);
      CREATE INDEX IF NOT EXISTS idx_executions_recording ON executions(recording_id, started_at);
      CREATE INDEX IF NOT EXISTS idx_healed_recording_step ON healed_selectors(recording_id, step_index);
      CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status, created_at);
      CREATE INDEX IF NOT EXISTS idx_schedules_enabled ON schedules(enabled);
    `);
  }

  // --- Recordings ---

  createRecording(recording: Recording): void {
    this.db.run(
      `INSERT INTO recordings (id, name, url, created_at, updated_at, tags, description, action_count, duration_ms, auth_state_path)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [recording.id, recording.name, recording.url, recording.created_at, recording.updated_at,
       recording.tags, recording.description, recording.action_count, recording.duration_ms, recording.auth_state_path]
    );
    this.persist();
  }

  getRecording(id: string): Recording | null {
    return queryOne<Recording>(this.db, 'SELECT * FROM recordings WHERE id = ?', [id]);
  }

  getAllRecordings(): Recording[] {
    return queryAll<Recording>(this.db, 'SELECT * FROM recordings ORDER BY created_at DESC');
  }

  updateRecording(id: string, updates: Partial<Recording>): void {
    const keys = Object.keys(updates).filter(k => k !== 'id');
    if (keys.length === 0) return;

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => (updates as Record<string, unknown>)[k]);

    this.db.run(`UPDATE recordings SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }

  deleteRecording(id: string): void {
    this.db.run('DELETE FROM actions WHERE recording_id = ?', [id]);
    this.db.run('DELETE FROM executions WHERE recording_id = ?', [id]);
    this.db.run('DELETE FROM healed_selectors WHERE recording_id = ?', [id]);
    this.db.run('DELETE FROM schedules WHERE recording_id = ?', [id]);
    this.db.run('DELETE FROM jobs WHERE recording_id = ?', [id]);
    this.db.run('DELETE FROM recordings WHERE id = ?', [id]);
    this.persist();
  }

  // --- Actions ---

  createAction(action: ActionRecord): void {
    this.db.run(
      `INSERT INTO actions (id, recording_id, step_index, action_type, url, locators, screenshot_path, timestamp_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [action.id, action.recording_id, action.step_index, action.action_type,
       action.url, action.locators, action.screenshot_path, action.timestamp_ms]
    );
    this.persist();
  }

  getActions(recordingId: string): ActionRecord[] {
    return queryAll<ActionRecord>(this.db, 'SELECT * FROM actions WHERE recording_id = ? ORDER BY step_index', [recordingId]);
  }

  // --- Executions ---

  createExecution(execution: Omit<Execution, 'id' | 'finished_at' | 'failure_step' | 'error_message'>): string {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO executions (id, recording_id, started_at, status, trigger_type)
       VALUES (?, ?, ?, ?, ?)`,
      [id, execution.recording_id, execution.started_at, execution.status, execution.trigger]
    );
    this.persist();
    return id;
  }

  updateExecution(id: string, updates: Partial<Execution>): void {
    const keys = Object.keys(updates).filter(k => k !== 'id');
    if (keys.length === 0) return;

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => (updates as Record<string, unknown>)[k]);

    this.db.run(`UPDATE executions SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }

  getRecentExecutions(limit: number): Execution[] {
    return queryAll<Execution>(this.db, 'SELECT * FROM executions ORDER BY started_at DESC LIMIT ?', [limit]);
  }

  // --- Healed Selectors ---

  getHealedSelector(recordingId: string, stepIndex: number): HealedSelector | null {
    return queryOne<HealedSelector>(
      this.db,
      'SELECT * FROM healed_selectors WHERE recording_id = ? AND step_index = ? ORDER BY success_count DESC LIMIT 1',
      [recordingId, stepIndex]
    );
  }

  createHealedSelector(data: Omit<HealedSelector, 'id' | 'healed_at' | 'success_count'>): void {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO healed_selectors (id, recording_id, step_index, original_locator, healed_locator, strategy_used, healed_at, success_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      [id, data.recording_id, data.step_index, data.original_locator, data.healed_locator, data.strategy_used, new Date().toISOString()]
    );
    this.persist();
  }

  incrementHealedSelectorSuccess(id: string): void {
    this.db.run('UPDATE healed_selectors SET success_count = success_count + 1 WHERE id = ?', [id]);
    this.persist();
  }

  // --- Schedules ---

  getAllSchedules(): Schedule[] {
    return queryAll<Schedule>(this.db, 'SELECT * FROM schedules ORDER BY recording_id').map(row => ({
      ...row,
      enabled: !!(row as any).enabled,
    }));
  }

  getEnabledSchedules(): Schedule[] {
    return queryAll<Schedule>(this.db, 'SELECT * FROM schedules WHERE enabled = 1').map(row => ({
      ...row,
      enabled: true,
    }));
  }

  createSchedule(recordingId: string, cronExpression: string): string {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO schedules (id, recording_id, cron_expression, enabled) VALUES (?, ?, ?, 1)`,
      [id, recordingId, cronExpression]
    );
    this.persist();
    return id;
  }

  updateSchedule(id: string, updates: Partial<Schedule>): void {
    const keys = Object.keys(updates).filter(k => k !== 'id');
    if (keys.length === 0) return;

    const setClause = keys.map(k => {
      if (k === 'enabled') return 'enabled = ?';
      return `${k} = ?`;
    }).join(', ');

    const values = keys.map(k => {
      if (k === 'enabled') return (updates as any).enabled ? 1 : 0;
      return (updates as Record<string, unknown>)[k];
    });

    this.db.run(`UPDATE schedules SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }

  deleteSchedule(id: string): void {
    this.db.run('DELETE FROM schedules WHERE id = ?', [id]);
    this.persist();
  }

  // --- Jobs ---

  createJob(recordingId: string, maxAttempts = 3): string {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO jobs (id, recording_id, status, created_at, attempts, max_attempts) VALUES (?, ?, 'queued', ?, 0, ?)`,
      [id, recordingId, new Date().toISOString(), maxAttempts]
    );
    this.persist();
    return id;
  }

  getNextQueuedJob(): Job | null {
    return queryOne<Job>(this.db, "SELECT * FROM jobs WHERE status = 'queued' ORDER BY created_at ASC LIMIT 1");
  }

  updateJob(id: string, updates: Partial<Job>): void {
    const keys = Object.keys(updates).filter(k => k !== 'id');
    if (keys.length === 0) return;

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => (updates as Record<string, unknown>)[k]);

    this.db.run(`UPDATE jobs SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }

  getRunningJobCount(): number {
    const row = queryOne<{ 'COUNT(*)': number }>(this.db, "SELECT COUNT(*) FROM jobs WHERE status = 'running'");
    return row ? row['COUNT(*)'] : 0;
  }

  // --- Lifecycle ---

  close(): void {
    this.persistNow();
    this.db.close();
  }
}
