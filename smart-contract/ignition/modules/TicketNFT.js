const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TicketNFT", (m) => {
  // TicketNFT 배포
  const ticketNFT = m.contract("TicketNFT", ["0x066b74Fc73bfaf0C266b0269F91dDeeB5aAB6998"]);

  return { ticketNFT }; // , ticketNFT, concertManager };
});
