import { create as createIpfsHttpClient } from 'ipfs-http-client';
import { PinataSDK } from 'pinata';

import localIpfsConfig from '../config/local-ipfs.js'
import pinataConfig from '../config/pinata.js'

const ipfsClient = createIpfsHttpClient({
    host: localIpfsConfig.host,
    port: localIpfsConfig.port,
    protocol: 'http'
})


const pinata = new PinataSDK({
    pinataJwt: pinataConfig.jwt,
    pinataGateway: pinataConfig.gateway,
    pinataGatewayKey: pinataConfig.apiSecret,
})

export function uploadAndGetCid(file) {
    const fileObj = {
        file: file.buffer.toString('base64'),
        originalname: file.originalname,
        mimetype: file.mimetype,
    }

    return pinata.upload.json(fileObj)
        .then(({IpfsHash}) => {
            return IpfsHash;
        });
}

export async function getByCid(cid) {
    // Local Pin 상태이면
    if (await isPinnedInLocal(cid)) {
        // 그대로 불러 읽어서 반환
        const data = await getLocalPinnedData(cid);
        let jsonString = Buffer.from(data).toString('utf8');
        const firstIndex = jsonString.indexOf('{');
        const lastIndex = jsonString.lastIndexOf('}');
        jsonString = jsonString.substring(firstIndex, lastIndex + 1);
        const parsedObject = JSON.parse(jsonString);
        return parsedObject;
    }
    // Local Pin 되어 있지 않으면 Pinata gateway에서 받아서 반환
    try {
        const pinnedData = await pinata.gateways.get(cid);
        // Local caching
        ipfsClient.pin.add(cid);
        return pinnedData.data;
    } catch (error) {
        console.log(error);
    }
}

async function isPinnedInLocal(ipfsHash) {
    for await (const file of ipfsClient.pin.ls()) {
        if (file.cid.toString() === ipfsHash) {
            return true;
        }
    }

    return false;
}

async function getLocalPinnedData(ipfsHash) {
    const response = ipfsClient.get(ipfsHash);
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


