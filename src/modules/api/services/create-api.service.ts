import { inject, injectable } from 'tsyringe';
import { ApiDTO } from '../dtos/api.dto';
import { Api } from '../infra/orm/entities/api.entity';
import { ApiRepositoryProvider } from '../infra/orm/repositories/providers/api-repository.provider';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';

@injectable()
export class CreateApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(data: ApiDTO, user: User): Promise<Api> {
        const apiToCreate = {
            ...data,
            user,
        };
        const createApi = await this.apiRepository.create(apiToCreate);
        return createApi;
    }
}
