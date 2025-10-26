import { inject, injectable } from 'tsyringe';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { Api } from '../infra/orm/entities/api.entity';

@injectable()
export class DeleteApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: RepositoryProvider<Api>,
    ) {}

    public async excecute(id: string): Promise<void> {
        await this.apiRepository.delete(id);
    }
}
