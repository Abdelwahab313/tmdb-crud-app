import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const createTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') ?? 'localhost',
  port: configService.get<number>('DB_PORT') ?? 5432,
  username: configService.get<string>('DB_USER') ?? 'postgres',
  password: configService.get<string>('DB_PASSWORD') ?? 'postgres',
  database: configService.get<string>('DB_NAME') ?? 'mydatabase',
  entities: [join(__dirname, '../modules/**/*.entity.{ts,js}')],
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<string>('NODE_ENV') !== 'production',
});
export default createTypeOrmConfig;
