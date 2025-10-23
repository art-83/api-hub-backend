import { Request, Response, NextFunction } from 'express';
import { AppError } from '../infra/http/errors/app-error';
import { isCelebrateError } from 'celebrate';

export class GlobalErrorHandlerMiddleware {
    public use(error: Error, req: Request, res: Response, next: NextFunction) {
        if (isCelebrateError(error)) {
            const errorBody = error.details.get('body') || error.details.get('query') || error.details.get('params');
            return res.status(400).json({
                message: errorBody?.message,
            });
        }

        if (error instanceof AppError) {
            return res.status(error.code).json({
                message: error.message,
            });
        }
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}
