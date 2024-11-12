import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/primas'
import { hash } from 'bcrypt'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  roleUser: 'ADMIN' | 'MEMBER',
) {
  await request(app.server).post('/users').send({})
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 10),
      role: roleUser,
    },
  })

  const authRes = await request(app.server).post('/users/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authRes.body

  return { token }
}
