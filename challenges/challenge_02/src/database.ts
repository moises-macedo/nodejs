import { knex as setupKnex } from 'knex'
import { env } from './env'

const databaseCliente = env.DATABASE_CLIENT

export const config = {
  client: databaseCliente,
  connection:
    databaseCliente === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
