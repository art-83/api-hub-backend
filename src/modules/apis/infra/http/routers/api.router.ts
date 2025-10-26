import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ApiController } from '../controllers/api.controller';
import { AuthMiddleware } from '@src/shared/middlewares/auth.middleware';
import { apiSubscriptionRouter } from '@src/modules/apis/api-subscriptions/infra/http/routers/api-subscription.router';

const apiRouter = Router();
apiRouter.use(new AuthMiddleware().use);

const apiController = new ApiController();

apiRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            description: Joi.string(),
            github: Joi.string().optional(),
            deploy_url: Joi.string().optional(),
            type: Joi.string().valid('HTML', 'MD'),
            text_content: Joi.string(),
        },
    }),
    apiController.create,
);

apiRouter.get(
    '/',
    celebrate({
        [Segments.QUERY]: {
            id: Joi.string().uuid().optional(),
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            github: Joi.string().optional(),
            deploy_url: Joi.string().optional(),
            type: Joi.string().valid('HTML', 'MD').optional(),
            text_content: Joi.string().optional(),
        },
    }),
    apiController.find,
);

apiRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            github: Joi.string().optional(),
            deploy_url: Joi.string().optional(),
            type: Joi.string().valid('HTML', 'MD').optional(),
            text_content: Joi.string().optional(),
        },
    }),
    apiController.update,
);

apiRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    apiController.delete,
);

apiRouter.use('/subscription', apiSubscriptionRouter);

export { apiRouter };
