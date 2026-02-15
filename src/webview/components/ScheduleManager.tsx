import React, { useState, useEffect, useCallback } from 'react';
import { vscode } from '../App';

interface Execution {
  id: string;
  recording_id: string;
  started_at: string;
  finished_at: string | null;
  status: string;
  trigger: string;
  failure_step: number | null;
  error_message: string | null;
}

interface Schedule {
  id: string;
  recording_id: string;
  cron_expression: string;
  enabled: boolean;
  last_run: string | null;
  next_run: string | null;
}

export const ScheduleManager: React.FC = () => {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [activeTab, setActiveTab] = useState<'executions' | 'schedules'>('executions');
  const [newCron, setNewCron] = useState('');
  const [newRecordingId, setNewRecordingId] = useState('');

  const handleMessage = useCallback((event: MessageEvent) => {
    const message = event.data;
    switch (message.type) {
      case 'executionsData':
        setExecutions(message.payload);
        break;
      case 'schedulesData':
        setSchedules(message.payload);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    // Request initial data
    vscode.postMessage({ type: 'getExecutions' });
    vscode.postMessage({ type: 'getSchedules' });

    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const addSchedule = () => {
    if (!newRecordingId || !newCron) return;
    vscode.postMessage({
      type: 'addSchedule',
      payload: { recordingId: newRecordingId, cronExpression: newCron },
    });
    setNewCron('');
    setNewRecordingId('');
  };

  const toggleSchedule = (id: string, enabled: boolean) => {
    vscode.postMessage({
      type: 'toggleSchedule',
      payload: { scheduleId: id, enabled: !enabled },
    });
  };

  const deleteSchedule = (id: string) => {
    vscode.postMessage({
      type: 'deleteSchedule',
      payload: { scheduleId: id },
    });
  };

  const statusColor = (status: string): string => {
    switch (status) {
      case 'pass': return 'var(--vscode-testing-iconPassed)';
      case 'fail': return 'var(--vscode-errorForeground)';
      case 'running': return 'var(--vscode-progressBar-background)';
      default: return 'var(--vscode-descriptionForeground)';
    }
  };

  const tabStyle = (active: boolean) => ({
    padding: '8px 16px',
    background: active ? 'var(--vscode-tab-activeBackground)' : 'transparent',
    color: active ? 'var(--vscode-tab-activeForeground)' : 'var(--vscode-tab-inactiveForeground)',
    border: 'none',
    borderBottom: active ? '2px solid var(--vscode-focusBorder)' : '2px solid transparent',
    cursor: 'pointer' as const,
    fontSize: '13px',
  });

  return (
    <div style={{ padding: '16px', fontFamily: 'var(--vscode-font-family)', color: 'var(--vscode-foreground)' }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '16px' }}>Monitoring & Scheduling</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--vscode-panel-border)', marginBottom: '16px' }}>
        <button style={tabStyle(activeTab === 'executions')} onClick={() => setActiveTab('executions')}>
          Execution History
        </button>
        <button style={tabStyle(activeTab === 'schedules')} onClick={() => setActiveTab('schedules')}>
          Schedules
        </button>
      </div>

      {/* Execution History */}
      {activeTab === 'executions' && (
        <div>
          {executions.length === 0 ? (
            <p style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '13px' }}>
              No executions yet.
            </p>
          ) : (
            <div style={{ border: '1px solid var(--vscode-panel-border)', borderRadius: '2px' }}>
              {executions.map(exec => (
                <div
                  key={exec.id}
                  style={{
                    padding: '8px 10px',
                    borderBottom: '1px solid var(--vscode-panel-border)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: statusColor(exec.status), flexShrink: 0,
                  }} />
                  <span style={{ flex: 1 }}>{exec.recording_id.substring(0, 8)}...</span>
                  <span style={{ color: 'var(--vscode-descriptionForeground)' }}>{exec.trigger}</span>
                  <span style={{ color: 'var(--vscode-descriptionForeground)' }}>{exec.status}</span>
                  <span style={{ color: 'var(--vscode-descriptionForeground)', minWidth: '130px', textAlign: 'right' }}>
                    {new Date(exec.started_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Schedules */}
      {activeTab === 'schedules' && (
        <div>
          {/* Add schedule form */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={newRecordingId}
              onChange={e => setNewRecordingId(e.target.value)}
              placeholder="Recording ID"
              style={{
                flex: 1,
                padding: '6px 8px',
                background: 'var(--vscode-input-background)',
                color: 'var(--vscode-input-foreground)',
                border: '1px solid var(--vscode-input-border)',
                borderRadius: '2px',
                fontSize: '12px',
                minWidth: '150px',
              }}
            />
            <input
              type="text"
              value={newCron}
              onChange={e => setNewCron(e.target.value)}
              placeholder="Cron expression (e.g. 0 9 * * MON-FRI)"
              style={{
                flex: 1,
                padding: '6px 8px',
                background: 'var(--vscode-input-background)',
                color: 'var(--vscode-input-foreground)',
                border: '1px solid var(--vscode-input-border)',
                borderRadius: '2px',
                fontSize: '12px',
                minWidth: '200px',
              }}
            />
            <button
              onClick={addSchedule}
              style={{
                padding: '6px 12px',
                background: 'var(--vscode-button-background)',
                color: 'var(--vscode-button-foreground)',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              + Add
            </button>
          </div>

          {schedules.length === 0 ? (
            <p style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '13px' }}>
              No schedules configured.
            </p>
          ) : (
            <div style={{ border: '1px solid var(--vscode-panel-border)', borderRadius: '2px' }}>
              {schedules.map(sched => (
                <div
                  key={sched.id}
                  style={{
                    padding: '8px 10px',
                    borderBottom: '1px solid var(--vscode-panel-border)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: sched.enabled ? 'var(--vscode-testing-iconPassed)' : 'var(--vscode-descriptionForeground)',
                    flexShrink: 0,
                  }} />
                  <span style={{ flex: 1, fontFamily: 'var(--vscode-editor-font-family)' }}>
                    {sched.cron_expression}
                  </span>
                  <span style={{ color: 'var(--vscode-descriptionForeground)' }}>
                    {sched.recording_id.substring(0, 8)}...
                  </span>
                  <button
                    onClick={() => toggleSchedule(sched.id, sched.enabled)}
                    style={{
                      padding: '2px 8px',
                      background: 'transparent',
                      color: 'var(--vscode-foreground)',
                      border: '1px solid var(--vscode-button-border)',
                      borderRadius: '2px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    {sched.enabled ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => deleteSchedule(sched.id)}
                    style={{
                      padding: '2px 8px',
                      background: 'transparent',
                      color: 'var(--vscode-errorForeground)',
                      border: '1px solid var(--vscode-errorForeground)',
                      borderRadius: '2px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
