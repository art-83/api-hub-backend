import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: Boolean(process.env.TYPEORM_SYNCRONIZE),
    entities: [__dirname + process.env.TYPEORM_ENTITIES],
    dropSchema: true,
});
