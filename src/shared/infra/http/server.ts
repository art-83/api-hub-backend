import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dataSource } from '../../../@config/data-source.config';
import { router } from '../routers';

dotenv.config();

async function main() {
    const app = express();
    const port = process.env.PORT;

    app.use(cors());
    app.use(express.json());
    app.use(router);

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
