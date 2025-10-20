import { container, inject, injectable } from 'tsyringe';
import { UserDto } from '../dtos/user.dto';
import { UserRepositoryProvider } from '../infra/orm/providers/user-repository.provider';
import { HashProvider } from '../infra/hash/providers/hash.provider';
import { EncodeJwtService } from '@src/modules/users/infra/auth/services/encode-jwt.service';
import { AppError } from '@src/shared/infra/http/errors/app-error';

@injectable()
export class LoginUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: UserRepositoryProvider,
        @inject('HashImplementation')
        private hashImplementation: HashProvider,
    ) {}

    public async execute(data: UserDto): Promise<{ token: string }> {
        if (!data.email || !data.password) {
            throw new AppError(400, 'Email and password are required');
        }

        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError(401, 'Invalid credentials');
        }

        const passwordMatch = this.hashImplementation.compare(
            data.password,
            user.password,
        );

        if (!passwordMatch) {
            throw new AppError(401, 'Invalid credentials');
        }

        const encodeJwtService = container.resolve(EncodeJwtService);
        const token = encodeJwtService.execute({ sub: user.id });

        return { token };
    }
}
