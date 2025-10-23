import { Repository } from 'typeorm';
import { Api } from '../../entities/api.entity';
import { ApiRepositoryProvider } from '../providers/api-repository.provider';
import { dataSource } from '@src/@config/database/data-source.config';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { ApiDTO } from '@src/modules/api/dtos/api.dto';

export class ApiRepository implements ApiRepositoryProvider {
    private readonly repository: Repository<Api>;

    constructor() {
        this.repository = dataSource.getRepository(Api);
    }

    public async find(options: ApiDTO): Promise<Api[]> {
        const query = this.repository.createQueryBuilder('apis');

        if(options.id) query.andWhere('apis.id = :id', { id: options.id })
        if(options.title) query.andWhere('apis.title = :title', { title: options.title })
        if(options.description) query.andWhere('apis.description = :description', { description: options.description })
        if(options.github) query.andWhere('apis.github = :github', { github: options.github })
        if(options.deploy_url) query.andWhere('apis.deploy_url = :deploy_url', { deploy_url: options.deploy_url })
        if(options.type) query.andWhere('apis.type = :type', { type: options.type })
        if(options.text_content) query.andWhere('apis.text_content = :text_content', { text_content: options.text_content })

        return query.getMany();
    }

    public async create(api: Partial<Api>): Promise<Api> {
        const newApi = this.repository.create(api);
        const savedApi = await this.repository.save(newApi);
        return savedApi;
    }

    public async update(api: Api): Promise<Api> {
        return this.repository.save(api);
    }

    public async delete(id: string): Promise<void> {
        const deleteResult = await this.repository.delete(id);
        if (deleteResult.affected === 0) {
            throw new AppError(404, 'Api not found');
        }
    }
}
