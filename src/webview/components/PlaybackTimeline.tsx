import React, { useState, useEffect, useCallback } from 'react';
import { vscode } from '../App';

interface StepResult {
  stepIndex: number;
  actionType: string;
  status: 'success' | 'healed' | 'failed';
  strategy: string;
  durationMs: number;
  screenshotPath?: string;
  error?: string;
}

export const PlaybackTimeline: React.FC = () => {
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<StepResult[]>([]);
  const [headless, setHeadless] = useState(false);
  const [slowMo, setSlowMo] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const message = event.data;
    switch (message.type) {
      case 'loadRecording':
        setRecordingId(message.payload.recordingId);
        setSteps([]);
        setError(null);
        break;
      case 'stepCompleted':
        setSteps(prev => [...prev, message.payload]);
        break;
      case 'playbackCompleted':
        setIsPlaying(false);
        break;
      case 'playbackError':
        setIsPlaying(false);
        setError(message.payload.error);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const startPlayback = () => {
    if (!recordingId) return;
    setSteps([]);
    setError(null);
    setIsPlaying(true);
    vscode.postMessage({
      type: 'startPlayback',
      payload: {
        recordingId,
        options: { headless, slowMo },
      },
    });
  };

  const stopPlayback = () => {
    vscode.postMessage({ type: 'stopPlayback' });
  };

  const statusColor = (status: string): string => {
    switch (status) {
      case 'success': return 'var(--vscode-testing-iconPassed)';
      case 'healed': return 'var(--vscode-editorWarning-foreground)';
      case 'failed': return 'var(--vscode-errorForeground)';
      default: return 'var(--vscode-foreground)';
    }
  };

  const statusIcon = (status: string): string => {
    switch (status) {
      case 'success': return '✓';
      case 'healed': return '⚕';
      case 'failed': return '✗';
      default: return '?';
    }
  };

  const totalPassed = steps.filter(s => s.status === 'success').length;
  const totalHealed = steps.filter(s => s.status === 'healed').length;
  const totalFailed = steps.filter(s => s.status === 'failed').length;

  return (
    <div style={{ padding: '16px', fontFamily: 'var(--vscode-font-family)', color: 'var(--vscode-foreground)' }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '16px' }}>Playback</h2>

      {!recordingId && (
        <p style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '13px' }}>
          Select a recording from the library to start playback.
        </p>
      )}

      {recordingId && (
        <>
          {/* Options */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={headless}
                onChange={e => setHeadless(e.target.checked)}
                disabled={isPlaying}
              />
              Headless
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              Slow Mo:
              <input
                type="number"
                value={slowMo}
                onChange={e => setSlowMo(parseInt(e.target.value) || 0)}
                min={0}
                max={5000}
                step={100}
                disabled={isPlaying}
                style={{
                  width: '70px',
                  padding: '4px',
                  background: 'var(--vscode-input-background)',
                  color: 'var(--vscode-input-foreground)',
                  border: '1px solid var(--vscode-input-border)',
                  borderRadius: '2px',
                }}
              />
              ms
            </label>
          </div>

          {/* Play / Stop */}
          <div style={{ marginBottom: '16px' }}>
            {!isPlaying ? (
              <button
                onClick={startPlayback}
                style={{
                  padding: '8px 16px',
                  background: 'var(--vscode-button-background)',
                  color: 'var(--vscode-button-foreground)',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                ▶ Play
              </button>
            ) : (
              <button
                onClick={stopPlayback}
                style={{
                  padding: '8px 16px',
                  background: 'var(--vscode-errorForeground)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                ■ Stop
              </button>
            )}
          </div>

          {/* Summary */}
          {steps.length > 0 && (
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '12px' }}>
              <span style={{ color: 'var(--vscode-testing-iconPassed)' }}>✓ {totalPassed} passed</span>
              <span style={{ color: 'var(--vscode-editorWarning-foreground)' }}>⚕ {totalHealed} healed</span>
              <span style={{ color: 'var(--vscode-errorForeground)' }}>✗ {totalFailed} failed</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              padding: '8px 12px',
              marginBottom: '12px',
              background: 'var(--vscode-inputValidation-errorBackground)',
              border: '1px solid var(--vscode-inputValidation-errorBorder)',
              borderRadius: '2px',
              fontSize: '12px',
            }}>
              {error}
            </div>
          )}

          {/* Step Timeline */}
          {steps.length > 0 && (
            <div style={{
              border: '1px solid var(--vscode-panel-border)',
              borderRadius: '2px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 10px',
                    borderBottom: '1px solid var(--vscode-panel-border)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: statusColor(step.status), fontWeight: 'bold', width: '16px' }}>
                    {statusIcon(step.status)}
                  </span>
                  <span style={{ flex: 1 }}>
                    <strong>Step {step.stepIndex + 1}</strong> — {step.actionType}
                  </span>
                  <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '11px' }}>
                    {step.strategy}
                  </span>
                  <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '11px', minWidth: '50px', textAlign: 'right' }}>
                    {step.durationMs}ms
                  </span>
                </div>
              ))}
            </div>
          )}

          {isPlaying && (
            <p style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)', marginTop: '12px' }}>
              Playback in progress...
            </p>
          )}
        </>
      )}
    </div>
  );
};
