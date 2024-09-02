import express from "express";

import { upload } from '../util/file-process.js'
import { uploadAndPin, getPinnedData, testFunction } from "../service/pinata.js";
import { calculateTotalPinnedSize, pinToLocal, isPinnedInLocal, getFileMimetype } from '../service/local-ipfs.js';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Total size:', await calculateTotalPinnedSize());
    res.send();
})

router.post('/', upload.single('file'), async (req, res) => {
    const { file } = req;
    const result = await uploadAndPin(file);
    pinToLocal(result.IpfsHash);
    res.send(result);
})

router.get('/:hash', async (req, res) => {
    const { hash } = req.params;
    
    const pinnedData = await getPinnedData(hash);
    console.log(pinnedData);
    
    const mimeType = await getFileMimetype(pinnedData.data);
    res.setHeader('Content-Type', mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${hash}"`);

    pinnedData.data.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf))
    });
})

export default router;