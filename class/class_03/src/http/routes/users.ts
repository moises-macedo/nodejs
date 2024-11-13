import { FastifyInstance } from 'fastify'
import {
  createUser,
  authenticate,
  profile,
  refreshToken,
} from '../controllers/users'
import { verifyJWT } from '../middlewares'

export async function user(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/users/sessions', authenticate)

  app.patch('/token/refresh', refreshToken)

  app.get('/users/profile', { onRequest: [verifyJWT] }, profile)
}
