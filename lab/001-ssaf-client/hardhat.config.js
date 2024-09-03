const dotenv = require("dotenv");
dotenv.config();

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ssafy: {
      url: "https://rpc.ssafy-blockchain.com",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
