const { ethers } = require("hardhat");

async function main() {
  const concertManagerAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // ConcertManager 배포 주소

  // ConcertManager 스마트 계약 가져오기
  const ConcertManager = await ethers.getContractFactory("ConcertManager");

  // 이미 배포된 ConcertManager 계약에 연결
  const concertManager = await ConcertManager.attach(concertManagerAddress);

  const [owner, addr1, addr2, addr3] = await ethers.getSigners();

  // 콘서트 생성 (owner가 주최자, addr1과 addr2가 뮤지션)
  const createConcertTx = await concertManager.connect(owner).createConcert(
    ethers.parseEther("100"), // 티켓 가격
    ethers.parseEther("2"),    // 공연장 수익
    ethers.parseEther("5"),    // 뮤지션 수익
    [addr1.address, addr2.address]
  );
  const receipt = await createConcertTx.wait();

  // 이벤트 필터 설정
  const filter = concertManager.filters.ConcertCreated();
  let concertId = -1;
  // 이벤트 가져오기
  const events = await concertManager.queryFilter(filter);
  if (events.length > 0) {
    concertId = events.length;
    console.log(`Concert created with ID: ${events}`);
  } else {
    console.error("ConcertCreated 이벤트를 찾을 수 없습니다.");
  }

  // 뮤지션이 콘서트에 동의
  await concertManager.connect(addr1).agreeToConcert(concertId);
  await concertManager.connect(addr2).agreeToConcert(concertId);
  console.log("뮤지션이 콘서트에 동의 완료");

  // addr3에 100 MLDY 할당 및 티켓 구매
  // const melodyTokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // MelodyToken 주소
  // const MelodyToken = await ethers.getContractFactory("MelodyToken");
  // const melodyToken = await MelodyToken.attach(melodyTokenAddress);
  // console.log("addr3에 100 MLDY 할당 및 티켓 구매1");

  // addr3에 100 MLDY 할당 및 티켓 구매
  // await melodyToken.connect(addr3).approve(concertManagerAddress, ethers.parseEther("100"));
  // console.log("addr3에 100 MLDY 할당 및 티켓 구매2");

  // addr3이 티켓 구매 및 addr1을 최애 뮤지션으로 투표
  const purchaseTicketTx = await concertManager.connect(addr3).purchaseTicket(concertId, addr1.address);
  await purchaseTicketTx.wait();

  console.log("Ticket purchased successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
