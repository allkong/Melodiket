import { create as createIpfsHttpClient } from 'ipfs-http-client';
import mime from 'mime';

const MAX_STORAGE_SIZE = 1 * 1024 * 1024 * 1024; // 1GB

const ipfs = createIpfsHttpClient({
    host: 'localhost',
    port: 5001,
    protocol: 'http'
})

export async function pinToLocal(ipfsHash) {
    await ipfs.pin.add(ipfsHash);
    managePinnedDataStorage();
}

export async function getLocalPinnedData(ipfsHash) {
    const response = ipfs.get(ipfsHash);
    const chunks = [];

    for await (const file of response) {
        chunks.push(file);
    }

    // Concatenate all Uint8Array chunks into a single Uint8Array
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }

    return result;
}

export async function isPinnedInLocal(ipfsHash) {
    for await (const file of ipfs.pin.ls()) {
        if (file.cid.toString() === ipfsHash) {
            return true;
        }
    }

    return false;
}

export async function calculateTotalPinnedSize() {
    const pinnedFiles = await ipfs.pin.ls();
    let totalSize = 0;

    for await (const file of pinnedFiles) {
        const stat = await ipfs.files.stat(`/ipfs/${file.cid}`);
        totalSize += stat.cumulativeSize;
    }

    return totalSize;
};

export async function unpinOldestDataFromLocal() {
    const pinnedFiles = [];
    for await (const file of ipfs.pin.ls()) {
        pinnedFiles.push(file);
    }

    // 가장 먼저 pin된 데이터 찾기
    const oldestFile = pinnedFiles.reduce((oldest, file) => {
        return oldest.timestamp < file.timestamp ? oldest : file;
    });

    // pin 해제
    await ipfs.pin.rm(oldestFile.cid);
    return oldestFile.size;
};

export async function managePinnedDataStorage() {
    let totalPinnedSize = await calculateTotalPinnedSize();
    while (totalPinnedSize > MAX_STORAGE_SIZE) {
        totalPinnedSize -= await unpinOldestDataFromLocal();
    }
};


export async function getFileMimetype(data) {
    const type = mime.getType(data);
    return type;
}