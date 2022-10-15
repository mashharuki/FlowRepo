require("dotenv").config();
const path = require("path");
const web3 = require("web3");
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
 * get provider function
 */
function getProvider() {
  return new web3.providers.HttpProvider(
    ETH_NODE_ADDRESS,
    10000,
    ETH_NODE_USER,
    ETH_NODE_PASSWORD
  );
}

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
    /*
    rinkeby_geth: {
      provider: getProvider,
      network_id: 4,
      from: ETH_FROM_ADDRESS,
      gas: 4500000, // 2M gas limit used for deploy
      gasPrice: 10000000000 // 10gwei
    },
    rinkeby_local: {
      provider: getHDProvider,
      network_id: 4,
      gas: 4500000, // 2M gas limit used for deploy
      gasPrice: 10000000000 // 10gwei
    },
    */
    live: {
      provider: getProvider,
      network_id: 1,
      from: ETH_FROM_ADDRESS,
      gas: 1000000, // 1M
      gasPrice: 5000000000 // 5 gwei
    },
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
    bsctestnet: {
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
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  mocha: {
    bail: true
  },
  compilers: {
    solc: {
      version: "0.5.10",
      settings: {
        evmVersion: "constantinople",
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
