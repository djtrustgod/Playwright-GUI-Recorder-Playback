import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = document.getElementById('root');
if (root) {
  const panel = root.getAttribute('data-panel') || 'recording';
  createRoot(root).render(<App panel={panel} />);
}
