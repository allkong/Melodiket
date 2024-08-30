import express from 'express';

import ipfsRouter from './router/ipfs.js';

const app = express();

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

app.use('/ipfs', ipfsRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});