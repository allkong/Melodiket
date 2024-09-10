require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // .env 파일을 로드합니다.

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24", // Solidity 버전
    settings: {
      evmVersion: "london" // EVM 버전을 london으로 설정
    },
  },
  networks: {
    localhost: {
      url: process.env.LOCALHOST_URL, // .env 파일의 LOCALHOST_URL을 사용합니다.
    },
    sepolia: {
      url: process.env.SEPOLIA_URL, // .env 파일의 SEPOLIA_URL을 사용합니다.
      accounts: [`0x${process.env.PRIVATE_KEY}`], // .env 파일의 PRIVATE_KEY를 사용하여 계정 설정
    },
    ssafy: {
      url:process.env.SSAFY_URL,
      // chainId: process.env.CHAIN_ID * 1,
      accounts: [
        `0x${process.env.PRIVATE_KEY}`,
        '0x33f18f2fe94a3d5240db1cffc4f18e03529ccc0df7ba80990d0f705bd74453b7',
        '0x01e135fe8ed2bc906f5b69e585307ffbdd691193e4f02e0fdad3143305aab99b'
      ], // .env 파일의 PRIVATE_KEY를 사용하여 계정 설정
      gasPrice: 0, // 가스 가격을 0으로 설정하여 가스비가 발생하지 않도록 합니다.
      gas: 1500000, // 가스 한도를 자동으로 설정하도록 합니다.
      timeout:1000000000000000
    }
  },etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,  // .env 파일에 저장된 Etherscan API 키를 사용합니다.
  },
};
