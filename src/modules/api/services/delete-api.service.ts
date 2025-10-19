import { ApiRespositoryProvider } from '../infra/orm/providers/api-repository.provider';
import { ApiRepsitory } from '../infra/orm/repositories/api.repository';

export class DeleteApiService {
    private repository: ApiRespositoryProvider;

    constructor() {
        this.repository = new ApiRepsitory();
    }

    public async excecute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
