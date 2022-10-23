/**
 * APIサーバー設定ファイル
 */

// Webサーバーの起動
const express = require('express');
var log4js = require('log4js');
const fs = require('fs');
const app = express();
// ポート番号
const portNo = 3001;
// 接続するデータベース名
const database1 = 'reidai';
const database2 = 'iroha_default';
// log4jsの設定
log4js.configure('./log/log4js_setting.json');
const logger = log4js.getLogger("server");

// 起動
app.listen(portNo, () => {
    logger.debug('起動しました', `https://localhost:${portNo}`)
});

// 外部プロセス呼び出し用に使用する。
let exec = require('child_process').exec;
// 暗号化用のモジュールを読み込む
const crypto = require('crypto');

// APIの定義

/**
 * テスト用API
 */
 app.get('/api/test', (req, res) => {
    // SQL文
    const query = req.query.query;
    const values = req.query.values;
    
    res.json({ values: values });
});

/**
 * キーペアを生成し、公開鍵を取得するためのAPI
 */
 app.get('/api/publickey', (req, res) => {
    // 公開鍵用の変数
    let publicKey ='';

    try {
        // 公開鍵を取得する。
        publicKey = Keycreate.Keycreate();
        res.json({ publicKey: publicKey });
    } catch(err) {
        logger.debug('exec error: ' + err);
        res.status(500).send("公開鍵取得中にエラーが発生しました。");
    }
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

/**
 * チャージ処理用API
 */
app.get('/api/charge', (req, res) => {
    // パラメータから値を取得する。
    const prepay = req.query.prepay;
    const counter = req.query.counter;
    const total = req.query.total;
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    // メッセージ
    const msg = "charge";
    // アカウントの秘密鍵を取得する。
    const privateKey = GetPrivKey.GetPrivKey(accountId, domain);
    // アカウント作成用のコマンドを作成
    let COMMAND = ['node ./server/iroha/call/ChargeAssetCall.js', prepay, counter, total, domain, accountId + '@' + domain, privateKey];
    COMMAND = COMMAND.join(' ');
    logger.debug('Execute COMMAND=', COMMAND);

    // ブロック高用の変数
    let block = 0;
    // コマンドを実行する。
    exec( COMMAND , function(error, stdout, stderr) {
        if (error !== null) {                
            logger.error('exec error: ' + error);
            res.status(500).send("トランザクション作成中に発生しました。");
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
        const query = 'INSERT INTO shiharai_info (id,prepay,ticket,total,shisetsu,ninzu,usetime,job) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
        // パラメータ用の配列を作成する。
        const values = [ accountId + '@' + domain, prepay, counter, total, '-', 0, 0, msg ];
        // DBの実行
        pgHelper.execute(database1, query, values, (err, docs) => {
            if (err) {
                logger.error(err.toString());
                res.status(501).send("DB接続中にエラーが発生しました。");
                return;
            }
            // res.json({ roles: docs.rows });
        });
    });
});

/**
 * 支払処理用API
 */
app.get('/api/pay', (req, res) => {
    // パラメータから値を取得する。
    const prepay = req.query.prepay;
    const counter = req.query.counter;
    const total = req.query.total;
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    const room = req.query.room;
    const people = req.query.people;
    const usetime = req.query.usetime;
    // メッセージ
    const msg = "pay";
    
    logger.debug('Execute COMMAND=', COMMAND);

    // ブロック高用の変数
    let block = 0;
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
        const query = 'INSERT INTO shiharai_info (id,prepay,ticket,total,shisetsu,ninzu,usetime,job) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
        // パラメータ用の配列を作成する。
        const values = [ accountId + '@' + domain, prepay, counter, total, room, people, usetime, msg ];
        // DBの実行
        pgHelper.execute(database1, query, values, (err, docs) => {
            if (err) {
                logger.error(err.toString());
                res.status(500).send("DB接続中にエラーが発生しました");
                return;
            }
            logger.debug('実行結果：', docs);
            // res.json({ roles: docs.rows });
        });
    });
});

/**
 * 取引履歴照会用API
 */
app.get('/api/getTxHistory', (req, res) => {
    // パラメータから値を取得する。
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    // 実行するSQL
    const query = 'select no, id, prepay, ticket, total, shisetsu, ninzu, usetime, job from shiharai_info where id = $1';
    // パラメータ用の配列を作成する。
    const values = [ accountId + '@' + domain ];
    // DBの実行
    pgHelper.execute(database1, query, values, (err, docs) => {
        if (err) {
            logger.error(err.toString());
            res.status(501).send("DB接続中にエラーが発生しました");
            return;
        }
        logger.debug('実行結果：', docs.rows);
        res.status(200).send(docs.rows);
    });
});

/**
 * IDとパスワードを値を検証するAPI
 */
app.post('/api/login', (req, res) => {
    // パラメータから値を取得する。
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    const password = req.query.password;
    // パスワードのハッシュ値を取得する。
    const passHash = crypto.createHash('sha256').update(password).digest('hex');
    // 実行するSQL
    const query = 'select * from kaiin_info where id = $1 and password = $2';
    // パラメータ用の配列を作成する。
    const values = [ accountId + '@' + domain, passHash ];
    // DBの実行
    pgHelper.execute(database1, query, values, (err, docs) => {
        if (err) {
            logger.error(err.toString());
            res.status(500).send("DB接続中にエラーが発生しました");
            return; 
        }
        logger.debug('実行結果：', docs.rows);
        res.status(200).send(docs.rows);
    });
});

// 静的ファイルを自動的に返すようルーティングする。
app.use('/', express.static('./build'));