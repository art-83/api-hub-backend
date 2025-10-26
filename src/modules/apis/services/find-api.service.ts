import { inject, injectable } from 'tsyringe';
import { Api } from '../infra/orm/entities/api.entity';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';

@injectable()
export class FindApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: RepositoryProvider<Api>,
    ) {}

    public async excecute(data: Partial<Api>): Promise<Api[]> {
        const api = await this.apiRepository.find(data);
        if (!api) {
            throw new AppError(404, 'Api not found');
        }
        return api;
    }
}
