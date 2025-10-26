import { Router } from 'express';
import { apiRouter } from '@src/modules/apis/infra/http/routers/api.router';

import { userRouter } from '@src/modules/users/infra/http/routers/user.router';

const router = Router();

router.use('/apis', apiRouter);
router.use('/users', userRouter);

export { router };
