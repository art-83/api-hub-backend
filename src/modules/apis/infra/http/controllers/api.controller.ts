import { Request, Response } from 'express';
import { CreateApiService } from '@src/modules/apis/services/create-api.service';
import { UpdateApiService } from '@src/modules/apis/services/update-api.service';
import { DeleteApiService } from '@src/modules/apis/services/delete-api.service';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { container } from 'tsyringe';
import { FindApiService } from '@src/modules/apis/services/find-api.service';
import { Api } from '../../orm/entities/api.entity';

export class ApiController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as Partial<Api>;
        const user = request.user;
        const createApiService = container.resolve(CreateApiService);
        const api = await createApiService.excecute(data, user);
        return response.status(201).json(api);
    }

    public async find(request: Request, response: Response): Promise<Response> {
        const data = request.params as Partial<Api>;
        const findApisService = container.resolve(FindApiService);
        const apis = await findApisService.excecute(data);
        return response.status(200).json(apis);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        if (!id) throw new AppError(400, 'Id is required');
        const data = request.body as Partial<Partial<Api>>;
        const updateApiService = container.resolve(UpdateApiService);
        const api = await updateApiService.excecute(id, data);
        return response.status(200).json(api);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        if (!id) throw new AppError(400, 'Id is required');
        const deleteApiService = container.resolve(DeleteApiService);
        await deleteApiService.excecute(id);
        return response.status(204).send();
    }
}
