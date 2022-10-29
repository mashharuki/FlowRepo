import BloctoSDK from '@blocto/sdk';
import StartIcon from '@mui/icons-material/Start';
// mui関連をインポートする。
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from 'web3';
import './../assets/css/App.css';
import NoPage from './common/NoPage';
import Web3Menu from "./common/Web3Menu";
import Create from './pages/Create';
import Home from './pages/Home';
import Txs from './pages/Txs';
import Wallets from './pages/Wallets';

// contract Address (WalletFactory)
const CONTRACT_ADDRESS = "0xacff3BF500e0E9F7734D39064B290873d80Fe749";
// contract Address (MyToken)
const MYTOKEN_ADDRESS = "0x5B907Bd1b59760169a0946bD0A9044fF3E15c3e9";
// chain ID 
const chainId = '43113';
// rpc URL 
const RPC_URL = `https://api.avax-test.network/ext/bc/C/rpc`;

/**
 * Appコンポーネント
 */
function App() {
  // ステート変数
  const [currentAccount, setCurrentAccount] = useState(null);
  const [blocto, setBlocto] = useState(null);
  const [web3, setWeb3] = useState(null);

  /**
   * ウォレット接続ボタンを押した時の処理
   */
  const connectWalletAction = async () => {
    try {
      // create bloctoSDK object
      const bloctoSDK = new BloctoSDK({
        ethereum: {
            chainId: chainId, 
            rpc: RPC_URL,
        }
      });
      // create web3 object
      const provider = new Web3(RPC_URL);
      // request
      const signers = await bloctoSDK.ethereum.request({ method: 'eth_requestAccounts' });
  
      setBlocto(bloctoSDK);
      setWeb3(provider);
      setCurrentAccount(signers[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <Router>
        <div sx={{ flexGrow: 1 }}>
        { /* 画面上部に表示するAppBarコンポーネント */ }
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>
                <strong>IDQ DApp</strong>
              </Typography>
              { /* ウォレットに接続していなければログインアイコンを表示する。 */ }
              <Typography variant="h6" color="inherit">
                {currentAccount === null ? (
                  <IconButton 
                    aria-label="more"
                    id="connect-wallet"
                    aria-haspopup="true"
                    onClick={connectWalletAction}
                  >
                    <StartIcon />
                  </IconButton>
                ) :
                  /* 各画面に遷移するためのWeb3Menuコンポーネントを表示する。 */
                  <Web3Menu/>
                }
              </Typography>
            </Toolbar>
          </AppBar>
          { /* ウォレットに接続し、アカウント情報が取得できていなければウォレットへの接続を促す。 */ }
          { currentAccount === null ? (
            <header className="App-header">
              <p>Please Connect Your Wallet!!</p>
            </header>
          ) : (
            /* ルーティングに従い、各ページのコンポーネントを描画する。 */ 
            <Routes>
              <Route path="/" exact element={ <Home CONTRACT_ADDRESS={CONTRACT_ADDRESS} MYTOKEN_ADDRESS={MYTOKEN_ADDRESS} RPC_URL={RPC_URL} blocto={blocto} provider={web3} signer={currentAccount} /> } />
              <Route path="/home" exact element={ <Home CONTRACT_ADDRESS={CONTRACT_ADDRESS} MYTOKEN_ADDRESS={MYTOKEN_ADDRESS} RPC_URL={RPC_URL} blocto={blocto} provider={web3} signer={currentAccount} /> } />
              <Route path="/wallets" exact element={ <Wallets CONTRACT_ADDRESS={CONTRACT_ADDRESS} provider={web3} blocto={blocto} signer={currentAccount} /> } />
              <Route path="/create" exact element={ <Create CONTRACT_ADDRESS={CONTRACT_ADDRESS} provider={web3} blocto={blocto} signer={currentAccount} /> } />
              <Route path="/txs" exact element={ <Txs provider={web3} blocto={blocto} signer={currentAccount} /> } />
              <Route path="*" exact element={ <NoPage/> } />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
