import { makeSearchGymsUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, query } = searchQuerySchema.parse(req.query)

  const { gyms } = await makeSearchGymsUseCase().execute({
    page,
    query,
  })

  return res.status(200).send({ gyms })
}
