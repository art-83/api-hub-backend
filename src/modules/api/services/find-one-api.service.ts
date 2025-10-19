import { Api } from '../infra/orm/entities/api.entity';
import { ApiRespositoryProvider } from '../infra/orm/providers/api-repository.provider';
import { ApiRepsitory } from '../infra/orm/repositories/api.repository';
import { AppError } from '@src/shared/infra/http/errors/app-error';

export class FindOneApiService {
    private repository: ApiRespositoryProvider;

    constructor() {
        this.repository = new ApiRepsitory();
    }

    public async excecute(id: string): Promise<Api> {
        const api = await this.repository.findOne(id);
        if (!api) {
            throw new AppError(404, 'Api not found');
        }
        return api;
    }
}
