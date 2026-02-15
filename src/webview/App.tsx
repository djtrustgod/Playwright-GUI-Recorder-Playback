import React from 'react';
import { RecordingControls } from './components/RecordingControls';
import { PlaybackTimeline } from './components/PlaybackTimeline';
import { ScheduleManager } from './components/ScheduleManager';
import { SelfHealingReport } from './components/SelfHealingReport';

// VS Code webview API
declare function acquireVsCodeApi(): {
  postMessage(message: unknown): void;
  getState(): unknown;
  setState(state: unknown): void;
};

export const vscode = acquireVsCodeApi();

interface AppProps {
  panel: string;
}

export const App: React.FC<AppProps> = ({ panel }) => {
  switch (panel) {
    case 'recording':
      return <RecordingControls />;
    case 'playback':
      return <PlaybackTimeline />;
    case 'monitoring':
      return <ScheduleManager />;
    case 'selfHealing':
      return <SelfHealingReport />;
    default:
      return <RecordingControls />;
  }
};
