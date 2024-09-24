const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConcertManager", function () {
  let MelodyToken, melodyToken, TicketNFT, ticketNFT, ConcertManager, concertManager;
  let owner, addr1, addr2, addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // MelodyToken 배포
    MelodyToken = await ethers.getContractFactory("MelodyToken");
    melodyToken = await MelodyToken.deploy(ethers.parseEther("1000000"), owner.address);

    // TicketNFT 배포
    TicketNFT = await ethers.getContractFactory("TicketNFT");
    ticketNFT = await TicketNFT.deploy(owner.address);

    // ConcertManager 배포
    ConcertManager = await ethers.getContractFactory("ConcertManager");
    concertManager = await ConcertManager.deploy(melodyToken.target, ticketNFT.target, owner.address);
  });

  it("Should create a new concert", async function () {
    await concertManager.createConcert(
      ethers.parseEther("100"), // 티켓 가격
      ethers.parseEther("2"),  // 공연장 수익
      ethers.parseEther("5"),  // 뮤지션 수익
      [addr1.address, addr2.address] // 뮤지션 주소들
    );

    const concert = await concertManager.concerts(1);
    expect(concert.isActive).to.be.true;
  });

  it("Should allow musicians to agree to concert", async function () {
    await concertManager.createConcert(
      ethers.parseEther("100"),
      ethers.parseEther("2"),
      ethers.parseEther("5"),
      [addr1.address]
    );

    await concertManager.connect(addr1).agreeToConcert(1);
    const concert = await concertManager.concerts(1);
    expect(concert.allMusiciansAgreed).to.be.true;
  });

  it("Should allow ticket purchase and vote for favorite musician", async function () {
    console.log(addr1);
    await concertManager.createConcert(
      ethers.parseEther("100"),
      ethers.parseEther("2"),
      ethers.parseEther("5"),
      [addr1.address]
    );
    await concertManager.connect(addr1).agreeToConcert(1);

    // addr3이 MelodyToken 구매 및 트랜스퍼를 위해 토큰 할당
    await melodyToken.transfer(addr3.address, ethers.parseEther("100"));
    await melodyToken.connect(addr3).approve(concertManager.address, ethers.parseEther("100"));

    await concertManager.connect(addr3).purchaseTicket(1, addr1.address);
    const concert = await concertManager.concerts(1);
    expect(concert.totalTicketsSold).to.equal(1);
  });

  it("Should distribute earnings to manager and musicians", async function () {
    await concertManager.createConcert(
      ethers.parseEther("100"),
      ethers.parseEther("2"),
      ethers.parseEther("5"),
      [addr1.address, addr2.address]
    );
    await concertManager.connect(addr1).agreeToConcert(1);
    await concertManager.connect(addr2).agreeToConcert(1);

    await melodyToken.transfer(addr3.address, ethers.parseEther("100"));
    await melodyToken.connect(addr3).approve(concertManager.address, ethers.parseEther("10"));
    await concertManager.connect(addr3).purchaseTicket(1, addr1.address);

    await concertManager.closeConcert(1);
    const managerBalance = await melodyToken.balanceOf(owner.address);
    expect(managerBalance).to.equal(ethers.parseEther("2")); // 공연장 수익

    const musician1Earnings = await concertManager.concerts(1);
    expect(musician1Earnings.musicians[0].earnings).to.be.above(0);
  });
});
