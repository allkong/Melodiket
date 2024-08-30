import express from "express";

import { upload } from '../util/file-process.js'
import { uploadAndPin } from "../service/pinata.js";

const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
    const { file } = req;
    await uploadAndPin(file);
    res.send('Done!');
})

export default router;