import { config } from 'dotenv';
config();

const { IPFS_HOST, IPFS_PORT } = process.env;
export default {
    host: IPFS_HOST,
    port: IPFS_PORT
}