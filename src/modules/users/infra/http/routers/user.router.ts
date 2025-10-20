import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { UserController } from '../controllers/user.controller';

import { AuthMiddleware } from '@src/shared/middlewares/auth.middleware';

const userRouter = Router();
const userController = new UserController();
const authMiddleware = new AuthMiddleware();

userRouter.post(
    '/register',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            github: Joi.string().optional(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    userController.create,
);

userRouter.post(
    '/login',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    userController.login,
);

userRouter.use(authMiddleware.use);

export { userRouter };
