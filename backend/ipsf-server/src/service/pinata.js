import pinataConfig from '../config/pinata.js'

import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
    pinataJwt: pinataConfig.jwt,
    pinataGateway: pinataConfig.gateway,
})

export async function uploadAndPin(file) {
    try {
        const uploadingFile = new File(file.buffer, file.originalname, { type: file.mimetype });
        const upload = await pinata.upload.file(uploadingFile);
        console.log(upload);
    } catch (error) {
        console.log(error);
    }
}