import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { dataSource } from '@src/@config/database/data-source.config';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';

export class UserRepository implements RepositoryProvider<User> {
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = dataSource.getRepository(User);
    }

    public async find(options: Partial<User>): Promise<User[]> {
        const query = this.repository.createQueryBuilder('users');

        if (options.id) query.andWhere('users.id = :id', { id: options.id });
        if (options.email) query.andWhere('users.email = :email', { email: options.email });
        if (options.name) query.andWhere('users.name = :name', { name: options.name });
        if (options.github) query.andWhere('users.github = :github', { github: options.github });

        return query.getMany();
    }

    public async create(user: Partial<User>): Promise<User> {
        const newUser = this.repository.create(user);
        const savedUser = await this.repository.save(newUser);
        return savedUser;
    }

    public async update(user: User): Promise<User> {
        return this.repository.save(user);
    }

    public async delete(id: string): Promise<void> {
        const deleteResult = await this.repository.delete(id);
        if (deleteResult.affected === 0) {
            throw new AppError(404, 'User not found');
        }
    }
}
