import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { DecodeJwtService } from '@src/modules/users/infra/auth/services/decode-jwt.service';
import { AppError } from '@src/shared/infra/http/errors/app-error';

export class AuthMiddleware {
    public use(request: Request, response: Response, next: NextFunction): void {
        const authHeader = request.headers.authorization;

        if (!authHeader) throw new AppError(401, 'Token not provided');

        const token = authHeader.split(' ').at(1);

        try {
            const decodeJwtService = container.resolve(DecodeJwtService);
            const decoded = decodeJwtService.execute(token as string);
            return next();
        } catch (error) {
            throw new AppError(401, 'Invalid token');
        }
    }
}
