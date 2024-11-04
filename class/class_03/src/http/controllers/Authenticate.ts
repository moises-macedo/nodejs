import { InvalidCredentialsError } from '@/errors'
import { makeAuthenticateUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(req.body)

    await makeAuthenticateUseCase().execute({ email, password })

    return res.status(200).send({})
  } catch (erro) {
    if (erro instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: erro.message })
    }
    throw erro
  }
}
