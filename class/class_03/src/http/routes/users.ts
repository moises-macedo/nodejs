import { FastifyInstance } from 'fastify'
import { createUser, authenticate, profile } from '../controllers/users'
import { verifyJWT } from '../middlewares'

export async function user(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/users/sessions', authenticate)

  app.get('/users/profile', { onRequest: [verifyJWT] }, profile)
}
