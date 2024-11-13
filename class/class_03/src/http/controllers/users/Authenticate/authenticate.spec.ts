import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to login', async () => {
    await createAndAuthenticateUser(app, 'ADMIN')

    const res = await request(app.server).post('/users/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      token: expect.any(String),
    })
  })
})
