const { ethers } = require("hardhat");
async function main() {
    const melodyTokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // MelodyToken 배포 주소
    const MelodyToken = await ethers.getContractFactory("MelodyToken");
    const melodyToken = await MelodyToken.attach(melodyTokenAddress);
  
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
  
    // Owner가 addr1에게 1000 MLDY 발행
    const mintTx = await melodyToken.mint(addr1.address, ethers.parseEther("1000"));
    await mintTx.wait();
  
    // addr1이 addr2에게 500 MLDY 전송
    const transferTx = await melodyToken.connect(addr1).transfer(addr3.address, ethers.parseEther("500"));
    await transferTx.wait();
  
    // 잔액 확인
    console.log("Owner balance:", ethers.formatEther(await melodyToken.balanceOf(owner.address)));
    console.log("Addr1 balance:", ethers.formatEther(await melodyToken.balanceOf(addr1.address)));
    console.log("Addr3 balance:", ethers.formatEther(await melodyToken.balanceOf(addr3.address)));
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  