import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/globals.css';

// Note: StrictMode is intentionally omitted. Its dev-only double-mounting
// causes framer-motion `whileInView` reveals to get stuck at opacity 0,
// leaving sections (e.g. the Capabilities grid) blank until a resize. The
// production build is unaffected; this keeps dev consistent with prod.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
