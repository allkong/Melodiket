const solc = require('solc');
const fs = require('fs');
const path = require('path');

const fileName = 'YUB.sol';


// Load contract source
const source = fs.readFileSync(path.resolve(__dirname, '..', 'contracts', fileName), 'utf8');

// Compiler input with the source file
const input = {
    language: 'Solidity',
    sources: {
        'contract.sol': {
            content: source,
        },
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200
        },
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

// Compile contract
const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(compiledContract);

const contract = compiledContract;

console.log(contract);


// console.log(contract.abi);


// module.exports = {
//     abi: contract.abi,
//     evm: contract.evm.bytecode.object,
// };
