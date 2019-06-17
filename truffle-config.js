require('dotenv').config();
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = process.env.MNEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 1000,
      gas: 4612388,
      gasPrice: 25000000000,
      total_accounts: 20,
      mnemonic
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/118f1f44a28c478baf0efad23ceaab5f")
      },
      network_id: 4
    },
  },
  solc: {
    optimizer: {
        enabled: true,
        runs: 200
    }
  }
};