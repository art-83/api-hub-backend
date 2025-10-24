import { inject, injectable } from 'tsyringe';
import { User } from '../infra/orm/entities/user.entity';
import { UserRepositoryProvider } from '../infra/orm/repositories/providers/user-repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { UserDTO } from '../dtos/user.dto';

@injectable()
export class FindUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: UserRepositoryProvider,
    ) {}

    public async execute(data: UserDTO): Promise<User[]> {
        const user = await this.userRepository.find(data);
        if (!user) {
            throw new AppError(404, 'User not found');
        }
        return user;
    }
}
