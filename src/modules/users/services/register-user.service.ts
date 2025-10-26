import { injectable, inject } from 'tsyringe';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { HashProvider } from '../hash/providers/hash.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { User } from '../infra/orm/entities/user.entity';

@injectable()
export class RegisterUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: RepositoryProvider<User>,
        @inject('HashImplementation')
        private hashProvider: HashProvider,
    ) {}

    async execute(data: Partial<User>): Promise<Partial<User>> {
        if (!data.email || !data.password || !data.name) {
            throw new AppError(400, 'Missing required fields');
        }

        const userExists = (await this.userRepository.find(data)).at(0);

        if (userExists) {
            throw new AppError(409, 'User already exists');
        }

        const hashedPassword = this.hashProvider.encrypt(data.password);

        data.password = hashedPassword;

        const user = await this.userRepository.create(data);

        const userResponse = {
            email: user.email,
            name: user.name,
        };

        return userResponse;
    }
}
