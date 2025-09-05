import prisma from '../../utils/prisma';
import { hazard_reports, media_uploads } from '../../generated/prisma/client';
import { MediaData } from '../types';

type ReportData = Omit<hazard_reports, 'report_id' | 'submission_time' | 'report_status' | 'validated_by' | 'validated_time'>;

/**
 * Create a new hazard report with optional media
 * @param {ReportData} reportData
 * @param {MediaData[]} mediaFiles
 * @returns {Promise<hazard_reports>}
 */
export const createHazardReport = async (reportData: ReportData, mediaFiles: MediaData[] = []): Promise<hazard_reports> => {
    const newReport = await prisma.hazard_reports.create({
        data: {
            user_id: reportData.user_id,
            event_type: reportData.event_type,
            description: reportData.description,
            latitude: reportData.latitude,
            longitude: reportData.longitude,
            location_description: reportData.location_description,
            report_category: reportData.report_category,
            source_type: reportData.source_type,
        },
    });

    if (mediaFiles.length > 0) {
        const mediaData = mediaFiles.map(file => ({
            report_id: newReport.report_id,
            user_id: newReport.user_id,
            media_type: file.media_type,
            file_path: file.file_path, // Note: file_path would be the URL from your cloud storage
        }));

        await prisma.media_uploads.createMany({
            data: mediaData,
        });
    }

    return newReport;
};

/**
 * Get all reports with optional filters
 * @param {any} filters
 * @returns {Promise<hazard_reports[]>}
 */
export const getAllReports = async (filters: any): Promise<hazard_reports[]> => {
    // Add filter logic here based on location, event type, date, etc.
    return prisma.hazard_reports.findMany({
        include: {
            media_uploads: true,
            users_hazard_reports_user_idTousers: { // reporter info
                select: { name: true, profile_photo: true }
            }
        },
        orderBy: {
            submission_time: 'desc'
        }
    });
};

/**
 * Validate a report (for officials/analysts)
 * @param {number} reportId
 * @param {number} validatorId
 * @returns {Promise<hazard_reports>}
 */
export const validateReport = async (reportId: number, validatorId: number): Promise<hazard_reports> => {
    return prisma.hazard_reports.update({
        where: { report_id: reportId },
        data: {
            report_status: 'Validated',
            validated_by: validatorId,
            validated_time: new Date(),
        },
    });
};