import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProvedorIdioma } from './i18n/provedorIdioma';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvedorIdioma>
      <App />
    </ProvedorIdioma>
  </StrictMode>,
);
