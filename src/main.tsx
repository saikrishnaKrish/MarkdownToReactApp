import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ChaptersProvider } from './hooks/useChapters';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChaptersProvider>
      <App />
    </ChaptersProvider>
  </StrictMode>
);