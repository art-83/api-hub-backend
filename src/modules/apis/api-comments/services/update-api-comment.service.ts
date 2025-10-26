import { ApiComment } from '../infra/orm/entities/api-comment.entity';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';

@injectable()
export class UpdateApiCommentService {
    constructor(
        @inject('ApiCommentRepository')
        private apiCommentRepository: RepositoryProvider<ApiComment>,
    ) {}

    public async execute(id: string, data: Partial<ApiComment>, user: User): Promise<ApiComment> {
        const [comment] = await this.apiCommentRepository.find({ id });

        if (!comment) {
            throw new AppError(404, 'Comment not found');
        }

        if (comment.user.id !== user.id) {
            throw new AppError(403, 'You are not allowed to update this comment');
        }

        if (data.content) {
            comment.content = data.content;
        }

        const updatedComment = await this.apiCommentRepository.update(comment);
        return updatedComment;
    }
}
