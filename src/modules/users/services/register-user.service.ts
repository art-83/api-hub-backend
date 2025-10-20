
import { injectable, inject } from 'tsyringe';
import { UserRepositoryProvider } from '../infra/orm/providers/user-repository.provider';
import { HashProvider } from '../infra/hash/providers/hash.provider';
import { UserDto } from '../dtos/user.dto';
import { AppError } from '@src/shared/infra/http/errors/app-error';

@injectable()
export class RegisterUserService {
	constructor(
		@inject('UserRepository') private userRepository: UserRepositoryProvider,
		@inject('HashImplementation') private hashProvider: HashProvider
	) {}

	async execute(data: UserDto): Promise<UserDto> {
		if (!data.email || !data.password || !data.name) {
			throw new AppError(400, 'Missing required fields');
		}

		const userExists = await this.userRepository.findByEmail(data.email);
		if (userExists) {
			throw new AppError(409, 'User already exists');
		}

		const hashedPassword = this.hashProvider.encrypt(data.password);

        data.password = hashedPassword;

		const user = await this.userRepository.create(data);

        const userDto = { email: user.email, name: user.name }

		return userDto;
	}
}
