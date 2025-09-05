import multer from 'multer';
import { AppError } from '../utils/AppError';
import httpStatus from 'http-status';

// Using memory storage to handle files as buffers before deciding where to upload them (e.g., S3, Cloudinary, or local disk)
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
        cb(null, true);
    } else {
        cb(new AppError(httpStatus.BAD_REQUEST, 'Not an image or video! Please upload only images or videos.') as any, false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        // 20 MB limit for videos, 5 MB for images
        fileSize: 20 * 1024 * 1024,
    },
});