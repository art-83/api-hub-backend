import { Api } from '../infra/orm/entities/api.entity';
import { ApiDTO } from '../dtos/api.dto';
import { ApiRepositoryProvider } from '../infra/orm/repositories/providers/api-repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateApiService {
    constructor(
        @inject('ApiRepository')
        private apiRepository: ApiRepositoryProvider,
    ) {}

    public async excecute(id: string, data: Partial<ApiDTO>): Promise<Api> {
        const api = (
            await this.apiRepository.find({
                id,
            })
        ).at(0);

        if (!api) throw new AppError(404, 'Api not found');

        if (data.title) api.title = data.title;
        if (data.description) api.description = data.description;
        if (data.github) api.github = data.github;
        if (data.deploy_url) api.deploy_url = data.deploy_url;
        if (data.type) api.type = data.type;
        if (data.text_content) api.text_content = data.text_content;

        const updatedApi = await this.apiRepository.update(api);
        return updatedApi;
    }
}
