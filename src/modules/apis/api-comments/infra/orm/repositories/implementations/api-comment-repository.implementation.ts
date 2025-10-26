import { Repository } from 'typeorm';
import { ApiComment } from '../../entities/api-comment.entity';
import { dataSource } from '@src/@config/database/data-source.config';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { RepositoryProvider } from '@src/shared/infra/orm/providers/repository.provider';

export class ApiCommentRepository implements RepositoryProvider<ApiComment> {
    private readonly repository: Repository<ApiComment>;

    constructor() {
        this.repository = dataSource.getRepository(ApiComment);
    }

    public async find(options: Partial<ApiComment>): Promise<ApiComment[]> {
        const query = this.repository.createQueryBuilder('api_comments').leftJoinAndSelect('api_comments.user', 'user').leftJoinAndSelect('api_comments.api', 'api');

        if (options.id) query.andWhere('api_comments.id = :id', { id: options.id });
        if (options.content) query.andWhere('api_comments.content = :content', { content: options.content });
        if (options.user) query.andWhere('api_comments.user = :user', { user: options.user });
        if (options.parent) query.andWhere('api_comments.parent = :parent', { parent: options.parent });
        if (options.api) query.andWhere('api.id = :apiId', { apiId: options.api.id });

        return query.getMany();
    }

    public async create(comment: Partial<ApiComment>): Promise<ApiComment> {
        const newComment = this.repository.create(comment);
        const savedComment = await this.repository.save(newComment);
        return savedComment;
    }

    public async update(comment: ApiComment): Promise<ApiComment> {
        return this.repository.save(comment);
    }

    public async delete(id: string): Promise<void> {
        const deleteResult = await this.repository.delete(id);
        if (deleteResult.affected === 0) {
            throw new AppError(404, 'ApiComment not found');
        }
    }
}
