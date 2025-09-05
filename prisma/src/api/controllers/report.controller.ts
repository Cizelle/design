import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as reportService from '../services/report.service';
import { MediaData } from '../types'; // update path as needed

// If you want stricter typing for req.user, create AuthRequest (see note below)
type AnyRequest = Request & { user?: { user_id: number;[k: string]: any } };

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export const createReport = catchAsync(async (req: AnyRequest, res: Response) => {
    // NOTE: This is a simplified version.
    // In a real implementation, you would upload files from req.files to cloud storage (e.g., S3)
    // and get back URLs to store in the 'file_path'.

    if (!req.user || !req.user.user_id) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'User not authenticated' });
    }

    const reportData = { ...req.body, user_id: req.user.user_id };

    // Ensure req.files is an array; fallback to empty array
    const files = (req.files as Express.Multer.File[]) || [];

    // Map into the strongly-typed MediaData[] - narrow literal types with 'as const'
    const mediaFiles: MediaData[] = files.map(file => ({
        media_type: file.mimetype.startsWith('image') ? ('Image' as const) : ('Video' as const),
        file_path: `uploads/placeholder/${file.originalname}`, // This would be a URL in prod
    }));

    // Make sure your reportService.createHazardReport accepts mediaFiles: MediaData[]
    const report = await reportService.createHazardReport(reportData, mediaFiles);
    res.status(httpStatus.CREATED).send(report);
});

export const getReports = catchAsync(async (req: Request, res: Response) => {
    const reports = await reportService.getAllReports(req.query);
    res.status(httpStatus.OK).send(reports);
});

export const validateReport = catchAsync(async (req: AnyRequest, res: Response) => {
    const reportId = parseInt(req.params.id, 10);
    if (!req.user || !req.user.user_id) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'User not authenticated' });
    }
    const validatorId = req.user.user_id;
    const validatedReport = await reportService.validateReport(reportId, validatorId);
    res.status(httpStatus.OK).send(validatedReport);
});
