import { Options } from '@mikro-orm/core';
import { Note } from '../../domain/note.entity';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options = {
  entities: [Note],
  dbName: process.env.POSTGRES_DB || 'notesdb',
  driver: PostgreSqlDriver,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'root',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  migrations: {
    path: './src/migrations',
    fileName: (timestamp: string) => `migration-${timestamp}.ts`,
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default config;
