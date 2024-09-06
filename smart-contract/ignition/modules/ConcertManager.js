const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ConcertManager", (m) => {
  const deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  // ConcertManager 배포
  const concertManager = m.contract("ConcertManager", 
    ["0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", //멜로디토큰
      "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707" , // 티켓 NFT
       deployer]);

  return { concertManager };// , ticketNFT, concertManager };
});
