import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'
import { generateDatabaseURL } from './generateDatabaseURL'
import { execSync } from 'node:child_process'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL({ schema })
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
  transformMode: 'ssr',
}
