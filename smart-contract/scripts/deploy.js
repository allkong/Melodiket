const hre = require("hardhat");

async function main() {
  // 배포자 계정 가져오기
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // MelodyToken 배포
  const MelodyToken = await hre.ethers.getContractFactory("MelodyToken");
  const melodyToken = await MelodyToken.deploy(
    hre.ethers.parseEther("1000000"), // 초기 공급량 설정 (예: 100만 MLDY)
    deployer.address // 소유자 주소 설정
  );
  
  // 트랜잭션이 완료될 때까지 대기
  await melodyToken.deployTransaction.wait(); 
  console.log("MelodyToken deployed to:", melodyToken.address);

  // TicketNFT 배포
  const TicketNFT = await hre.ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy(deployer.address); // 소유자 주소 설정
  await ticketNFT.deployTransaction.wait(); // 트랜잭션 완료 대기
  console.log("TicketNFT deployed to:", ticketNFT.address);

  // ConcertManager 배포
  const ConcertManager = await hre.ethers.getContractFactory("ConcertManager");
  const concertManager = await ConcertManager.deploy(
    melodyToken.address, // MelodyToken 주소
    ticketNFT.address,   // TicketNFT 주소
    deployer.address     // 소유자 주소 설정
  );
  await concertManager.deployTransaction.wait(); // 트랜잭션 완료 대기
  console.log("ConcertManager deployed to:", concertManager.address);
}

// 이 메인 함수가 실행되고 나서 에러가 발생하면 프로세스를 종료합니다.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
