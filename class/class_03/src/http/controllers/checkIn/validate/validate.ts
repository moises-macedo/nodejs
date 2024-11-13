import { makeValidateCheckInUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)

  const { checkIn } = await makeValidateCheckInUseCase().execute({
    checkInId,
  })

  return res.status(204).send({ checkIn })
}
