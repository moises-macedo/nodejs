import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { user } from './routes/routes.ts'
import { errorHandler } from './errors/middleware';

export const app = fastify()
app.setErrorHandler(errorHandler)
/* app.register(cookie) */
app.register(user, {
  prefix: 'user',
})
