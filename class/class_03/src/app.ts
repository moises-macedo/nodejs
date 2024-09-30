import fastify from 'fastify'
import { user } from './http/routes/users'

export const app = fastify()

app.register(user)
