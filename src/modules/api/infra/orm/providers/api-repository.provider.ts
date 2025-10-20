import { Api } from '../entities/api.entity';

export interface ApiRepositoryProvider {
    find(): Promise<Api[]>;
    findOne(id: string): Promise<Api | null>;
    create(api: Partial<Api>): Promise<Api>;
    update(api: Api): Promise<Api>;
    delete(id: string): Promise<void>;
}