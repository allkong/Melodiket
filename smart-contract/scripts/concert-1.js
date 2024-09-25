const { ethers } = require("hardhat");

async function main() {
  const concertManagerAddress = "0xe5184C0867cd04964Da7184845564Be0F99e7458"; // ConcertManager 배포 주소

  // ConcertManager 스마트 계약 가져오기
  const ConcertManager = await ethers.getContractFactory("ConcertManager");

  // 이미 배포된 ConcertManager 계약에 연결
  const concertManager = await ConcertManager.attach(concertManagerAddress);

  const [owner, addr1, addr2] = await ethers.getSigners();

  // 콘서트 생성 (owner가 주최자, addr1과 addr2가 뮤지션)
  const createConcertTx = await concertManager.connect(owner).createConcert(
    100, // 티켓 가격
    10,    // 공연장 수익
    20,    // 뮤지션 수익
    [addr1.address]
  );
  const receipt = await createConcertTx.wait();

  // const mTx = await melodyToken.connect(owner).addConcertManager(owner);
  // mTx.wait();
  
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
  // await concertManager.connect(addr2).agreeToConcert(concertId);
  console.log("뮤지션이 콘서트에 동의 완료");
  
  
  // console.log("addr3에 100 MLDY 할당 및 티켓 구매1");
  
  const melodyTokenAddress = "0xdA46A09167EbcE0bc27847eaD2Ebc31cF060F71E"; // MelodyToken 주소
  const MelodyToken = await ethers.getContractFactory("MelodyToken");
  const melodyToken = await MelodyToken.attach(melodyTokenAddress);
  
  // addr3가 concertManager에 대해 100 MLDY 허용
  const approveTx = await melodyToken.connect(addr2).approve(concertManagerAddress, 100);
  await approveTx.wait();  // 트랜잭션 완료 대기

  // 허용량 확인 (optional)
  const allowance = await melodyToken.allowance(addr2.address, concertManagerAddress);
  console.log("Allowance:", allowance);

  const balance = await melodyToken.balanceOf(addr2.address);
  console.log("Balance of addr3:", balance);

  // 티켓 구매
  const purchaseTicketTx = await concertManager.connect(addr2).purchaseTicket(concertId, addr1.address);
  await purchaseTicketTx.wait();
  console.log("Ticket purchased successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
