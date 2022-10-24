/**
 * APIサーバー設定ファイル
 */

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
// ブロックチェーン機能のモジュールを読み込む
const utils = require('./Utils');


// get Mnemonic code
const {
  MNEMONIC
} = process.env

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
    const args = ["Sign offline2"];
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
 * 新規会員情報を挿入するためのAPI
 */
app.get('/api/input', (req, res) => {
    // パラメータから値を取得する。
    let domain = req.query.domain;
    let accountId = req.query.accountId;
    let name = req.query.name;
    let kana = req.query.kana;
    let tel = req.query.tel;
    let addr = req.query.adds;
    let bd = req.query.bd;
    let ed = req.query.ed;
    let password = req.query.password;
    // パスワードのハッシュ値を取得する。
    let passHash = crypto.createHash('sha256').update(password).digest('hex');
    // ブロック高用の変数を用意する。
    let block = 0;
    // 公開鍵を取得する。
    let publicKey = Keycreate.Keycreate(accountId, domain);

    // アカウント作成用のコマンドを作成
    let COMMAND = ['node ./server/iroha/call/CreateAccountCall.js', domain, accountId, publicKey];
    COMMAND = COMMAND.join(' ');
    logger.debug('Execute COMMAND=', COMMAND);

    // コマンドを実行する。
    exec( COMMAND , function(error, stdout, stderr) {
        if (error !== null) {                
            logger.error('exec error: ' + error);
            res.status(500).send("トランザクション作成中にエラーが発生しました");
            return
        }
        logger.debug(stdout)
        //ブロック位置を取得
        if (stdout.match(/height: (\d+),/) !== null){
            block = stdout.match(/height: (\d+),/)[1];
            logger.debug("block:", block);
        } else {
            //キーファイルより公開鍵を取得
            block = (2^64)+1
        }
        // 実行するSQL
        const query = 'INSERT INTO kaiin_info (id,name,kana,addr,tel,bd,ed,block,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
        // パラメータ用の配列を作成する。
        const values = [ accountId + '@' + domain, name, kana, addr, tel, bd, ed, block, passHash ];
        // DBの実行
        pgHelper.execute(database1, query, values, (err, docs) => {
            if (err) {
                logger.error(err.toString());
                res.status(501).send("DB接続中にエラーが発生しました");
                return;
            }
            // res.json({ roles: docs.rows });
        });
    });
});


// 静的ファイルを自動的に返すようルーティングする。
app.use('/', express.static('./build'));