import { inject, injectable } from 'tsyringe';
import { ApiDTO } from '../dtos/api.dto';
import { Api } from '../infra/orm/entities/api.entity';
import { ApiRepositoryProvider } from '../infra/orm/repositories/providers/api-repository.provider';

@injectable()
export class CreateApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(data: ApiDTO): Promise<Api> {
        const createApi = await this.apiRepository.create(data);
        return createApi;
    }
}
