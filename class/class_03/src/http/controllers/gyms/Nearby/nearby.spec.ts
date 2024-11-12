import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to  list nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: null,
        phone: null,
        latitude: -27.0747279,
        longitude: -49.4889672,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.5229501,
      })

    const { statusCode, body } = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.0747279,
        longitude: -49.4889672,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(statusCode).toEqual(200)
    expect(body.gyms).toHaveLength(1)
    expect(body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })
})
