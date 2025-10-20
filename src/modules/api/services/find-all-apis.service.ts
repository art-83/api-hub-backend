import { inject, injectable } from 'tsyringe';
import { Api } from '../infra/orm/entities/api.entity';
import { ApiRepositoryProvider } from '../infra/orm/providers/api-repository.provider';

@injectable()
export class FindAllApisService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(): Promise<Api[]> {
        const apis = await this.apiRepository.find();
        return apis;
    }
}
