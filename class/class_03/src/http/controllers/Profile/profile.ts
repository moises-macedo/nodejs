import { makeGetUserProfileUseCase } from '@/useCases/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const userId = req.user.sub
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId,
  })

  return res.status(201).send(user)
}
