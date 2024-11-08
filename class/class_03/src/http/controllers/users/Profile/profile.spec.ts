import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authRes = await request(app.server).post('/users/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authRes.body

    const res = await request(app.server)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(res.body)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
