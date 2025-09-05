import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import { AppError } from '../utils/AppError';

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = Joi.compile(schema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

export default validate;