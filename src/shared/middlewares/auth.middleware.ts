import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { DecodeJwtService } from '@src/modules/users/auth/services/decode-jwt.service';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { FindUserService } from '@src/modules/users/services/find-user.service';

export class AuthMiddleware {
    public async use(request: Request, response: Response, next: NextFunction): Promise<void> {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError(401, 'Token not provided');
        }

        const token = authHeader.split(' ').at(1);

        if (!token) {
            throw new AppError(401, 'Token not provided');
        }

        try {
            const decodeJwtService = container.resolve(DecodeJwtService);
            const decoded = decodeJwtService.execute(token);

            const findUserService = container.resolve(FindUserService);

            const user = (await findUserService.execute({ id: decoded.sub })).at(0);

            if (!user) {
                throw new AppError(401, 'Invalid user');
            }

            request.user = user;

            return next();
        } catch (error) {
            throw new AppError(401, 'Invalid token');
        }
    }
}
