/**
 * ======================================================================
 * The Test Code for MulitSigWallet Contract + MyToken Contract
 * ======================================================================
 */

const truffleAssert = require("truffle-assertions");
const WalletFactory = artifacts.require("WalletFactory");
const MultiSigWallet = artifacts.require("MultiSigWallet");
const MyToken = artifacts.require("MyToken");

/**
 * test
 */
contract ("MultiSigWallet & MyToken Contract tests!!", accounts => {

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
     * テスト実行前の準備　
     */
    beforeEach (async () => {
        // factoryコントラクトインスタンスを生成
        factory = await WalletFactory.new();
        // MyTokenコントラクトのインスタンスを生成
        myToken = await MyToken.new("IDQToken", "IDQ", {
            from: accounts[0],
            gas: 5000000
        });
    });

    /**
     * init test
     */
    describe ("init test", async() => {
        it("check myToken Owner", async () => {
            // ownerの権限をfactoryに移籍させる。
            await myToken.transferOwnership(factory.address, {
                from: accounts[0],
                gas: 5000000
            });

            // get owner address 
            var ownerAddress = await myToken.owner();
            // check owner address
            assert.equal(ownerAddress, factory.address, "owner address must be match!!");
        });
    });
});