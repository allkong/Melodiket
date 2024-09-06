const { ethers } = require('hardhat');

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);

    const Token = await ethers.getContractFactory('YUBToken');
    const token = await Token.deploy(10000000);

    console.log('Token deployed to:', token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
