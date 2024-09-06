const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TicketNFT", (m) => {

  // TicketNFT 배포
  const ticketNFT = m.contract("TicketNFT", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);

  return { ticketNFT };// , ticketNFT, concertManager };
});
