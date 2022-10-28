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
const { ethers, BigNumber } = require('ethers');

// 起動
app.listen(portNo, () => {
    logger.debug('起動しました', `https://localhost:${portNo}`)
});

// 暗号化用のモジュールを読み込む
const crypto = require('crypto');
// did用のモジュールを読み込む
const ION = require('@decentralized-identity/ion-tools')

// create twilio object
/*
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
*/

// ブロックチェーン機能のモジュールを読み込む
const utils = require('./Utils');
// ABI
const abis = require('./contracts/ABI');

// APIの定義

/**
 * テスト用API
 */
 app.get('/api/test', async (req, res) => {
    logger.debug("テスト用API start");

    // コントラクトのABI
    // const abi = req.query.abi;
    const abi = abis.GreetingABI;
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
  const abi = abis.GreetingABI;
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
/*
app.get('/api/test3', (req, res) => {

    // パスワードのハッシュ値を取得する。
    let passHash = crypto.createHash('sha256').update("test").digest('hex');

    client.messages
      .create({
        body: passHash,
        messagingServiceSid: TWILIO_SERVICE_SID,
        to: 'YourPhoneNumber'
      })
      .then((message) => logger.log(message.sid));
    
    res.json({ result: "SMS success!!" });
});
*/

/**
 * テスト用のAPI
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

  let authnKeys2 = await ION.generateKeyPair();

  // UPDATE EXAMPLE
  let updateOperation = await did.generateOperation('update', {
    removePublicKeys: ["key-1"],
    addPublicKeys: [
      {
        id: 'key-2',
        type: 'EcdsaSecp256k1VerificationKey2019',
        publicKeyJwk: authnKeys2.publicJwk,
        purposes: [ 'authentication' ]
      }
    ],
    removeServices: ["some-service-1"],
    addServices: [{
      "id": "some-service-2",
      "type": "SomeServiceType",
      "serviceEndpoint": "http://www.example.com"
    }]
  });

  logger.log("updateOperation:", updateOperation)

  // RECOVERY EXAMPLE
  let authnKeys3 = await ION.generateKeyPair();
  let recoverOperation = await did.generateOperation('recover', {
    removePublicKeys: ["key-2"],
    addPublicKeys: [
      {
        id: 'key-3',
        type: 'EcdsaSecp256k1VerificationKey2019',
        publicKeyJwk: authnKeys3.publicJwk,
        purposes: [ 'authentication' ]
      }
    ],
    removeServices: ["some-service-2"],
    addServices: [{
      "id": "some-service-3",
      "type": "SomeServiceType",
      "serviceEndpoint": "http://www.example.com"
    }]
  });

  logger.log("recoverOperation:", recoverOperation)

  // DEACTIVATE EXAMPLE
  let deactivateOperation = await did.generateOperation('deactivate');

  logger.log("deactivateOperation:", deactivateOperation)

  res.json({ DID : response2 });
});

/**
 * IDQTokenを発行するAPI
 * @param to 発行先アドレス
 * @param amount 発行量
 */
app.post('/api/mintIDQ', async(req, res) => {
  logger.log("発行用のAPI開始");
  // コントラクトのABI
  const abi = abis.MyTokenABI;
  // コントラクトのアドレス
  const address = '0x5B907Bd1b59760169a0946bD0A9044fF3E15c3e9';
  //const chainId = req.query.chainId;
  const chainId = 43113;

  // create wallet 
  const wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
  // create provider
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  // create contract 
  var contract = new ethers.Contract(address, abi, await provider.getSigner(wallet.address));

  // call send Tx function
  var result = await utils.sendTx(logger, abi, address, "mint", ["0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072", 10000000000000000000], 'https://api.avax-test.network/ext/bc/C/rpc', chainId);

  if(result == true) {
      logger.debug("トランザクション送信成功");
      logger.log("発行用のAPI終了");
      res.json({ result: 'success' });
  } else {
      logger.error("トランザクション送信失敗");
      logger.log("発行用のAPI終了");
      res.json({ result: 'fail' });
  }
});

/**
 * IDQTokenを償却するAPI
 * @param to 発行先アドレス
 * @param amount 償却量
 */
app.post('/api/burnIDQ', async(req, res) => {
  logger.log("償却用のAPI開始")
  // コントラクトのABI
  const abi = abis.MyTokenABI;
  // コントラクトのアドレス
  const address = '0x5B907Bd1b59760169a0946bD0A9044fF3E15c3e9';
  //const chainId = req.query.chainId;
  const chainId = 43113;
  
  // create wallet 
  const wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
  // create provider
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  // create contract 
  var contract = new ethers.Contract(address, abi, await provider.getSigner(wallet.address));

  // call send Tx function
  var result = await utils.sendTx(logger, abi, address, "burnFrom", ["0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072", 10000000000000000000], 'https://api.avax-test.network/ext/bc/C/rpc', chainId);

  if(result == true) {
      logger.debug("トランザクション送信成功");
      logger.log("発行用のAPI終了");
      res.json({ result: 'success' });
  } else {
      logger.error("トランザクション送信失敗");
      logger.log("発行用のAPI終了");
      res.json({ result: 'fail' });
  }
  logger.log("償却用のAPI終了")
});

/**
 * IDQTokenの残高を取得するAPI
 * @param addr 残高を取得するアドレス
 */
app.get('/api/balance/IDQ', async(req, res) => {
  logger.log("残高取得用のAPI開始")
  // コントラクトのABI
  const abi = abis.MyTokenABI;
  // コントラクトのアドレス
  const address = '0x5B907Bd1b59760169a0946bD0A9044fF3E15c3e9';

  // create wallet 
  const wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
  // create provider
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  // create contract 
  var contract = new ethers.Contract(address, abi, await provider.getSigner(wallet.address));

  console.log("contract:", contract);

  const balance = await contract.callStatic.balanceOf(wallet.address);

  logger.log("残高取得用のAPI終了");
  res.json({ balance: balance });
});

/**
 * DIDを作成するAPI
 */
app.get('/api/create', async(req, res) => {
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

  const requestBody = await did.generateRequest();
  const request = new ION.AnchorRequest(requestBody);
  let response = await request.submit();
  logger.log("response:", response)

  res.json({ DID : await did.getURI() });
});


/**
 * DIDドキュメントを検索するAPI
 */
app.get('/api/resolve', async(req, res) => {
  var uri = req.query.uri;
  // resolve
  const response = await ION.resolve(uri);
  logger.log("response:", response);

  res.json({ result : response });
});

/**
 * DIDを利用して署名処理するAPI
 */
app.post('/api/sign', async(req, res) => {
  /*
  const privateKey = JSON.parse(await fs.readFile('privateKey.json'))
  const myData = 'This message is signed and cannot be tampered with'
  const signature = await ION.signJws({
    payload: myData,
    privateJwk: privateKey
  });

  res.json({ signature : signature });
  */
});

/**
 * DIDを利用して署名検証するAPI
 */
app.post('/api/verify', async(req, res) => {
  /*
  const publicKey = JSON.parse(await fs.readFile('publicKey.json'))
  verifiedJws = await ION.verifyJws({
    jws: signature,
    publicJwk: publicKey
  })
  console.log("Verify with my public key:", verifiedJws)

  res.json({ verifiedJws : verifiedJws });
  */
});

// 静的ファイルを自動的に返すようルーティングする。
app.use('/', express.static('./build'));