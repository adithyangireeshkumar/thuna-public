import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './lib/i18n';
import { ThemeProvider } from './contexts/ThemeContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
