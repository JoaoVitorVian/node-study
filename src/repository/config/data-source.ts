import { DataSource } from 'typeorm';
import { User } from '../../entities/user';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'node_project',
  entities: [User],
  synchronize: false, // Never use true in production!
  migrations: ['src/repository/migrations/*.ts'],
  migrationsRun: true,
  logging: true
});

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};