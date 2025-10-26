import { inject, injectable } from 'tsyringe';
import { ApiComment } from '../infra/orm/entities/api-comment.entity';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';
import { Api } from '@src/modules/apis/infra/orm/entities/api.entity';
import { ApiCommentDTO } from '../dtos/api-comment.dto';

@injectable()
export class FindApiCommentService {
    constructor(
        @inject('ApiCommentRepository')
        private apiCommentRepository: RepositoryProvider<ApiComment>,
    ) {}

    public async execute(data: ApiCommentDTO): Promise<ApiComment[]> {
        const options: Partial<ApiComment> = { ...data };
        if (data.api_id) {
            options.api = { id: data.api_id } as Api;
        }
        if (data.parent_id) {
            options.parent = { id: data.parent_id } as ApiComment;
        }
        const comments = await this.apiCommentRepository.find(options);
        return comments;
    }
}
