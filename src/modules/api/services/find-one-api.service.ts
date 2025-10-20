import { inject, injectable } from 'tsyringe';
import { Api } from '../infra/orm/entities/api.entity';
import { ApiRepositoryProvider } from '../infra/orm/providers/api-repository.provider';
import { ApiRepository } from '../infra/orm/implementations/api-repository.implementation';
import { AppError } from '@src/shared/infra/http/errors/app-error';

@injectable()
export class FindOneApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(id: string): Promise<Api> {
        const api = await this.apiRepository.findOne(id);
        if (!api) {
            throw new AppError(404, 'Api not found');
        }
        return api;
    }
}
