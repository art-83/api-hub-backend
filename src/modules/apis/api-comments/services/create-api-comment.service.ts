import { inject, injectable } from 'tsyringe';
import { ApiComment } from '../infra/orm/entities/api-comment.entity';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';
import { ApiCommentDTO } from '../dtos/api-comment.dto';

@injectable()
export class CreateApiCommentService {
    constructor(
        @inject('ApiCommentRepository')
        private apiCommentRepository: RepositoryProvider<ApiComment>,
        @inject('ApiRepository')
        private apiRepository: RepositoryProvider<Api>,
    ) {}

    public async execute(data: ApiCommentDTO, user: User): Promise<ApiComment> {
        const api = (await this.apiRepository.find({ id: data.api_id })).at(0);

        if (!api) {
            throw new AppError(404, 'Api not found');
        }

        const commentToCreate: Partial<ApiComment> = {
            ...data,
            user,
            api,
        };

        if (data.parent_id) {
            const parent = (await this.apiCommentRepository.find({ id: data.parent_id })).at(0);
            if (!parent) {
                throw new AppError(404, 'Parent comment not found');
            }
            commentToCreate.parent = parent;
        }

        const createComment = await this.apiCommentRepository.create(commentToCreate);
        return createComment;
    }
}
