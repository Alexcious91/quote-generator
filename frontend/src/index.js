import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from "./auth/AuthProvider"

import 'bootstrap/dist/css/bootstrap.css'
import { ThemeProvider } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider breakpoints={["md, lg"]}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

