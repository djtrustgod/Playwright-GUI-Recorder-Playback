import React, { useState, useEffect, useCallback } from 'react';
import { vscode } from '../App';

interface HealedSelector {
  id: string;
  recording_id: string;
  action_index: number;
  original_selector: string;
  healed_selector: string;
  confidence: number;
  strategy: string;
  healed_at: string;
}

export const SelfHealingReport: React.FC = () => {
  const [healedSelectors, setHealedSelectors] = useState<HealedSelector[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const message = event.data;
    if (message.type === 'healedSelectorsData') {
      setHealedSelectors(message.payload);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    vscode.postMessage({ type: 'getHealedSelectors' });
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const strategyBadge = (strategy: string) => {
    const colors: Record<string, string> = {
      direct: 'var(--vscode-testing-iconPassed)',
      embedding: 'var(--vscode-editorInfo-foreground)',
      llm: 'var(--vscode-editorWarning-foreground)',
    };
    return (
      <span style={{
        display: 'inline-block',
        padding: '1px 6px',
        borderRadius: '10px',
        fontSize: '10px',
        fontWeight: 600,
        color: 'var(--vscode-editor-background)',
        background: colors[strategy] || 'var(--vscode-descriptionForeground)',
      }}>
        {strategy}
      </span>
    );
  };

  const confidenceBar = (value: number) => (
    <div style={{
      width: '60px', height: '4px',
      background: 'var(--vscode-editorWidget-border)',
      borderRadius: '2px',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${Math.round(value * 100)}%`, height: '100%',
        background: value >= 0.9
          ? 'var(--vscode-testing-iconPassed)'
          : value >= 0.7
            ? 'var(--vscode-editorWarning-foreground)'
            : 'var(--vscode-errorForeground)',
        borderRadius: '2px',
      }} />
    </div>
  );

  return (
    <div style={{ padding: '16px', fontFamily: 'var(--vscode-font-family)', color: 'var(--vscode-foreground)' }}>
      <h2 style={{ margin: '0 0 4px', fontSize: '16px' }}>Self-Healing Report</h2>
      <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--vscode-descriptionForeground)' }}>
        Selectors that were automatically repaired during playback.
      </p>

      {healedSelectors.length === 0 ? (
        <p style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '13px' }}>
          No healed selectors recorded yet. Run a playback with self-healing enabled.
        </p>
      ) : (
        <div style={{ border: '1px solid var(--vscode-panel-border)', borderRadius: '2px' }}>
          {healedSelectors.map(h => (
            <div key={h.id}>
              <div
                onClick={() => setExpandedId(expandedId === h.id ? null : h.id)}
                style={{
                  padding: '8px 10px',
                  borderBottom: '1px solid var(--vscode-panel-border)',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: 'var(--vscode-editor-font-family)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Step {h.action_index + 1}
                </span>
                {strategyBadge(h.strategy)}
                {confidenceBar(h.confidence)}
                <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '11px' }}>
                  {Math.round(h.confidence * 100)}%
                </span>
                <span style={{ fontSize: '10px', color: 'var(--vscode-descriptionForeground)' }}>
                  {expandedId === h.id ? '▲' : '▼'}
                </span>
              </div>

              {expandedId === h.id && (
                <div style={{
                  padding: '10px 14px',
                  background: 'var(--vscode-editor-background)',
                  borderBottom: '1px solid var(--vscode-panel-border)',
                  fontSize: '11px',
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ display: 'block', marginBottom: '2px', color: 'var(--vscode-errorForeground)' }}>
                      Original (broken):
                    </strong>
                    <code style={{
                      display: 'block',
                      padding: '4px 6px',
                      background: 'var(--vscode-textCodeBlock-background)',
                      borderRadius: '2px',
                      fontFamily: 'var(--vscode-editor-font-family)',
                      wordBreak: 'break-all',
                    }}>
                      {h.original_selector}
                    </code>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ display: 'block', marginBottom: '2px', color: 'var(--vscode-testing-iconPassed)' }}>
                      Healed:
                    </strong>
                    <code style={{
                      display: 'block',
                      padding: '4px 6px',
                      background: 'var(--vscode-textCodeBlock-background)',
                      borderRadius: '2px',
                      fontFamily: 'var(--vscode-editor-font-family)',
                      wordBreak: 'break-all',
                    }}>
                      {h.healed_selector}
                    </code>
                  </div>
                  <div style={{ color: 'var(--vscode-descriptionForeground)' }}>
                    Healed at: {new Date(h.healed_at).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
