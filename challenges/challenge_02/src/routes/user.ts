import { FastifyInstance } from "fastify"
import { randomUUID } from 'node:crypto'
import { knex as knexDb } from '../database'
import { z } from 'zod';

export async function user(app: FastifyInstance) {

  app.post('/', async (req, res) => {
    const createUsersBody = z.object({
      name: z.string({ message: 'Name is required' }).min(3, 'Name is required'),
      email: z.string({ message: 'E-mail is required' })
        .min(8, { message: 'This field has to be filled' })
        .email('This is not a valid email')

    })
    const { email, name } = createUsersBody.parse(req.body)

    const user = await knexDb('users').where('email', email).first()

    if (user) {
      return res.status(400).send({ message: 'User already exists' })
    }

    await knexDb('users').insert({
      id: randomUUID(),
      name,
      email,
    })

    return res.status(201).send()
  })
  app.post('/login', async (req, res) => {
    const loginUserBody = z.object({
      email: z.string({ message: 'E-mail is required' })
        .min(8, { message: 'This field has to be filled' })
        .email('This is not a valid email')

    })

    const { email } = loginUserBody.parse(req.body)
    const user = await knexDb('users').where('email', email).first()

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    res.cookie('sessionId', user.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }) 

    return res.status(201).send()
  })
}