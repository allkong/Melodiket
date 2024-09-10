const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT", function () {
  let TicketNFT, ticketNFT, owner, addr1;

  beforeEach(async function () {
    TicketNFT = await ethers.getContractFactory("TicketNFT");
    [owner, addr1] = await ethers.getSigners();
    ticketNFT = await TicketNFT.deploy(owner.address);
  });

  it("Should mint a new ticket for the owner", async function () {
    const ticketId = await ticketNFT.mintTicket(addr1.address);
    expect(await ticketNFT.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should not allow non-owner to mint tickets", async function () {
    await expect(ticketNFT.connect(addr1).mintTicket(addr1.address)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
