import { FastifyInstance } from 'fastify'
import { createGym } from '../controllers'
import { verifyJWT } from '../middlewares'
import { nearby } from '../controllers/gyms/Nearby/nearby'
import { search } from '../controllers/gyms/Search/search'

export async function checkIn(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gym', createGym)
  app.get('/gym/nearby', nearby)
  app.get('/gym/search', search)
}
