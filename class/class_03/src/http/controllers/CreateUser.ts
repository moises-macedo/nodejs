import { PrismaUsersRepositorie } from '@/repositories/prisma-users-repositorie'
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
    const prisma = new PrismaUsersRepositorie()
    await new CreateUserCase(prisma).execute({ email, name, password })


    return res.status(201).send()
  } catch (erro) {
    if (erro instanceof Error) res.status(409).send(erro.message)
  }
}
