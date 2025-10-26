import { Request, Response } from 'express';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { container } from 'tsyringe';
import { CreateApiCommentService } from '../../../services/create-api-comment.service';
import { FindApiCommentService } from '../../../services/find-api-comment.service';
import { ApiCommentDTO } from '../../../dtos/api-comment.dto';
import { UpdateApiCommentService } from '../../../services/update-api-comment.service';
import { DeleteApiCommentService } from '../../../services/delete-api-comment.service';

export class CommentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as ApiCommentDTO;
        const user = request.user;
        const createApiCommentService = container.resolve(CreateApiCommentService);
        const comment = await createApiCommentService.execute(data, user);
        return response.status(201).json(comment);
    }

    public async find(request: Request<{}, {}, {}, ApiCommentDTO>, response: Response): Promise<Response> {
        const data = request.query;
        const findApiCommentService = container.resolve(FindApiCommentService);
        const comments = await findApiCommentService.execute(data);
        return response.status(200).json(comments);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        if (!id) throw new AppError(400, 'Id is required');
        const data = request.body as Partial<ApiCommentDTO>;
        const user = request.user;
        const updateApiCommentService = container.resolve(UpdateApiCommentService);
        const comment = await updateApiCommentService.execute(id, data, user);
        return response.status(200).json(comment);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        if (!id) throw new AppError(400, 'Id is required');
        const user = request.user;
        const deleteApiCommentService = container.resolve(DeleteApiCommentService);
        await deleteApiCommentService.execute(id, user);
        return response.status(204).send();
    }
}
