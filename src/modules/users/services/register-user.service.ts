import { injectable, inject } from 'tsyringe';
import { UserRepositoryProvider } from '../infra/orm/repositories/providers/user-repository.provider';
import { HashProvider } from '../infra/hash/providers/hash.provider';
import { UserDTO } from '../dtos/user.dto';
import { AppError } from '@src/shared/infra/http/errors/app-error';

@injectable()
export class RegisterUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: UserRepositoryProvider,
        @inject('HashImplementation')
        private hashProvider: HashProvider,
    ) {}

    async execute(data: UserDTO): Promise<UserDTO> {
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
