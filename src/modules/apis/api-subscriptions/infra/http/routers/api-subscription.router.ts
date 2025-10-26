import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { SubscriptionController } from '../controllers/api-subscription.controller';
import { AuthMiddleware } from '@src/shared/middlewares/auth.middleware';

const apiSubscriptionRouter = Router();

apiSubscriptionRouter.use(new AuthMiddleware().use);
const subscriptionController = new SubscriptionController();

apiSubscriptionRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            api_id: Joi.string().uuid().required(),
        },
    }),
    subscriptionController.create,
);

apiSubscriptionRouter.get(
    '/',
    celebrate({
        [Segments.QUERY]: {
            id: Joi.string().uuid().optional(),
            user_id: Joi.string().uuid().optional(),
            api_id: Joi.string().uuid().optional(),
        },
    }),
    subscriptionController.find,
);

apiSubscriptionRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    subscriptionController.delete,
);

export { apiSubscriptionRouter };
