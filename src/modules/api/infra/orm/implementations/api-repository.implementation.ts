import { Repository } from 'typeorm';
import { Api } from '../entities/api.entity';
import { ApiRepositoryProvider } from '../providers/api-repository.provider';
import { dataSource } from '@src/@config/database/data-source.config';
import { AppError } from '@src/shared/infra/http/errors/app-error';

export class ApiRepository implements ApiRepositoryProvider {
    private readonly repository: Repository<Api>;

    constructor() {
        this.repository = dataSource.getRepository(Api);
    }

    public async find(): Promise<Api[]> {
        const apis = await this.repository.find();
        return apis;
    }

    public async findOne(id: string): Promise<Api | null> {
        const api = await this.repository.findOne({
            where: { id },
        });
        return api;
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
