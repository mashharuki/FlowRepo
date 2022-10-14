import logo from './assets/img/logo.svg';
import './assets/css/App.css';
import { useEffect, useState } from "react";
import Web3 from 'web3'
import BloctoSDK from '@blocto/sdk'

const {
  REACT_APP_MUNBAI_KEY
} = process.env;

/**
 * App Component
 */
function App() {
  // state variable
  const [blocto, setBlocto] = useState(null);
  const [accounts, setAccounts]  =useState(null);

  useEffect(()=>{
    // create bloctoSDK object
    const bloctoSDK = new BloctoSDK({
      ethereum: {
          chainId: '80001', 
          rpc: `https://polygon-mumbai.g.alchemy.com/v2/${REACT_APP_MUNBAI_KEY}`,
      },
    });
    setBlocto(bloctoSDK);
  }, [])

  /**
   * connect function
   */
  const connect = () => {
    // request
    const signers = blocto.ethereum.request({ method: 'eth_requestAccounts' });
    setAccounts(signers);
  }

  /**
   * sign function
   */
  const sign = async() => {
    try {
      // sign
      blocto.ethereum.request({
        method: 'eth_sign', 
        params: [
          `${accounts[0]}`, 
          "0x48656c6c6f20776f726c64"
        ] 
      });

      alert("sign successful!!");
    } catch(e) {
      console.error("err:", e);
      alert("sign failful..");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={connect}
        >
          connect
        </button>
        <button
          onClick={sign}
        >
          sign
        </button>
      </header>
    </div>
  );
}

export default App;
