const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id,
      gas: 4612388,
      gasPrice: 25000000000
    }
  },
  solc: {
    optimizer: {
        enabled: true,
        runs: 200
    }
  }
};
