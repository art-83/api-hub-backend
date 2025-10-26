import { inject, injectable } from 'tsyringe';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { User } from '@src/modules/users/infra/orm/entities/user.entity';
import { ApiComment } from '../infra/orm/entities/api-comment.entity';

@injectable()
export class DeleteApiCommentService {
    constructor(
        @inject('ApiCommentRepository')
        private apiCommentRepository: RepositoryProvider<ApiComment>,
    ) {}

    public async execute(id: string, user: User): Promise<void> {
        const comment = (await this.apiCommentRepository.find({ id })).at(0);

        if (!comment) {
            throw new AppError(404, 'Comment not found');
        }

        if (comment.user.id !== user.id) {
            throw new AppError(403, 'You are not allowed to delete this comment');
        }

        await this.apiCommentRepository.delete(id);
    }
}
