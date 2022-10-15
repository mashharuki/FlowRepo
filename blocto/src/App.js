import logo from './assets/img/logo.svg';
import './assets/css/App.css';
import { useEffect, useState } from "react";
import Web3 from 'web3';
import BloctoSDK from '@blocto/sdk';
import Messenger from './assets/contracts/Messenger.json';

const {
  REACT_APP_MUNBAI_KEY
} = process.env;

// contract Address
const CONTRACT_ADDRESS = "0xfFC2535688c5C053CF6E4C1B9452Fa14c092fe45";
// chain ID 
const chainId = '43113';
// rpc URL 
const RPC_URL = `https://api.avax-test.network/ext/bc/C/rpc`;

/**
 * App Component
 */
function App() {
  // state variable
  const [blocto, setBlocto] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(()=>{
    // create bloctoSDK object
    const bloctoSDK = new BloctoSDK({
      ethereum: {
          chainId: chainId, 
          rpc: RPC_URL,
      },
    });
    // create web3 object
    const provider = new Web3(RPC_URL);

    setBlocto(bloctoSDK);
    setWeb3(provider);
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
      await blocto.ethereum.request({
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

  /**
   * send eth function
   */
  const send = async() => {
    // tx param data
    const param = [{
      from: accounts[0],
      to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
      gas: '0x76c0', // 30400
      gasPrice: '0x9184e72a000', // 10000000000000
      value:  Web3.utils.toWei("0.0001"), 
      data: '0x00',
    },];

    try {
      // send
      const txHash = await blocto.ethereum.request({
        method: 'eth_sendTransaction', 
        params: param,
      });

      alert("send success!!");
      console.log("txHash:", txHash);
    } catch(e) {
      console.error("err:", e);
      alert("send fail..");
    }
  }

  /**
   * post function
   */
  const post = async(address, text) => {
    // create web3 object
    const provider = new Web3(RPC_URL);
    // contract object
    var Contract = new provider.eth.Contract(Messenger.abi, CONTRACT_ADDRESS,);
    // get address
    var signers = new provider.eth.getAccounts();

    try {
      // tx param data
      const param = [{
        from: signers[0],
        to: CONTRACT_ADDRESS,
        gas: '0x76c0', // 30400
        gasPrice: '0x9184e72a000', // 10000000000000
        value:  '0x00', 
        data: Contract.methods.post(text, address).encodeABI(),
      },];

      // send
      const txHash = await blocto.ethereum.request({
        method: 'eth_sendTransaction', 
        params: param,
      });

      // get comment
      const messages = await Contract.methods.getOwnMessages().call({
        from: signers[0],
      });

      alert("post success!!");
      console.log("messages:", messages);
    } catch(e) {
      console.error("err:", e);
      alert("post fail..");
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
        <button
          onClick={send}
        >
          send
        </button>
        <button
          onClick={()=>{
            post("0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072", "test23");
          }}
        >
          post
        </button>
      </header>
    </div>
  );
}

export default App;
