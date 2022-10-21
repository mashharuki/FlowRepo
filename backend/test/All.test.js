/**
 * ======================================================================
 * The Test Code for MulitSigWallet Contract + MyToken Contract
 * ======================================================================
 */

const truffleAssert = require("truffle-assertions");
const WalletFactory = artifacts.require("WalletFactoryV2");
const MultiSigWallet = artifacts.require("MultiSigWallet");
const MyToken = artifacts.require("MyToken");

/**
 * test
 */
contract("MultiSigWallet & MyToken Contract tests!!", accounts => {

    // owner's address
    const owners = [
        accounts[0],
        accounts[1],
        accounts[2]
    ];
    // required
    const required = 2;
    // variable for MultiSigWallet Contract
    var multiSigWallet;
    var factory;
    // variable for MyToken Contract
    var myToken;

    /**
     * addWallet function
     */
    async function addWallets (factory, count) {
        // wallet name
        const name = "testWallet";

        for (let i=0; i < count; i++) {
            // create MultiSigWallet Contract
            await factory.createWallet(`${name} ${i}`, owners, required);
        }
    }

    /**
     * テスト実行前の準備　
     */
    beforeEach (async () => {
        // MyTokenコントラクトのインスタンスを生成
        myToken = await MyToken.new("IDQToken", "IDQ", {
            from: accounts[0],
            gas: 5000000
        });
        // factoryコントラクトインスタンスを生成
        factory = await WalletFactory.new();
    });

    /**
     * init test
     */
    describe ("init test", async() => {
        it("check myToken Owner", async () => {
            // get owner address 
            var ownerAddress = await myToken.owner();
            // check owner address
            assert.equal(ownerAddress, owners[0], "owner address must be match!!");
        });

        it("check num of wallet", async () => {
            // get num of wallet
            var num = await factory.walletsCount();
            // check num of wallet
            assert.equal(num, 0, "num of wallet must be match!!");
        });
        /*
        it("check num of MultiSigWallet", async () => {
            // get num of wallet
            var num = await factory.getWallets(10, 0);
            // check num of wallet
            assert.equal(num, [], "num of MultiSigWallet must be match!!");
        });
        */
       
        it ("gets the myToken name", async () => {
            const actual = await myToken.name();
            assert.equal(actual, "IDQToken", "name should match");
        });

        it ("gets the myToken symbol", async () => {
            const actual = await myToken.symbol();
            assert.equal(actual, "IDQ", "symbol should match");
        });

        it ("gets the myToken decimals", async () => {
            const actual = await myToken.decimals();
            assert.equal(actual, 18, "decimal should match");
        });

        it ("gets the myToken totalSupply", async () => {
            const actual = await myToken.totalSupply();
            assert.equal(actual, 0, "totalSupply should match");
        });
    });

    /**
     * Factory test
     */
    describe ("Factory test", async() => {
        it("create wallet", async () => {
            await addWallets(factory, 1);
            // get num of wallet
            var num = await factory.walletsCount();
            // check num of wallet
            assert.equal(num, 1, "num of wallet must be match!!");
        });
    });

    describe ("varying limits && offset", async () => { 
        // before test
        beforeEach (async () => {
            await addWallets(factory, 30);
        });

        // 10個のインスタンスを返すかテスト
        it ("returns 10 results when limit requested is 10", async () => {
            const wallets = await factory.getWallets(10, 0);
            assert.equal(wallets.length, 10, "results size should be 10");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 20 results when limit requested is 20", async () => {
            const wallets = await factory.getWallets(20, 0);
            assert.equal(wallets.length, 20, "results size should be 20");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 30 results when limit requested is 30", async () => {
            const wallets = await factory.getWallets(30, 0);
            assert.equal(wallets.length, 20, "results size should be 20");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 30 results when limit requested is 30", async () => {
            const wallets = await factory.getWallets(30, 20);
            assert.equal(wallets.length, 10, "results size should be 20");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 30 results when limit requested is 30", async () => {
            const wallets = await factory.getWallets(30, 10);
            assert.equal(wallets.length, 20, "results size should be 20");
        });
    });

    describe ("deposit && mint test", async () => {
        it("deposit", async () => {
            // 入金額を定義する。
            const value = web3.utils.toWei('0.05');
            // receiveメソッドを呼び出す
            const transactionHash = await web3.eth.sendTransaction({
                from: owners[2],
                to: factory.address,
                value: value
            });
            // コントラクトの残高をチェックする。
            const contractBalance = await web3.eth.getBalance(factory.address);
            // チェックする。
            assert.equal(value, contractBalance, "balance must be match!!");
        });

        it("mint IDQToken", async() => {
            // 入金する。
            const transactionHash = await web3.eth.sendTransaction({
                from: owners[2],
                to: factory.address,
                value: web3.utils.toWei('0.05')
            });
            // IDQTokenをミントする。
            await myToken.mint(factory.address, 10000, {
                from: owners[0],
                gas: 5000000
            });

            const actual = await myToken.totalSupply();
            const balance = await myToken.balanceOf(factory.address);
            // check totalsupply & balance
            assert.equal(actual, 10000, "totalSupply should match");
            assert.equal(balance, 10000, "balance should match");
        });

        it("transfer IDQToken", async() => {
            // IDQTokenをミントする。
            await myToken.mint(factory.address, 10000, {
                from: owners[0],
                gas: 5000000
            });
            // approveを実行する。
            // await myToken.approve(factory.address, "10000", {from: owners[0]});
            // トークンを移転する。
            await factory.transferIDQToken(myToken.address, "4000", {
                from: owners[0],
                gas: 50000
            });
            // get token balance
            const balance1 = await myToken.balanceOf(owners[0]);
            const balance2 = await myToken.balanceOf(factory.address);
            // check
            assert.equal(balance1, 4000, "balance should match");
            assert.equal(balance2, 6000, "balance should match");
        });
    });
});

