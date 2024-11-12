import { FastifyInstance } from 'fastify'
import { verifyJWT, verifyUserRole } from '../middlewares'
import { createGym, nearby, search } from '../controllers/gyms'

export async function gyms(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gym', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
  app.get('/gyms/nearby', nearby)
  app.get('/gyms/search', search)
}
