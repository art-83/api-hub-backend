import jwt from 'jsonwebtoken';
import { JwtPayloadDto } from '../../dto/jwt-payload.dto';
import { JwtProvider } from '../providers/jwt.provider';
import { jwtConfig } from '@src/@config/jwt/jwt.config';

export class JwtImplementation implements JwtProvider {
    public encode(JwtPayloadDto: JwtPayloadDto): string {
        const token = jwt.sign(
            JwtPayloadDto,
            jwtConfig.secret as string,
            {
                expiresIn: jwtConfig.expiresIn,
            } as jwt.SignOptions,
        );
        return token;
    }

    public decode(jwtToken: string): JwtPayloadDto {
        const decoded = jwt.verify(jwtToken, jwtConfig.secret as string) as JwtPayloadDto;
        return decoded;
    }
}
