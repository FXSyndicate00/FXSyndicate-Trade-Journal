
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TradesProvider } from './context/TradesContext';
import { AccountsProvider } from './context/AccountsContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AccountsProvider>
      <TradesProvider>
        <App />
      </TradesProvider>
    </AccountsProvider>
  </React.StrictMode>
);
