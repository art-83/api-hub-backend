import { Router } from 'express';
import { apiRouter } from '@src/modules/api/infra/http/routers/api.router';

const router = Router();

router.use('/apis', apiRouter);

export { router };
