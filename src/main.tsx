import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

const clientIdGoogle = import.meta.env.VITE_CLIENT_GOOGLE;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientIdGoogle}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
