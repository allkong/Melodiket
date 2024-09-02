const { ethers } = require("hardhat");

async function main() {
//   const contractAddress = "0x5FB420359a239f6a92145164D1f5198Fd2002111"; // sepolia 배포된 계약 주소
  const contractAddress = "0x5FB420359a239f6a92145164D1f5198Fd2002111"; // ssafy 배포된 계약 주소
  const Storage = await ethers.getContractFactory("Storage");

  // 이미 배포된 계약에 연결
  const storage = await Storage.attach(contractAddress);

  // 계약에서 값을 설정합니다.
  const tx = await storage.store(42);
  await tx.wait(); // 트랜잭션이 블록에 포함될 때까지 기다림

  // 계약에서 값을 가져옵니다.
  const value = await storage.retrieve();
  console.log("Stored value is:", value.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
