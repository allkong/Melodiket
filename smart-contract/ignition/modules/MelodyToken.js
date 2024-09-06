const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat"); // Hardhat 환경에서 ethers 가져오기

module.exports = buildModule("MelodyToken", (m) => {
  const parseEther = ethers.parseEther; // ethers.utils에서 parseEther 가져오기
  const deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  // MelodyToken 배포
  const melodyToken = m.contract("MelodyToken", [parseEther("1000000"), deployer]);

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
