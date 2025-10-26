import { inject, injectable } from 'tsyringe';
import { Api } from '../infra/orm/entities/api.entity';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';

@injectable()
export class CreateApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: RepositoryProvider<Api>,
    ) {}

    public async excecute(data: Partial<Api>, user: User): Promise<Api> {
        const apiToCreate = {
            ...data,
            user,
        };
        const createApi = await this.apiRepository.create(apiToCreate);
        return createApi;
    }
}
