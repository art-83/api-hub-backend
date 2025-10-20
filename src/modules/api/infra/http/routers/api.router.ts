import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ApiController } from '../controllers/api.controller';
import { AuthMiddleware } from '@src/shared/middlewares/auth.middleware';

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

apiRouter.get('/', apiController.findAll);

apiRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    apiController.findOne,
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

export { apiRouter };