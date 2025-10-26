import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { CommentController } from '../controllers/api-comment.controller';
import { AuthMiddleware } from '@src/shared/middlewares/auth.middleware';

const commentRouter = Router();
commentRouter.use(new AuthMiddleware().use);

const commentController = new CommentController();

commentRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            content: Joi.string().required(),
            parent_id: Joi.string().uuid().optional(),
            api_id: Joi.string().uuid().required(),
        },
    }),
    commentController.create,
);

commentRouter.get(
    '/',
    celebrate({
        [Segments.QUERY]: {
            id: Joi.string().uuid().optional(),
            content: Joi.string().optional(),
            user_id: Joi.string().uuid().optional(),
            parent_id: Joi.string().uuid().optional(),
            api_id: Joi.string().uuid().optional(),
        },
    }),
    commentController.find,
);

commentRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            content: Joi.string().optional(),
        },
    }),
    commentController.update,
);

commentRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    commentController.delete,
);

export { commentRouter };
