const { ethers } = require("hardhat");

async function main() {
  const ticketNFTAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // TicketNFT 배포 주소

  // TicketNFT 스마트 계약 가져오기
  const TicketNFT = await ethers.getContractFactory("TicketNFT");

  // 이미 배포된 TicketNFT 계약에 연결
  const ticketNFT = await TicketNFT.attach(ticketNFTAddress);

  const [owner, addr1, addr2] = await ethers.getSigners();

  // Owner가 addr1에게 티켓 발행
  const mintTx = await ticketNFT.mintTicket(addr1.address);
  await mintTx.wait();

  // addr1이 addr2에게 티켓 전송
  const transferTx = await ticketNFT.connect(addr1)["safeTransferFrom(address,address,uint256)"](addr1.address, addr2.address, 2);
  await transferTx.wait();

  // 티켓 소유권 확인
  console.log("Owner of ticket 1:", await ticketNFT.ownerOf(1));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
