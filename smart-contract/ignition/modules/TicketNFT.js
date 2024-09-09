const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TicketNFT", (m) => {

  // TicketNFT 배포
  const ticketNFT = m.contract("TicketNFT", ["0x6009560432b36eFC5E0F649B62a7783e4ecD0B03"]);

  return { ticketNFT };// , ticketNFT, concertManager };
});
