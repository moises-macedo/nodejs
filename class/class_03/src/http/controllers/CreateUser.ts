import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorie'
import { CreateUserCase } from '@/useCases/createUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, name, password } = registerBodySchema.parse(req.body)
    const prisma = new PrismaUsersRepository()
    await new CreateUserCase(prisma).execute({ email, name, password })

    return res.status(201).send()
  } catch (erro) {
    if (erro instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: erro.message })
    }
    throw erro
  }
}
