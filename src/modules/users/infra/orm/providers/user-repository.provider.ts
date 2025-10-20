import { User } from '../entities/user.entity';

export interface UserRepositoryProvider {
    find(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}

