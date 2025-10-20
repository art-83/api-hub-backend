import 'reflect-metadata';
import '../../containers/index';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dataSource } from '../../../@config/database/data-source.config';
import { router } from './routers';

import { AuthMiddleware } from '@src/shared/middlewares/auth.middleware';
import { GlobalErrorHandlerMiddleware } from '@src/shared/middlewares/global-error-handler.middleware';

dotenv.config();

async function main() {
    const app = express();
    const port = process.env.PORT;
    const authMiddleware = new AuthMiddleware();
    const globalErrorHandler = new GlobalErrorHandlerMiddleware();

    app.use(cors());
    app.use(express.json());

    app.use(router);

    app.use(authMiddleware.use);

    app.use(globalErrorHandler.use);

    dataSource
        .initialize()
        .then(() => {
            app.listen(port, () => {
                console.log(`http://localhost:${port}`);
            });
            router.use('/', (req, res) => {
                return res.send('Hello, world!');
            });
        })
        .catch((error) => console.log(error));
}

main();