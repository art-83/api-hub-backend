import { inject, injectable } from 'tsyringe';
import { ApiRepositoryProvider } from '../infra/orm/providers/api-repository.provider';

@injectable()
export class DeleteApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(id: string): Promise<void> {
        await this.apiRepository.delete(id);
    }
}
