import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'medical_records_unt',
  synchronize: true,
  entities: ['src//*.entity.ts'],
  migrations: ['src/database/migrations//*.ts'],
});
