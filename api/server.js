/**
 * APIサーバー設定ファイル
 */

require('dotenv').config()
// get Mnemonic code
const {
  MNEMONIC,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
  TWILIO_USER_NAME
} = process.env

// Webサーバーの起動
const express = require('express');
var log4js = require('log4js');
const app = express();
// ポート番号
const portNo = 3001;
// log4jsの設定
log4js.configure('./log/log4js_setting.json');
const logger = log4js.getLogger("server");
const { ethers } = require('ethers');

// 起動
app.listen(portNo, () => {
    logger.debug('起動しました', `https://localhost:${portNo}`)
});

// 外部プロセス呼び出し用に使用する。
let exec = require('child_process').exec;
// 暗号化用のモジュールを読み込む
const crypto = require('crypto');
const ION = require('@decentralized-identity/ion-tools')

// create twilio object
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// ブロックチェーン機能のモジュールを読み込む
const utils = require('./Utils');

// APIの定義

/**
 * テスト用API
 */
 app.get('/api/test', async (req, res) => {
    logger.debug("テスト用API start");

    // コントラクトのABI
    // const abi = req.query.abi;
    const abi = `[
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "author",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "greeting",
              "type": "string"
            }
          ],
          "name": "SetGreeting",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "getGreeting",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "greeting",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newGreeting",
              "type": "string"
            }
          ],
          "name": "setGreeting",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]`
    // コントラクトのアドレス
    //const address = req.query.address;
    const address = '0x7B31aa8Df58697f1F8723372Fe1C1D1ba1050A6A';
    // メソッド名
    //const methodName = req.query.methodName;
    const methodName = "setGreeting";
    // 引数
    //const args = req.query.args;
    const args = ["Sign offline3"];
    // チェーンID
    //const chainId = req.query.chainId;
    const chainId = 43113;
    // RPC URL 
    //const rpc_url = req.query.rpc_url;
    const rpc_url = 'https://api.avax-test.network/ext/bc/C/rpc';

    // call send Tx function
    var result = await utils.sendTx(logger, abi, address, methodName, args, rpc_url, chainId);

    if(result == true) {
        logger.debug("トランザクション送信成功");
        res.json({ result: 'success' });
    } else {
        logger.error("トランザクション送信失敗");
        res.json({ result: 'fail' });
    }

    logger.debug("テスト用API end");
});

/**
 * テスト用のAPI2
 */
app.get('/api/test2', async(req, res) => {
  // コントラクトのABI
  const abi = `[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "author",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "greeting",
          "type": "string"
        }
      ],
      "name": "SetGreeting",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getGreeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newGreeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`

  // コントラクトのアドレス
  //const address = req.query.address;
  const address = '0x7B31aa8Df58697f1F8723372Fe1C1D1ba1050A6A';

  // create wallet 
  const wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
  // create provider
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  // create contract 
  var contract = new ethers.Contract(address, abi, await provider.getSigner(wallet.address));

  const transaction = await contract.callStatic.getGreeting();
  logger.log("res :",  transaction);
  res.json({ result: transaction });
}); 

/**
 * テスト用のAPI3
 */
app.get('/api/test3', (req, res) => {

    // パスワードのハッシュ値を取得する。
    let passHash = crypto.createHash('sha256').update("test").digest('hex');

    client.messages
      .create({
        body: passHash,
        messagingServiceSid: TWILIO_SERVICE_SID,
        to: '+817085680356'
      })
      .then((message) => logger.log(message.sid));
    
    res.json({ result: "SMS success!!" });
});

/**
 * テスト用のAPI4
 */
app.get('/api/test4', async(req, res) => {
  let authnKeys = await ION.generateKeyPair();
  let did = new ION.DID({
    content: {
      publicKeys: [
        {
          id: 'key-1',
          type: 'EcdsaSecp256k1VerificationKey2019',
          publicKeyJwk: authnKeys.publicJwk,
          purposes: [ 'authentication' ]
        }
      ],
      services: [
        {
          id: 'domain-1',
          type: 'LinkedDomains',
          serviceEndpoint: 'https://foo.example.com'
        }
      ]
    }
  });
  // get URI 
  let longFormURI = await did.getURI();
  let shortFormURI = await did.getURI('short');

  logger.log("URI:", longFormURI)
  logger.log("short URI:", shortFormURI)

  // resolve 
  const response = await ION.resolve(longFormURI);
  logger.log("response:", response)

  const requestBody = await did.generateRequest();
  const request = new ION.AnchorRequest(requestBody);
  let response2 = await request.submit();

  res.json({ DID : response2 });
});

// 静的ファイルを自動的に返すようルーティングする。
app.use('/', express.static('./build'));