const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ConcertManager", (m) => {
  // ConcertManager 배포
  const concertManager = m.contract("ConcertManager", [
    "0x2Eda33b0E660ECDb6dfCCdA9c4b32c1459B2e6C7", //멜로디토큰
    "0xc976Db43728AfFd7753A8C6fD13869bBB37695Ff", // 티켓 NFT
  ]);

  return { concertManager }; // , ticketNFT, concertManager };
});
