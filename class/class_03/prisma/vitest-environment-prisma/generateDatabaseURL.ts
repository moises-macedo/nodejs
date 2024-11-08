import 'dotenv/config'
import { UUID } from 'node:crypto'
type generateDatabaseURLProps = {
  schema: UUID
}
export function generateDatabaseURL({ schema }: generateDatabaseURLProps) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}
