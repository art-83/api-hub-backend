import { Api } from '../infra/orm/entities/api.entity';
import { ApiRespositoryProvider } from '../infra/orm/providers/api-repository.provider';
import { ApiRepsitory } from '../infra/orm/repositories/api.repository';

export class FindAllApisService {
    private repository: ApiRespositoryProvider;

    constructor() {
        this.repository = new ApiRepsitory();
    }

    public async excecute(): Promise<Api[]> {
        const apis = await this.repository.find();
        return apis;
    }
}
