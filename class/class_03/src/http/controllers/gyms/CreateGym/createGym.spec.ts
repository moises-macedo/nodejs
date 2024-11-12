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
  it('should be able to register gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const res = await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Create gym',
        title: 'Gym One',
        phone: '+55410000000000',
        latitude: -27.2092052,
        longitude: -25.5595683,
      })

    expect(res.statusCode).toEqual(201)
  })
})
