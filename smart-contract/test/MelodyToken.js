const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MelodyToken", function () {
  let MelodyToken, melodyToken, owner, addr1;

  beforeEach(async function () {
    MelodyToken = await ethers.getContractFactory("MelodyToken");
    [owner, addr1] = await ethers.getSigners();
    melodyToken = await MelodyToken.deploy(ethers.parseEther("1000000"), owner.address);
  });

  it("Should deploy with initial supply to owner", async function () {
    const ownerBalance = await melodyToken.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.parseEther("1000000"));
  });

  it("Should allow owner to mint tokens", async function () {
    await melodyToken.mint(addr1.address, ethers.parseEther("500"));
    const addr1Balance = await melodyToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.parseEther("500"));
  });

  it("Should not allow non-owner to mint tokens", async function () {
    await expect(melodyToken.connect(addr1).mint(addr1.address, ethers.parseEther("500")))
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow users to burn their tokens", async function () {
    await melodyToken.connect(owner).burn(ethers.parseEther("500"));
    const ownerBalance = await melodyToken.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.parseEther("999500"));
  });
});
