import {} from '@/errors'
import { makeCreateGymUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGym(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    description: z.string().nullable(),
    phone: z.string().nullable(),
    title: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, phone, title, latitude, longitude } =
    registerBodySchema.parse(req.body)

  await makeCreateGymUseCase().execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  })

  return res.status(201).send()
}
