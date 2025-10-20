import { inject, injectable } from 'tsyringe';
import { JwtProvider } from '../infra/providers/jwt.provider';
import { JwtPayloadDto } from '@src/modules/users/infra/auth/dto/jwt-payload.dto';
import { AppError } from '@src/shared/infra/http/errors/app-error';

@injectable()
export class DecodeJwtService {
    constructor(
        @inject('JwtImplementation')
        private jwt: JwtProvider,
    ) {}

    public execute(token: string): JwtPayloadDto {
        const decoded = this.jwt.decode(token);

        if (!decoded) {
            throw new AppError(401, 'Invalid token');
        }

        return decoded;
    }
}

