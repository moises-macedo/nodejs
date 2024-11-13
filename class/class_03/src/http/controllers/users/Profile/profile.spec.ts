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
  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const res = await request(app.server)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
