require('dotenv').config(); // 환경 변수 로드
const { Web3 } = require('web3');
const net = require('net');
const fs = require('fs').promises;
const path = require('path');

// 환경 변수에서 설정 로드
const ethereumNodeUrl = process.env.ETHEREUM_NODE_WS_URL; // 웹소켓 URL
const logstashHost = process.env.LOGSTASH_HOST;
const logstashPort = parseInt(process.env.LOGSTASH_PORT, 10);

// 마지막 블록 ID를 저장할 파일 경로 생성 함수
function getBlockFilePath(contractAddress) {
    return path.join(__dirname, 'lastBlock', `${contractAddress}_last_block.txt`);
}

// 마지막 블록 ID 읽기
async function getLastBlockId(contractAddress) {
    const blockFilePath = getBlockFilePath(contractAddress);
    try {
        const exists = await fs.access(blockFilePath).then(() => true).catch(() => false);
        if (exists) {
            const lastBlockId = await fs.readFile(blockFilePath, 'utf8');
            return parseInt(lastBlockId, 10);
        }
    } catch (err) {
        console.error(`Error reading last block ID for ${contractAddress}:`, err);
    }
    return 'earliest'; // 파일이 없을 경우 'earliest'를 반환
}

// 마지막 블록 ID 저장
async function saveLastBlockId(contractAddress, blockId) {
    const blockFilePath = getBlockFilePath(contractAddress);
    try {
        await fs.mkdir(path.dirname(blockFilePath), { recursive: true }); // 디렉토리 생성 (존재하지 않으면)
        await fs.writeFile(blockFilePath, blockId.toString(), 'utf8');
    } catch (err) {
        console.error(`Error saving last block ID for ${contractAddress}:`, err);
    }
}

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

// ABI에서 이벤트 추출
function extractEventsFromABI(abi) {
    return abi
        .filter(item => item.type === 'event') // 이벤트 타입 필터링
        .map(event => event.name); // 이벤트 이름만 추출
}

// 이더리움 이벤트를 웹소켓으로 구독하는 함수
async function subscribeToEvents(contract, contractAddress, eventName) {
    try {
        const fromBlock = await getLastBlockId(contractAddress);
        console.log(`Subscribing to ${eventName} events for contract ${contractAddress} from block: ${fromBlock}`);

        // 웹소켓을 통한 이벤트 구독
        const subscription = contract.events[eventName]({ fromBlock: fromBlock });
        
        subscription.on('data', async (event) => {
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
            await saveLastBlockId(contractAddress, blockId);
        });

        subscription.on('error', (error) => {
            console.error(`Error subscribing to ${eventName} events for ${contractAddress}:`, error);
        });

    } catch (error) {
        console.error(`Error subscribing to ${eventName} events for ${contractAddress}:`, error);
    }
}

// 이벤트 구독 시작 함수
async function startEventSubscription(contracts) {
    // 이더리움 노드에 WebSocket 연결
    const web3 = new Web3(new Web3.providers.WebsocketProvider(ethereumNodeUrl));

    for (const { address, abiPath } of contracts) {
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

        // ABI에서 이벤트 목록 추출
        const events = extractEventsFromABI(contractABI);
        console.log(`Extracted events for contract ${address}: ${events.join(', ')}`);

        // 추출한 이벤트에 대해 구독 시작
        events.forEach(eventName => {
            subscribeToEvents(contract, address, eventName);
        });
    }
}

// 모듈화된 이벤트 구독 시작 (다양한 컨트랙트의 주소와 ABI 경로를 배열로 전달)
startEventSubscription([
    {
        address: process.env.CONCERT_CONTRACT_ADDRESS,
        abiPath: process.env.CONCERT_CONTRACT_ABI_PATH
    },
    {
        address: process.env.TICKET_CONTRACT_ADDRESS,
        abiPath: process.env.TICKET_CONTRACT_ABI_PATH
    },
    {
        address: process.env.TOKEN_CONTRACT_ADDRESS,
        abiPath: process.env.TOKEN_CONTRACT_ABI_PATH
    }
]);
