import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares'

import {
  createCheckIn,
  history,
  metrics,
  validate,
} from '../controllers/checkIn'

export async function checkIn(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/check-ins/:gymId', createCheckIn)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.patch('/check-ins/:checkInId/validate', validate)
}
