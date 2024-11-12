import { makeFetchUserCheckInsHistoryUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const userId = req.user.sub
  const historyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyQuerySchema.parse(req.params)

  const { checkIns } = await makeFetchUserCheckInsHistoryUseCase().execute({
    page,
    userId,
  })

  return res.status(200).send({ checkIns })
}
