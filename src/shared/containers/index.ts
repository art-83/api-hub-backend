import 'reflect-metadata';

import { ApiRepository } from '@src/modules/apis/infra/orm/repositories/implementations/api-repository.implementation';
import { ApiCommentRepository } from '@src/modules/apis/api-comments/infra/orm/repositories/implementations/api-comment-repository.implementation';
import { ApiSubscriptionRepository } from '@src/modules/apis/api-subscriptions/infra/orm/repositories/implementations/api-subscription-repository.implementation';

import { JwtImplementation } from '@src/modules/users/auth/infra/implementations/jwt.implementation';
import { JwtProvider } from '@src/modules/users/auth/infra/providers/jwt.provider';

import { HashImplementation } from '@src/modules/users/hash/implementation/hash.implementation';
import { HashProvider } from '@src/modules/users/hash/providers/hash.provider';

import { UserRepository } from '@src/modules/users/infra/orm/repositories/implementations/user-repository.implementation';
import { RepositoryProvider } from '../infra/orm/providers/repository.provider';
import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';

import { container } from 'tsyringe';
import { ApiComment } from '@src/modules/apis/api-comments/infra/orm/entities/api-comment.entity';
import { ApiSubscription } from '@src/modules/apis/api-subscriptions/infra/orm/entities/api-subscriptions';

container.registerSingleton<RepositoryProvider<User>>('UserRepository', UserRepository);
container.registerSingleton<RepositoryProvider<Api>>('ApiRepository', ApiRepository);
container.registerSingleton<RepositoryProvider<ApiComment>>('CommentRepository', ApiCommentRepository);
container.registerSingleton<RepositoryProvider<ApiSubscription>>('ApiSubscriptionRepository', ApiSubscriptionRepository);

container.registerSingleton<JwtProvider>('JwtImplementation', JwtImplementation);
container.registerSingleton<HashProvider>('HashImplementation', HashImplementation);
