import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from '@self.id/framework'
import ConnectButton from './components/ConnectButton';

/**
 * App Component
 * @returns 
 */
function App() {
  return (
    <Provider client={{ ceramic: 'testnet-clay' }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <ConnectButton/>
        </header>
      </div>
    </Provider>
  );
}

export default App;
