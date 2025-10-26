import { Repository } from 'typeorm';
import { ApiSubscription } from '../../entities/api-subscriptions';
import { dataSource } from '@src/@config/database/data-source.config';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';

export class ApiSubscriptionRepository implements RepositoryProvider<ApiSubscription> {
    private readonly repository: Repository<ApiSubscription>;

    constructor() {
        this.repository = dataSource.getRepository(ApiSubscription);
    }

    public async find(options: Partial<ApiSubscription>): Promise<ApiSubscription[]> {
        const query = 
        this.repository
        .createQueryBuilder('api_subscriptions')
        .leftJoinAndSelect('api_subscriptions.user', 'user')
        .leftJoinAndSelect('api_subscriptions.api', 'api');

        if (options.id) query.andWhere('api_subscriptions.id = :id', { id: options.id });
        if (options.user) query.andWhere('user.id = :user_id', { user_id: options.user.id });
        if (options.api) query.andWhere('api.id = :api_id', { api_id: options.api.id });

        return query.getMany();
    }

    public async create(subscription: Partial<ApiSubscription>): Promise<ApiSubscription> {
        const newSubscription = this.repository.create(subscription);
        const savedSubscription = await this.repository.save(newSubscription);
        return savedSubscription;
    }

    public async update(subscription: ApiSubscription): Promise<ApiSubscription> {
        return this.repository.save(subscription);
    }

    public async delete(id: string): Promise<void> {
        const deleteResult = await this.repository.delete(id);
        if (deleteResult.affected === 0) {
            throw new AppError(404, 'ApiSubscription not found');
        }
    }
}
