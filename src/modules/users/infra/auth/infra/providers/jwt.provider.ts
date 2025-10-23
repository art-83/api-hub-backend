import { JwtPayloadDto } from '../../dto/jwt-payload.dto';

export interface JwtProvider {
    encode(JwtPayloadDto: JwtPayloadDto): string;
    decode(jwtToken: string): JwtPayloadDto;
}
