import { inject, injectable } from 'tsyringe';
import { User } from '../infra/orm/entities/user.entity';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';

@injectable()
export class FindUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: RepositoryProvider<User>,
    ) {}

    public async execute(data: Partial<User>): Promise<User[]> {
        const user = await this.userRepository.find(data);
        if (!user) {
            throw new AppError(404, 'User not found');
        }
        return user;
    }
}
