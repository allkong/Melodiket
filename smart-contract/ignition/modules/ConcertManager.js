const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ConcertManager", (m) => {
  const deployer = "0x6009560432b36eFC5E0F649B62a7783e4ecD0B03";

  // ConcertManager 배포
  const concertManager = m.contract("ConcertManager", 
    ["0xdA46A09167EbcE0bc27847eaD2Ebc31cF060F71E", //멜로디토큰
      "0xb01BCdD0Fa0Ca96Cdc4bf368dc09f1a0DB58dA09" // 티켓 NFT
    ]);

  return { concertManager };// , ticketNFT, concertManager };
});
