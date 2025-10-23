import { inject, injectable } from 'tsyringe';
import { JwtProvider } from '../infra/providers/jwt.provider';
import { JwtPayloadDto } from '@src/modules/users/infra/auth/dto/jwt-payload.dto';

@injectable()
export class EncodeJwtService {
    constructor(
        @inject('JwtImplementation')
        private jwt: JwtProvider,
    ) {}

    public execute(payload: JwtPayloadDto): string {
        const token = this.jwt.encode(payload);
        return token;
    }
}
