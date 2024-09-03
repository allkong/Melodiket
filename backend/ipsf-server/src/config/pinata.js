import { config } from 'dotenv';
config();

const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT, PINATA_GATEWAY } = process.env;
export default {
    apiKey: PINATA_API_KEY,
    apiSecret: PINATA_API_SECRET,
    jwt: PINATA_JWT,
    gateway: PINATA_GATEWAY,
}