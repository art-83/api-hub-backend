import { ApiDTO } from '@src/modules/api/dtos/api.dto';
import { Api } from '../../entities/api.entity';

export interface ApiRepositoryProvider {
    find(options: ApiDTO): Promise<Api[]>;
    create(api: ApiDTO): Promise<Api>;
    update(api: Api): Promise<Api>;
    delete(id: string): Promise<void>;
}
