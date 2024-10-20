import { DataSource, DataSourceOptions } from 'typeorm';
import createTypeOrmConfig from './ormConfig';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const dataSourceOptions = createTypeOrmConfig(configService);

export const AppDataSource = new DataSource(dataSourceOptions as DataSourceOptions);

// async function testConnection() {
//   try {
//     await AppDataSource.initialize();
//     console.log('Connection successful');
//     await AppDataSource.destroy();
//   } catch (error) {
//     console.error('Connection failed', error);
//   }
// }

// testConnection();
