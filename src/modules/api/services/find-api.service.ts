import { inject, injectable } from 'tsyringe';
import { Api } from '../infra/orm/entities/api.entity';
import { ApiRepositoryProvider } from '../infra/orm/repositories/providers/api-repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { ApiDTO } from '../dtos/api.dto';

@injectable()
export class FindApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(data: ApiDTO): Promise<Api[]> {
        const api = await this.apiRepository.find(data);
        if (!api) {
            throw new AppError(404, 'Api not found');
        }
        return api;
    }
}
