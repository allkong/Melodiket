import pinataConfig from '../config/pinata.js'

import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
    pinataJwt: pinataConfig.jwt,
    pinataGateway: pinataConfig.gateway,
})

export async function testFunction() {
    try {
        const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
        const upload = await pinata.upload.file(file);
        console.log(upload);
    } catch (error) {
        console.log(error);
    }
}