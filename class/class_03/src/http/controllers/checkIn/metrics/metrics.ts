import { makeGetUserMetricsUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  const userId = req.user.sub

  const { checkInsCount } = await makeGetUserMetricsUseCase().execute({
    userId,
  })

  return res.status(200).send({ checkInsCount })
}
