import { inject, injectable } from 'tsyringe';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';
import { ApiSubscription } from '../infra/orm/entities/api-subscriptions';

@injectable()
export class DeleteApiSubscriptionService {
    constructor(
        @inject('ApiSubscriptionRepository')
        private apiSubscriptionRepository: RepositoryProvider<ApiSubscription>,
    ) {}

    public async execute(id: string, user: User): Promise<void> {
        const subscription = (await this.apiSubscriptionRepository.find({ id })).at(0);

        if (!subscription) {
            throw new AppError(404, 'Subscription not found');
        }

        if (subscription.user.id !== user.id) {
            throw new AppError(403, 'You are not allowed to delete this subscription');
        }

        await this.apiSubscriptionRepository.delete(id);
    }
}
