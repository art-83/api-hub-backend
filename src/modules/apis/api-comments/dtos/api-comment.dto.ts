import { ApiComment } from '../infra/orm/entities/api-comment.entity';

export interface ApiCommentDTO extends ApiComment {
    api_id?: string;
    parent_id?: string;
}
