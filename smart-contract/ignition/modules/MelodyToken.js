const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat"); // Hardhat 환경에서 ethers 가져오기

module.exports = buildModule("MelodyToken", (m) => {
  const deployer = "0x6009560432b36eFC5E0F649B62a7783e4ecD0B03";
  // MelodyToken 배포
  const melodyToken = m.contract("MelodyToken", [1000000, deployer]);

  // // TicketNFT 배포
  // const ticketNFT = m.contract("TicketNFT", {
  //   args: [deployer], // 소유자 주소
  // });

  // // ConcertManager 배포
  // const concertManager = m.contract("ConcertManager", {
  //   args: [melodyToken.address, ticketNFT.address, deployer], // MelodyToken, TicketNFT, 소유자 주소
  // });

  return { melodyToken };// , ticketNFT, concertManager };
});
