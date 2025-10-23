import { UserDTO } from '@src/modules/users/dtos/user.dto';
import { User } from '../../entities/user.entity';

export interface UserRepositoryProvider {
    find(options: UserDTO): Promise<User[]>;
    create(user: UserDTO): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}
