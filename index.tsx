
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TradesProvider } from './context/TradesContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TradesProvider>
      <App />
    </TradesProvider>
  </React.StrictMode>
);
