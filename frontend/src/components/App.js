import StartIcon from '@mui/icons-material/Start';
// mui関連をインポートする。
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './../assets/css/App.css';
import NoPage from './common/NoPage';
import Web3Menu from "./common/Web3Menu";
import Home from './pages/Home';
import Create from './pages/Create';
import Txs from './pages/Txs';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// create connector object
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", 
  qrcodeModal: QRCodeModal,
});

/**
 * Appコンポーネント
 */
function App() {
  // ステート変数
  const [currentAccount, setCurrentAccount] = useState(null);

  /**
   * 接続されているネットワークが想定されているものかチェックする。
   */
  const checkNetwork = async () => {
    // get network ID  
    var networkId = window.ethereum.networkVersion;

    try {
      if (networkId !== "4" || "5" || "80001" || "97" || "43113") {
        alert("Please connect a correct network");
      } else {
        console.log("connect!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  /**
   * ウォレットの接続状態を確認するメソッド
   */
  const checkIfWalletIsConnected = async () => {
    // Metamaskのオブジェクトを取得する。
    const { ethereum } = window;

    try {
      // not installed ro Mobile
      if (!ethereum) {
        if (connector) {
          // create new session
          connector.createSession();
        } else {
          alert("Please install MetaMask!");
          return;
        }
      } else {
        // インストールされている場合
        // MetaMaskのアカウント情報を取得する。
        const accounts = await ethereum.request({ method: "eth_accounts" });
        // アカウントの情報を主とする。
        if (accounts.length !== 0) {
          const account = accounts[0];
          // ステート変数を更新する。
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch(error) {
      console.error(error);
    }
  };

  /**
   * ウォレット接続ボタンを押した時の処理
   */
  const connectWalletAction = async () => {
    // Metamaskのオブジェクトを取得する。
    const { ethereum } = window;
    // message for sign 
    const messagebody = JSON.stringify(
      {
        domain: {
          chainId: ethereum.networkVersion,
          name: 'MultiSigWalletDApp',
          version: '1'
        },
        message: {
          text:'This is the MultiSigWalletDApp. Will you approve for connecting this DApp?'
        },
        primaryType: 'Message',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' }
          ],
          Message: [
            { name: 'confirm', type: 'string' },
          ]
        }
      }
    );

    try {
      // not installed ro Mobile
      if (!ethereum) {
        if (connector) {
          // create new session
          connector.createSession();
        } else {
          alert("Please install MetaMask!");
          return;
        }
      }
      // ウォレットの接続状態をチェックする。
      checkIfWalletIsConnected();
      // ウォレットアドレスに対してアクセスをリクエストする。
      const accounts = await ethereum.request({method: "eth_requestAccounts",})
                                      .then(() => {
                                        // EIP-712 sign request
                                        ethereum.request({
                                          method: 'eth_signTypedData_v1',
                                          params: [
                                            accounts[0],
                                            messagebody
                                          ]
                                        });
                                      });
      // ステート変数にアカウント情報を格納する。
      setCurrentAccount(accounts[0]);
      // goreliネットワークに接続されていることをチェックする。
      checkNetwork();
    } catch (error) {
      console.log(error);
    }
  };

  // 副作用フック(読み込み時)
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // 副作用フック2 (アカウント切り替え時)
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

  // 副作用フック(読み込み時)
  useEffect(() => {
    // 接続するチェーンIDが変化したタイミングで再読み込みを実行する。
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    // アカウントが切り替わったタイミングで再読み込みを実行する。
    window.ethereum.on('accountsChanged', () => window.location.reload());
  }, [window.ethereum]);

  // 副作用フック(読み込み時)
  useEffect(() => {
    /*
    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Delete connector
    });
    */
  }, [connector]);

  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <Router>
        <div sx={{ flexGrow: 1 }}>
        { /* 画面上部に表示するAppBarコンポーネント */ }
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Typography variant="h6" color="white" sx={{ flexGrow: 1 }}>
                <strong>MultiSig DApp</strong>
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
              <Route path="/" exact element={ <Home/> } />
              <Route path="/home" exact element={ <Home/> } />
              <Route path="/create" exact element={ <Create/> } />
              <Route path="/txs" exact element={ <Txs/> } />
              <Route path="*" exact element={ <NoPage/> } />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
