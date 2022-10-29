const WalletFactoryV3 = artifacts.require("WalletFactoryV3");

module.exports = function (deployer) {
  deployer.deploy(WalletFactoryV3);
};
