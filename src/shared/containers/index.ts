import { ApiRepositoryProvider } from '@src/modules/api/infra/orm/repositories/providers/api-repository.provider';
import { ApiRepository } from '@src/modules/api/infra/orm/repositories/implementations/api-repository.implementation';

import { JwtImplementation } from '@src/modules/users/infra/auth/infra/implementations/jwt.implementation';
import { JwtProvider } from '@src/modules/users/infra/auth/infra/providers/jwt.provider';

import { HashImplementation } from '@src/modules/users/infra/hash/implementation/hash.implementation';
import { HashProvider } from '@src/modules/users/infra/hash/providers/hash.provider';

import { UserRepositoryProvider } from '@src/modules/users/infra/orm/repositories/providers/user-repository.provider';
import { UserRepository } from '@src/modules/users/infra/orm/repositories/implementations/user-repository.implementation';

import { container } from 'tsyringe';

import 'reflect-metadata';

container.registerSingleton<ApiRepositoryProvider>('ApiRepository', ApiRepository);
container.registerSingleton<UserRepositoryProvider>('UserRepository', UserRepository);

container.registerSingleton<JwtProvider>('JwtImplementation', JwtImplementation);
container.registerSingleton<HashProvider>('HashImplementation', HashImplementation);
