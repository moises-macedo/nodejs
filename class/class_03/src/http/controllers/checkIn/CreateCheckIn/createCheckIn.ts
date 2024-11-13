import { makeCheckInUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckIn(req: FastifyRequest, res: FastifyReply) {
  const userId = req.user.sub
  const registerParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const registerBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = registerBodySchema.parse(req.body)
  const { gymId } = registerParamsSchema.parse(req.params)

  const { checkIn } = await makeCheckInUseCase().execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId,
  })

  return res.status(201).send({ checkIn })
}
