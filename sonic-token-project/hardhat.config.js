require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.18",
  networks: {
    somnia: {
      url: process.env.SOMNIA_RPC,
      chainId: 14601,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      timeout: 60000  // ⏳ set timeout to 60 seconds
    },
    sonic: {
      url: process.env.SOMNIA_RPC,
      chainId: 14601,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      timeout: 60000  // ⏳ set timeout to 60 seconds
    }
  }
};
