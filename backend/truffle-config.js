require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const HDWalletProvider2 = require("@truffle/hdwallet-provider");

const {
  ETH_NODE_ADDRESS,
  ETH_NODE_USER,
  ETH_NODE_PASSWORD,
  ETH_FROM_ADDRESS,
  HD_MNEMONIC,
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_MUNBAI_APIKEY,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  BSCSCAN_API_KEY,
  SNOWTRACE_API_KEY,
} = process.env;

/**
 * get provider function from HD
 */
 function getHDGoreliProvider() {
  return new HDWalletProvider(
    HD_MNEMONIC,
    "https://eth-goerli.g.alchemy.com/v2/" + ALCHEMY_GOERLI_API_KEY
  );
}

/**
 * get provider function from HD
 */
 function getHDMumbaiProvider() {
  return new HDWalletProvider(
    HD_MNEMONIC,
    "https://polygon-mumbai.g.alchemy.com/v2/" + ALCHEMY_MUNBAI_APIKEY
  );
}

module.exports = {
  // bulid path for ABI json files
  contracts_build_directory: path.join(__dirname, "./../blocto/src/assets/contracts"),
  //  plugin
  plugins: [
    'truffle-plugin-verify'
  ],
  // config for API
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
    polygonscan: POLYGONSCAN_API_KEY,
    bscscan: BSCSCAN_API_KEY,
    snowtrace: SNOWTRACE_API_KEY,
  },
  networks: {
    goreli: {
      provider: getHDGoreliProvider,
      network_id: 5,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mumbai: {
      provider: getHDMumbaiProvider,
      network_id: 80001,
      // gas: 500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsctest: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    fuji: {
      provider: () => new HDWalletProvider2(HD_MNEMONIC, `https://api.avax-test.network/ext/bc/C/rpc`),
      network_id: 43113,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  mocha: {

  },
  compilers: {
    solc: {
      version: "0.8.9",    
      // docker: true,        
        settings: {          
          optimizer: {
            enabled: false,
            runs: 200
          },
      //  evmVersion: "byzantium"
        }
    }
  },
};
