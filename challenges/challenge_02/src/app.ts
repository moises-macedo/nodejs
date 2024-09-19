import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { meal, user } from './routes/routes.ts'

export const app = fastify()
app.register(cookie)
app.register(user, {
  prefix: 'user',
})
app.register(meal, {
  prefix: 'meal',
})