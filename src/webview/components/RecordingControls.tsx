import React, { useState, useEffect, useCallback } from 'react';
import { vscode } from '../App';

interface RecordedAction {
  type: string;
  url: string;
  timestamp: number;
  fingerprint?: {
    tag: string;
    text: string;
    ariaRole?: string;
  };
}

export const RecordingControls: React.FC = () => {
  const [url, setUrl] = useState('https://');
  const [browser, setBrowser] = useState('chromium');
  const [saveAuth, setSaveAuth] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [actions, setActions] = useState<RecordedAction[]>([]);

  const handleMessage = useCallback((event: MessageEvent) => {
    const message = event.data;
    switch (message.type) {
      case 'recordedAction':
        setActions(prev => [...prev, message.payload]);
        break;
      case 'recordingStopped':
        setIsRecording(false);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const startRecording = () => {
    if (!url || url === 'https://') return;
    setActions([]);
    setIsRecording(true);
    vscode.postMessage({
      type: 'startRecording',
      payload: { url, browser, saveAuth },
    });
  };

  const stopRecording = () => {
    vscode.postMessage({ type: 'stopRecording' });
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'var(--vscode-font-family)', color: 'var(--vscode-foreground)' }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '16px' }}>Record Browser Actions</h2>

      {/* URL Input */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: 'var(--vscode-descriptionForeground)' }}>
          Target URL
        </label>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={isRecording}
          placeholder="https://example.com"
          style={{
            width: '100%',
            padding: '6px 8px',
            background: 'var(--vscode-input-background)',
            color: 'var(--vscode-input-foreground)',
            border: '1px solid var(--vscode-input-border)',
            borderRadius: '2px',
            fontSize: '13px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Browser Selection */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: 'var(--vscode-descriptionForeground)' }}>
          Browser
        </label>
        <select
          value={browser}
          onChange={e => setBrowser(e.target.value)}
          disabled={isRecording}
          style={{
            width: '100%',
            padding: '6px 8px',
            background: 'var(--vscode-dropdown-background)',
            color: 'var(--vscode-dropdown-foreground)',
            border: '1px solid var(--vscode-dropdown-border)',
            borderRadius: '2px',
            fontSize: '13px',
          }}
        >
          <option value="chromium">Chromium</option>
          <option value="firefox">Firefox</option>
          <option value="webkit">WebKit</option>
        </select>
      </div>

      {/* Save Auth Toggle */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={saveAuth}
            onChange={e => setSaveAuth(e.target.checked)}
            disabled={isRecording}
          />
          Save authentication state (cookies, localStorage)
        </label>
      </div>

      {/* Record / Stop Button */}
      <div style={{ marginBottom: '16px' }}>
        {!isRecording ? (
          <button
            onClick={startRecording}
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
            ● Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
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
            ■ Stop Recording
          </button>
        )}
      </div>

      {/* Live Action Feed */}
      {actions.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--vscode-descriptionForeground)' }}>
            Recorded Actions ({actions.length})
          </h3>
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: '2px',
          }}>
            {actions.map((action, i) => (
              <div
                key={i}
                style={{
                  padding: '6px 8px',
                  borderBottom: '1px solid var(--vscode-panel-border)',
                  fontSize: '12px',
                  fontFamily: 'var(--vscode-editor-font-family)',
                }}
              >
                <span style={{ color: 'var(--vscode-symbolIcon-eventForeground)', fontWeight: 'bold' }}>
                  {action.type}
                </span>
                {action.fingerprint && (
                  <span style={{ color: 'var(--vscode-descriptionForeground)', marginLeft: '8px' }}>
                    {action.fingerprint.tag}
                    {action.fingerprint.text ? ` "${action.fingerprint.text.substring(0, 30)}"` : ''}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isRecording && (
        <p style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)', marginTop: '12px' }}>
          Recording in progress... Interact with the browser window, then click Stop when done.
        </p>
      )}
    </div>
  );
};
