import pinataConfig from '../config/pinata.js'

import { PinataSDK } from 'pinata';

import { isPinnedInLocal, getLocalPinnedData } from '../service/local-ipfs.js'

const pinata = new PinataSDK({
    pinataJwt: pinataConfig.jwt,
    pinataGateway: pinataConfig.gateway,
})

export async function uploadAndPin(file) {
    try {
        const uploadingFile = new File([file.buffer], file.originalname, { type: file.mimetype });
        const uploadResult = await pinata.upload.file(uploadingFile);
        return uploadResult;
    } catch (error) {
        console.log(error);
    }
}

export async function getPinnedData(hash) {
    if (await isPinnedInLocal(hash)) {
        console.log("Pinned in local");
        const data = await getLocalPinnedData(hash);
        return data;
    }
    console.log("Not pinned in local");
    try {
        const pinnedData = await pinata.gateways.get(hash);
        return pinnedData;
    } catch (error) {
        console.log(error);
    }
}

export async function testFunction() {
    console.log(await pinata.listFiles());
}