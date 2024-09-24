const { ethers } = require("hardhat");

async function main() {
  const concertManagerAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // ConcertManager 배포 주소

  // ConcertManager 스마트 계약 가져오기
  const ConcertManager = await ethers.getContractFactory("ConcertManager");

  // 이미 배포된 ConcertManager 계약에 연결
  const concertManager = await ConcertManager.attach(concertManagerAddress);

  const [owner, addr1, addr2, addr3] = await ethers.getSigners();

  // 콘서트 종료 (owner가 관리자)
  const closeConcertTx = await concertManager.closeConcert(1);
  await closeConcertTx.wait();

  // addr1이 수익 출금
  const withdrawEarningsTx = await concertManager.connect(addr1).withdrawEarnings(1);
  await withdrawEarningsTx.wait();

  console.log("Earnings withdrawn by musician 1");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
