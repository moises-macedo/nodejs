// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amout: number
      created_at: Date
      session_id?: string
    }
  }
}
