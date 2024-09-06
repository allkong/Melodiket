import express from "express";
import stream from 'stream';

import { fileUploadMiddleware } from '../middleware/file-process.js'
import { uploadAndGetCid, getByCid } from "../service/ipfs.js";

const router = express.Router();

router.post('/', fileUploadMiddleware.single('file'), async (req, res) => {
    const { file } = req;
    const cid = (await uploadAndGetCid(file)).toString();
    res.send({
        cid
    });
})


router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    
    const pinnedData = await getByCid(cid);
    const {file, originalName, mimetype} = pinnedData;
    
    const buffer = Buffer.from(file, 'base64');
    res.setHeader('Content-Type', mimetype || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
    const readStream = new stream.PassThrough();
    readStream.end(buffer);
    readStream.pipe(res);
})

export default router;