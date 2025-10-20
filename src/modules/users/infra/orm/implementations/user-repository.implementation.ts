import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryProvider } from '../providers/user-repository.provider';
import { dataSource } from '@src/@config/database/data-source.config';
import { AppError } from '@src/shared/infra/http/errors/app-error';

export class UserRepository implements UserRepositoryProvider {
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = dataSource.getRepository(User);
    }

    public async find(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }

    public async findOne(id: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: { id },
        });
        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: { email },
        });
        return user;
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

