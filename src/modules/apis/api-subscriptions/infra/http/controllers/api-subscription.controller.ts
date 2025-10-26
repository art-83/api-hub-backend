import { Request, Response } from 'express';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { container } from 'tsyringe';
import { CreateApiSubscriptionService } from '../../../services/create-api-subscription.service';
import { FindApiSubscriptionService } from '../../../services/find-api-subscription.service';
import { ApiSubscriptionDTO } from '../../../dtos/api-subscription.dto';
import { DeleteApiSubscriptionService } from '../../../services/delete-api-subscription.service';

export class SubscriptionController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as ApiSubscriptionDTO;
        const user = request.user;
        const createApiSubscriptionService = container.resolve(CreateApiSubscriptionService);
        const subscription = await createApiSubscriptionService.execute(data, user);
        return response.status(201).json(subscription);
    }

    public async find(request: Request<{}, {}, {}, ApiSubscriptionDTO>, response: Response): Promise<Response> {
        const data = request.query;
        const findApiSubscriptionService = container.resolve(FindApiSubscriptionService);
        const subscriptions = await findApiSubscriptionService.execute(data);
        return response.status(200).json(subscriptions);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        if (!id) throw new AppError(400, 'Id is required');
        const user = request.user;
        const deleteApiSubscriptionService = container.resolve(DeleteApiSubscriptionService);
        await deleteApiSubscriptionService.execute(id, user);
        return response.status(204).send();
    }
}
