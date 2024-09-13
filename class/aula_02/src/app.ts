import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transActionsRoutes } from './routes'

export const app = fastify()

app.register(cookie)
app.register(transActionsRoutes, {
  prefix: 'transactions',
})
