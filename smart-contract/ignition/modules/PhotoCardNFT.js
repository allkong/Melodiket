const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PhotoCardNFT", (m) => {
  // PhotoCardNFT 배포
  const photoCardNFT = m.contract("PhotoCardNFT", ["0x6009560432b36eFC5E0F649B62a7783e4ecD0B03"]);

  return { photoCardNFT }; // , ticketNFT, concertManager };
});
