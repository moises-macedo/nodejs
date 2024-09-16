import { FastifyInstance } from "fastify"
import { randomUUID } from 'node:crypto'
import { knex as knexDb } from '../database'
import { z } from 'zod';

export async function user(app: FastifyInstance) {

  app.post('/', async (req, res) => {
    const createtransActionsBody = z.object({
      name: z.string({message:'Name is required'}).min(3,'Name is required'),
      email: z.string({message:'E-mail is required'})
        .min(8, { message: 'This field has to be filled' })
        .email('This is not a valid email')

    })
    const { email, name } = createtransActionsBody.parse(req.body)


    await knexDb('users').insert({
      id: randomUUID(),
      name,
      email,  
    })

    return res.status(201).send()
  })
}