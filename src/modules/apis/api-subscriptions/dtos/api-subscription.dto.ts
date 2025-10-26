import { ApiSubscription } from '../infra/orm/entities/api-subscriptions';

export interface ApiSubscriptionDTO extends ApiSubscription {
    api_id?: string;
}
