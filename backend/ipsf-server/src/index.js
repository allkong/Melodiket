import express from 'express';

import { testFunction } from './service/pinata.js';

const app = express();

app.get('/', async (req, res) => {
    await testFunction();
    res.send('Hello World!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});