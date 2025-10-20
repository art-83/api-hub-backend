
import { bcryptConfig } from '@src/@config/hash/bcrypt.config';
import { HashProvider } from '../providers/hash.provider';
import bcrypt from 'bcrypt';

export class HashImplementation implements HashProvider {
    
    encrypt(password: string): string {
        return bcrypt.hashSync(password, bcryptConfig.salt);
    }

    compare(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}

