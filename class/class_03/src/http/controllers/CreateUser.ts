import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { createUserUseCase } from '@/useCases/createUser'

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  try{

    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
  
    const { email, name, password } = registerBodySchema.parse(req.body)
  
    const result = await createUserUseCase({email,name,password})
    console.log(result)
    return res.status(201).send()
  }
  catch(erro){
    if(erro instanceof Error)
      res.status(409).send(erro.message)
  }
}
