import { FastifyInstance } from 'fastify'
import { createUser } from '../controllers/CreateUser'

export async function user(app: FastifyInstance) {
  app.post('/users', createUser)
}
