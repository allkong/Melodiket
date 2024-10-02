require('dotenv').config(); // 환경 변수 로드
const { Web3 } = require('web3');
const net = require('net');
const fs = require('fs').promises;
const path = require('path');

// 환경 변수에서 설정 로드
const ethereumNodeUrl = process.env.ETHEREUM_NODE_URL;
const logstashHost = process.env.LOGSTASH_HOST;
const logstashPort = parseInt(process.env.LOGSTASH_PORT, 10);

// Logstash로 이벤트를 전송하는 함수
function sendEventToLogstash(eventData) {
    const client = new net.Socket();
    client.connect(logstashPort, logstashHost, () => {
        client.write(JSON.stringify(eventData) + '\n');
        client.end();
    });

    client.on('error', (err) => {
        console.error('Error connecting to Logstash:', err);
    });
}

// 마지막 블록 ID를 저장할 파일 경로 생성 함수
function getBlockFilePath(contractAddress, eventName) {
    return path.join(__dirname, `${contractAddress}_${eventName}_last_block.txt`);
}

// 마지막 블록 ID 읽기
async function getLastBlockId(contractAddress, eventName) {
    const blockFilePath = getBlockFilePath(contractAddress, eventName);
    try {
        const exists = await fs.access(blockFilePath).then(() => true).catch(() => false);
        if (exists) {
            const lastBlockId = await fs.readFile(blockFilePath, 'utf8');
            return parseInt(lastBlockId, 10);
        }
    } catch (err) {
        console.error(`Error reading last block ID for ${contractAddress} - ${eventName}:`, err);
    }
    return 0; // 기본값으로 0 반환
}

// 마지막 블록 ID 저장
async function saveLastBlockId(contractAddress, eventName, blockId) {
    const blockFilePath = getBlockFilePath(contractAddress, eventName);
    try {
        const _blockId = Number(blockId) + 1;
        await fs.writeFile(blockFilePath, _blockId.toString(), 'utf8');
    } catch (err) {
        console.error(`Error saving last block ID for ${contractAddress} - ${eventName}:`, err);
    }
}

// 이더리움 이벤트를 폴링하여 Logstash로 전송하는 함수
async function pollEvents(contract, contractAddress, eventName) {
    try {
        const fromBlock = await getLastBlockId(contractAddress, eventName);
        console.log(`Polling ${eventName} events for contract ${contractAddress} from block: ${fromBlock}`);

        // 'latest' 블록까지의 이벤트 가져오기
        const events = await contract.getPastEvents(eventName, {
            fromBlock: fromBlock,
            toBlock: 'latest'
        });

        // 가져온 이벤트 처리
        for (const event of events) {
            console.log(`Event received from ${contractAddress}: ${event}`);

            const blockId = event.blockNumber;
            const eventData = {
                contractAddress: contractAddress,
                batchId: Number(blockId),
                transactionHash: event.transactionHash,
                blockHeight: Number(blockId),
                eventName: event.event,
                timestamp: new Date().toISOString()
            };

            // Logstash로 이벤트 전송
            sendEventToLogstash(eventData);

            // 블록 ID 저장
            await saveLastBlockId(contractAddress, eventName, blockId);
        }
    } catch (error) {
        console.error(`Error polling ${eventName} events for ${contractAddress}:`, error);
    }

    // 주기적으로 이벤트를 폴링 (예: 10초마다)
    setTimeout(() => pollEvents(contract, contractAddress, eventName), 10000);
}

// 이벤트 폴링 시작 함수
async function startEventPolling(contracts) {
    // 이더리움 노드에 HTTP 연결
    const web3 = new Web3(ethereumNodeUrl);

    for (const { address, abiPath, events } of contracts) {
        // ABI 파일 로드
        let contractABI;
        try {
            const abiFileContent = await fs.readFile(path.resolve(abiPath), 'utf8');
            contractABI = JSON.parse(abiFileContent).abi;
            console.log(`ABI loaded successfully for contract ${address}.`);
        } catch (error) {
            console.error(`Error reading ABI file for contract ${address}:`, error);
            continue;
        }

        // 스마트 컨트랙트 설정
        let contract;
        try {
            contract = new web3.eth.Contract(contractABI, address);
            console.log(`Contract instance created successfully for ${address}.`);
        } catch (error) {
            console.error(`Error creating contract instance for ${address}:`, error);
            continue;
        }

        // 지정된 이벤트에 대해 폴링 시작
        events.forEach(eventName => {
            pollEvents(contract, address, eventName);
        });
    }
}

// 모듈화된 이벤트 폴링 시작 (다양한 컨트랙트와 이벤트를 배열로 전달)
startEventPolling([
    {
        address: process.env.CONTRACT_ADDRESS,
        abiPath: process.env.CONTRACT_ABI_PATH,
        events: ['ConcertCreated']
    },
    // {
    //     address: process.env.CONTRACT_ADDRESS_2,
    //     abiPath: process.env.CONTRACT_ABI_PATH_2,
    //     events: ['SomeOtherEvent', 'AnotherEventName2']
    // }
]);
