import { Request, Response } from 'express';
import { CreateApiService } from '@src/modules/api/services/create-api.service';
import { FindAllApisService } from '@src/modules/api/services/find-all-apis.service';
import { FindOneApiService } from '@src/modules/api/services/find-one-api.service';
import { UpdateApiService } from '@src/modules/api/services/update-api.service';
import { DeleteApiService } from '@src/modules/api/services/delete-api.service';
import { ApiDto } from '@src/modules/api/dtos/api.dto';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { container } from 'tsyringe';

export class ApiController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const data = request.body as ApiDto;
            const createApiService = container.resolve(CreateApiService);
            const api = await createApiService.excecute(data);
            return response.status(201).json(api);
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.code).json({ message: error.message });
            }
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    }

    public async findAll(request: Request, response: Response): Promise<Response> {
        try {
            const findAllApisService = container.resolve(FindAllApisService);
            const apis = await findAllApisService.excecute();
            return response.status(200).json(apis);
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.code).json({ message: error.message });
            }
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    }

    public async findOne(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            if (!id) throw new AppError(400, 'Id is required');

            const findOneApiService = container.resolve(FindOneApiService);
            const api = await findOneApiService.excecute(id);
            return response.status(200).json(api);
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.code).json({ message: error.message });
            }
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            if (!id) throw new AppError(400, 'Id is required');

            const data = request.body as Partial<ApiDto>;
            const updateApiService = container.resolve(UpdateApiService);
            const api = await updateApiService.excecute(id, data);
            return response.status(200).json(api);
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.code).json({ message: error.message });
            }
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            if (!id) throw new AppError(400, 'Id is required');
            const deleteApiService = container.resolve(DeleteApiService);
            await deleteApiService.excecute(id);
            return response.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.code).json({ message: error.message });
            }
            console.error(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    }
}
