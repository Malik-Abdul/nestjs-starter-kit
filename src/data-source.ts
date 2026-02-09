import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

/**
 * Used by TypeORM CLI for migrations (migration:run, migration:generate).
 * The Nest app uses TypeOrmModule in app.module.ts and does not use this file.
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
