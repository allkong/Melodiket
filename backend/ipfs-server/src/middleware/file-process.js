import multer from 'multer';

const storage = multer.memoryStorage();
const fileUploadMiddleware = multer({ storage: storage });

export {
    fileUploadMiddleware
}