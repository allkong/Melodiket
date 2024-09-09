const { ethers } = require("hardhat");
async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

    const melodyTokenAddress = "0xdA46A09167EbcE0bc27847eaD2Ebc31cF060F71E"; // MelodyToken 배포 주소
    const MelodyToken = (await ethers.getContractFactory("MelodyToken"));
    // const melodyToken = await MelodyToken.connect(owner).deploy(100000, owner.address); // initialSupply: 1000, 소유자: owner
    // (await melodyToken.waitForDeployment().then((x)=>{console.log(x.getAddress())}));
    const melodyToken = await MelodyToken.attach(melodyTokenAddress);
  
  
    // Owner가 addr1에게 1000 MLDY 발행
    const mintTx = await melodyToken.connect(owner).mint(addr1.address, 1000);
    await mintTx.wait();
  
    // addr1이 addr2에게 500 MLDY 전송
    const transferTx = await melodyToken.connect(addr1).transfer(addr2.address, 500);
    await transferTx.wait();
  
    // 잔액 확인
    console.log("Owner balance:", await melodyToken.balanceOf(owner.address));
    console.log("Addr1 balance:", await melodyToken.balanceOf(addr1.address));
    console.log("Addr3 balance:", await melodyToken.balanceOf(addr2.address));
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  