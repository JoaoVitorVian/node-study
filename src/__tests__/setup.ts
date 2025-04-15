import { AppDataSource } from '../repository/config/database';

// Configuração do banco de dados de teste
process.env.DB_NAME = 'test_db';
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterEach(async () => {
  const entities = AppDataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = AppDataSource.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  }
});