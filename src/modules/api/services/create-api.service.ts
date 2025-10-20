import { inject, injectable } from 'tsyringe';
import { ApiDto } from '../dtos/api.dto';
import { Api } from '../infra/orm/entities/api.entity';
import { ApiRepositoryProvider } from '../infra/orm/providers/api-repository.provider';
import { ApiRepository } from '../infra/orm/implementations/api-repository.implementation';

@injectable()
export class CreateApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(data: ApiDto): Promise<Api> {
        const createApi = await this.apiRepository.create(data);
        return createApi;
    }
}
