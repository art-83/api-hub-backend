import { User } from '@src/modules/users/infra/orm/entities/user.entity';

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}