import { makeFetchNearbyGymsUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyQuerySchema.parse(req.query)

  const { gyms } = await makeFetchNearbyGymsUseCase().execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(200).send({ gyms })
}
