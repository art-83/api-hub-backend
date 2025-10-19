import { ApiDto } from '../dtos/api.dto';
import { Api } from '../infra/orm/entities/api.entity';
import { ApiRespositoryProvider } from '../infra/orm/providers/api-repository.provider';
import { ApiRepsitory } from '../infra/orm/repositories/api.repository';

export class CreateApiService {
    private repository: ApiRespositoryProvider;

    constructor() {
        this.repository = new ApiRepsitory();
    }

    public async excecute(data: ApiDto): Promise<Api> {
        const createApi = await this.repository.create(data);
        return createApi;
    }
}