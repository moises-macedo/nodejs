import { FastifyInstance } from 'fastify'
import { createUser, authenticate } from '../controllers'

export async function user(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/users/sessions', authenticate)
}
