import { Request, Response, NextFunction } from 'express';
import { AppError } from '../infra/http/errors/app-error';

export class GlobalErrorHandlerMiddleware {
    public use(error: AppError, req: Request, res: Response, next: NextFunction) {
        if (error instanceof AppError) {
            return res.status(error.code).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}