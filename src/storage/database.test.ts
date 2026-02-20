import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Database, Recording, ActionRecord } from './database';

describe('Database', () => {
  let db: Database;
  let tempDir: string;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rpa-test-'));
    db = new Database(tempDir);
    await db.waitReady();
  });

  afterEach(() => {
    db.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  // --- Recordings ---

  describe('recordings', () => {
    const makeRecording = (id = 'rec-1'): Recording => ({
      id,
      name: 'Test Recording',
      url: 'https://example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: 'test',
      description: 'A test recording',
      action_count: 0,
      duration_ms: 0,
      auth_state_path: null,
    });

    it('should create and retrieve a recording', () => {
      const recording = makeRecording();
      db.createRecording(recording);

      const result = db.getRecording('rec-1');
      expect(result).not.toBeNull();
      expect(result!.id).toBe('rec-1');
      expect(result!.name).toBe('Test Recording');
      expect(result!.url).toBe('https://example.com');
    });

    it('should return null for non-existent recording', () => {
      const result = db.getRecording('does-not-exist');
      expect(result).toBeNull();
    });

    it('should list all recordings', () => {
      db.createRecording(makeRecording('rec-1'));
      db.createRecording(makeRecording('rec-2'));

      const all = db.getAllRecordings();
      expect(all).toHaveLength(2);
    });

    it('should update a recording', () => {
      db.createRecording(makeRecording());
      db.updateRecording('rec-1', { name: 'Updated Name', action_count: 5 });

      const result = db.getRecording('rec-1');
      expect(result!.name).toBe('Updated Name');
      expect(result!.action_count).toBe(5);
    });

    it('should delete a recording and its related data', () => {
      db.createRecording(makeRecording());
      db.createAction({
        id: 'act-1',
        recording_id: 'rec-1',
        step_index: 0,
        action_type: 'click',
        url: 'https://example.com',
        locators: '{}',
        screenshot_path: null,
        timestamp_ms: 0,
      });

      db.deleteRecording('rec-1');

      expect(db.getRecording('rec-1')).toBeNull();
      expect(db.getActions('rec-1')).toHaveLength(0);
    });
  });

  // --- Actions ---

  describe('actions', () => {
    beforeEach(() => {
      db.createRecording({
        id: 'rec-1',
        name: 'Test',
        url: 'https://example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: '',
        description: '',
        action_count: 0,
        duration_ms: 0,
        auth_state_path: null,
      });
    });

    it('should create and retrieve actions in order', () => {
      db.createAction({
        id: 'act-2',
        recording_id: 'rec-1',
        step_index: 1,
        action_type: 'input',
        url: 'https://example.com',
        locators: '{"css":"#name"}',
        screenshot_path: null,
        timestamp_ms: 200,
      });
      db.createAction({
        id: 'act-1',
        recording_id: 'rec-1',
        step_index: 0,
        action_type: 'click',
        url: 'https://example.com',
        locators: '{"css":"#btn"}',
        screenshot_path: null,
        timestamp_ms: 100,
      });

      const actions = db.getActions('rec-1');
      expect(actions).toHaveLength(2);
      // Should be sorted by step_index
      expect(actions[0].step_index).toBe(0);
      expect(actions[1].step_index).toBe(1);
    });
  });

  // --- Executions ---

  describe('executions', () => {
    beforeEach(() => {
      db.createRecording({
        id: 'rec-1',
        name: 'Test',
        url: 'https://example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: '',
        description: '',
        action_count: 0,
        duration_ms: 0,
        auth_state_path: null,
      });
    });

    it('should create and retrieve executions', () => {
      const execId = db.createExecution({
        recording_id: 'rec-1',
        started_at: new Date().toISOString(),
        status: 'running',
        trigger: 'manual',
      });

      expect(execId).toBeTruthy();

      const recents = db.getRecentExecutions(10);
      expect(recents).toHaveLength(1);
      expect(recents[0].status).toBe('running');
    });

    it('should update execution status', () => {
      const execId = db.createExecution({
        recording_id: 'rec-1',
        started_at: new Date().toISOString(),
        status: 'running',
        trigger: 'manual',
      });

      db.updateExecution(execId, {
        status: 'pass',
        finished_at: new Date().toISOString(),
      });

      const recents = db.getRecentExecutions(10);
      expect(recents[0].status).toBe('pass');
      expect(recents[0].finished_at).toBeTruthy();
    });
  });

  // --- Healed Selectors ---

  describe('healed selectors', () => {
    beforeEach(() => {
      db.createRecording({
        id: 'rec-1',
        name: 'Test',
        url: 'https://example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: '',
        description: '',
        action_count: 0,
        duration_ms: 0,
        auth_state_path: null,
      });
    });

    it('should create and retrieve healed selectors', () => {
      db.createHealedSelector({
        recording_id: 'rec-1',
        step_index: 0,
        original_locator: '#old-btn',
        healed_locator: '#new-btn',
        strategy_used: 'css',
      });

      const healed = db.getHealedSelector('rec-1', 0);
      expect(healed).not.toBeNull();
      expect(healed!.original_locator).toBe('#old-btn');
      expect(healed!.healed_locator).toBe('#new-btn');
      expect(healed!.success_count).toBe(0);
    });

    it('should return null for non-existent healed selector', () => {
      expect(db.getHealedSelector('rec-1', 99)).toBeNull();
    });

    it('should increment success count', () => {
      db.createHealedSelector({
        recording_id: 'rec-1',
        step_index: 0,
        original_locator: '#old-btn',
        healed_locator: '#new-btn',
        strategy_used: 'css',
      });

      const healed = db.getHealedSelector('rec-1', 0)!;
      db.incrementHealedSelectorSuccess(healed.id);
      db.incrementHealedSelectorSuccess(healed.id);

      // Force flush so we can read back
      db.persistNow();

      const updated = db.getHealedSelector('rec-1', 0)!;
      expect(updated.success_count).toBe(2);
    });
  });

  // --- Schedules ---

  describe('schedules', () => {
    beforeEach(() => {
      db.createRecording({
        id: 'rec-1',
        name: 'Test',
        url: 'https://example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: '',
        description: '',
        action_count: 0,
        duration_ms: 0,
        auth_state_path: null,
      });
    });

    it('should create and list schedules', () => {
      const schedId = db.createSchedule('rec-1', '0 9 * * MON-FRI');
      expect(schedId).toBeTruthy();

      const all = db.getAllSchedules();
      expect(all).toHaveLength(1);
      expect(all[0].cron_expression).toBe('0 9 * * MON-FRI');
      expect(all[0].enabled).toBe(true);
    });

    it('should update schedule enabled state', () => {
      const schedId = db.createSchedule('rec-1', '0 9 * * *');
      db.updateSchedule(schedId, { enabled: false });

      const enabled = db.getEnabledSchedules();
      expect(enabled).toHaveLength(0);

      const all = db.getAllSchedules();
      expect(all).toHaveLength(1);
      expect(all[0].enabled).toBe(false);
    });

    it('should delete a schedule', () => {
      const schedId = db.createSchedule('rec-1', '0 9 * * *');
      db.deleteSchedule(schedId);

      expect(db.getAllSchedules()).toHaveLength(0);
    });
  });

  // --- Jobs ---

  describe('jobs', () => {
    beforeEach(() => {
      db.createRecording({
        id: 'rec-1',
        name: 'Test',
        url: 'https://example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: '',
        description: '',
        action_count: 0,
        duration_ms: 0,
        auth_state_path: null,
      });
    });

    it('should create a queued job', () => {
      const jobId = db.createJob('rec-1', 3);
      expect(jobId).toBeTruthy();

      const next = db.getNextQueuedJob();
      expect(next).not.toBeNull();
      expect(next!.recording_id).toBe('rec-1');
      expect(next!.status).toBe('queued');
      expect(next!.max_attempts).toBe(3);
    });

    it('should return null when no queued jobs', () => {
      expect(db.getNextQueuedJob()).toBeNull();
    });

    it('should update job status', () => {
      const jobId = db.createJob('rec-1');
      db.updateJob(jobId, { status: 'running', started_at: new Date().toISOString() });

      expect(db.getNextQueuedJob()).toBeNull();
      expect(db.getRunningJobCount()).toBe(1);
    });

    it('should dequeue jobs in FIFO order', () => {
      db.createJob('rec-1');
      // Small delay to ensure different created_at timestamps
      db.createJob('rec-1');

      const first = db.getNextQueuedJob()!;
      db.updateJob(first.id, { status: 'running' });

      const second = db.getNextQueuedJob()!;
      expect(second.id).not.toBe(first.id);
    });
  });

  // --- Persistence ---

  describe('persistence', () => {
    it('should persist data across close and reopen', async () => {
      db.createRecording({
        id: 'rec-persist',
        name: 'Persistence Test',
        url: 'https://example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: '',
        description: '',
        action_count: 0,
        duration_ms: 0,
        auth_state_path: null,
      });
      db.persistNow();
      db.close();

      // Reopen with the same storage path
      const db2 = new Database(tempDir);
      await db2.waitReady();

      const recording = db2.getRecording('rec-persist');
      expect(recording).not.toBeNull();
      expect(recording!.name).toBe('Persistence Test');

      db2.close();
      // Reassign so afterEach cleanup doesn't double-close
      db = new Database(tempDir);
      await db.waitReady();
    });
  });
});
