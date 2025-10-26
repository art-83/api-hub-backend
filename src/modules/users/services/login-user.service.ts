import { container, inject, injectable } from 'tsyringe';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { HashProvider } from '../hash/providers/hash.provider';
import { EncodeJwtService } from '../auth/services/encode-jwt.service';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { User } from '../infra/orm/entities/user.entity';

@injectable()
export class LoginUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: RepositoryProvider<User>,
        @inject('HashImplementation')
        private hashImplementation: HashProvider,
    ) {}

    public async execute(data: Partial<User>): Promise<{
        user: User;
        token: string;
    }> {
        if (!data.email || !data.password) {
            throw new AppError(400, 'Email and password are required');
        }

        const user = (await this.userRepository.find(data)).at(0);

        if (!user) {
            throw new AppError(401, 'Invalid credentials');
        }

        const passwordMatch = this.hashImplementation.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new AppError(401, 'Invalid credentials');
        }

        const encodeJwtService = container.resolve(EncodeJwtService);
        const token = encodeJwtService.execute({
            sub: user.id,
        });

        return {
            user,
            token,
        };
    }
}
