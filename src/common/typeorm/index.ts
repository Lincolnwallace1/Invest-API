import { registerAs } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import Entities from './entities';
import Migrations from './migrations';

config();

const configService = new ConfigService();

const dataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  logging: false,
  entities: Entities,
  migrations: Migrations,
  synchronize: false,
};

export default registerAs('typeorm', () => dataSourceOptions);
export const connectionSource = new DataSource(
  dataSourceOptions as DataSourceOptions,
);
