const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const { Web3 } = require('web3');
const erc20Abi = require('erc-20-abi')

const yubAbi = require(path.resolve(__dirname, 'artifacts', 'contracts', 'YUB.sol', 'YubToken.json')).abi;

const web3 = new Web3('https://rpc.ssafy-blockchain.com');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const yubContractAddress = "0xdb8b0f5084Adea7eF859a9D2c0D14a3FD2e59190";

const contract = new web3.eth.Contract(yubAbi, yubContractAddress);

// contract.methods.balanceOf(walletAddress).call().then(console.log);
// contract.methods.transfer("0xFF0677054aBd846B133cd53ED706b89E0892E360", 1).then(console.log);

async function transferTokens(fromAddress, toAddress, amount) {
    const tx = {
        from: fromAddress,
        to: yubContractAddress,
        gas: 100000,
        gasPrice: 0,
        data: contract.methods.transfer(toAddress, amount).encodeABI()
    }

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    // Return transfer is successful
    return web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .then(receipt => {
            return Promise.resolve(receipt);
        })
        .catch(error => {
            const errorData = error.data;
            const decodedError = web3.eth.abi.decodeParameter('string', errorData);
            throw new Error(decodedError)
        })
}

// contract.methods.transfer("0xFF0677054aBd846B133cd53ED706b89E0892E360", 1).call().then(console.log);

transferTokens(WALLET_ADDRESS, "0xFF0677054aBd846B133cd53ED706b89E0892E360", 1)
    .then(async (receipt) => {
        const balance = await contract.methods.balanceOf(WALLET_ADDRESS).call();
        console.log(balance);
    });

// contract.methods.balanceOf(WALLET_ADDRESS).call()
// .then(console.log);


// 잔액 확인

// const errorData = "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002545524332303a207472616e736665722066726f6d20746865207a65726f2061646472657373000000000000000000000000000000000000000000000000000000";
// const decodedError = web3.eth.abi.decodeParameter('string', errorData.slice(10));
// console.log(WALLET_ADDRESS);

// console.log(contract.methods);

