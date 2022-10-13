import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import * as fcl from "@onflow/fcl";

// connect to Flow testnet
fcl
  .config()
  .put("accessNode.api", "https://access-testnet.onflow.org") 
  .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn")


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

