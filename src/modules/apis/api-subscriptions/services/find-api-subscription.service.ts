import { inject, injectable } from 'tsyringe';
import { ApiSubscription } from '../infra/orm/entities/api-subscriptions';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';
import { ApiSubscriptionDTO } from '../dtos/api-subscription.dto';

@injectable()
export class FindApiSubscriptionService {
    constructor(
        @inject('ApiSubscriptionRepository')
        private apiSubscriptionRepository: RepositoryProvider<ApiSubscription>,
    ) {}

    public async execute(data: ApiSubscriptionDTO): Promise<ApiSubscription[]> {
        const options: Partial<ApiSubscription> = { ...data };
        if (data.api_id) {
            options.api = { id: data.api_id } as Api;
        }
        const subscriptions = await this.apiSubscriptionRepository.find(options);
        return subscriptions;
    }
}
