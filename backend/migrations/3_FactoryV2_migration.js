const WalletFactoryV2 = artifacts.require("WalletFactoryV2");

module.exports = function (deployer) {
  deployer.deploy(WalletFactoryV2);
};
