import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const user = await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  const authRes = await request(app.server).post('/users/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authRes.body

  return { user, token }
}
