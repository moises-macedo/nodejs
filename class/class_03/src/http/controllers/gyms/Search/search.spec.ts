import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Create gym',
        title: 'Gym One',
        phone: '+55410000000000',
        latitude: -27.2092052,
        longitude: -25.5595683,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Create gym',
        title: 'Gym Two',
        phone: '+55410000000000',
        latitude: -27.2092052,
        longitude: -25.5595683,
      })

    const { statusCode, body } = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Gym Two',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(statusCode).toEqual(200)
    expect(body.gyms).toHaveLength(1)
    expect(body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Two',
      }),
    ])
  })
})
