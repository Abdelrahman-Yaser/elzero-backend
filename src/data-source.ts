// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { Product } from './modules/products/entities/product.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'mydb',
  entities: [],
  migrations: ['dist/migrations/*{.ts,.js}'], // مهم عشان migrations
  synchronize: true, // خليها false لما تستخدم migrations
});
