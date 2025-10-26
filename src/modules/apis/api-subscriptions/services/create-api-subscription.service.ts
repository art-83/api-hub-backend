import { inject, injectable } from 'tsyringe';
import { ApiSubscription } from '../infra/orm/entities/api-subscriptions';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';
import { ApiSubscriptionDTO } from '../dtos/api-subscription.dto';

@injectable()
export class CreateApiSubscriptionService {
    constructor(
        @inject('ApiSubscriptionRepository')
        private apiSubscriptionRepository: RepositoryProvider<ApiSubscription>,
        @inject('ApiRepository')
        private apiRepository: RepositoryProvider<Api>,
    ) {}

    public async execute(data: ApiSubscriptionDTO, user: User): Promise<ApiSubscription> {
        const api = (await this.apiRepository.find({ id: data.api_id })).at(0);

        if (!api) {
            throw new AppError(404, 'Api not found');
        }

        const subscriptionToCreate: Partial<ApiSubscription> = {
            user,
            api,
        };

        const createSubscription = await this.apiSubscriptionRepository.create(subscriptionToCreate);
        return createSubscription;
    }
}
