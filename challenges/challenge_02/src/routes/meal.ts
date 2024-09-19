import { FastifyInstance } from "fastify"
import { randomUUID } from 'node:crypto'
import { knex as knexDb } from '../database'
import { z } from 'zod';

export async function meal(app: FastifyInstance) {

  app.post('/', async (req, res) => {

    const createtransActionsBody = z.object({
      name: z.string({ message: 'Name is required' }).min(3, 'Name is required'),
      description: z.string({ message: 'Description is required' })
        .min(4, { message: 'This field has to be filled' }),
      isDiet: z.boolean({ message: "it's a diet?" })


    })
    const { description, isDiet, name } = createtransActionsBody.parse(req.body)

    console.log(req.cookies.sessionId)
    await knexDb('meals').insert({
      id: randomUUID(),
      name,
      description,
      isDiet,
      user_id: req.cookies.sessionId
    })

    return res.status(201).send()
  })
}