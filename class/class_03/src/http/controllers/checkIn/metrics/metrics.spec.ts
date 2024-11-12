import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test'

describe('Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
    vi.useFakeTimers()
  })
  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })
  it('should be able to get the count of check ins', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

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

    const {
      body: { gyms },
    } = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Gym One',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const gym_id = gyms[0].id

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await request(app.server)
      .post(`/check-ins/${gym_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -25.5595683,
      })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    await request(app.server)
      .post(`/check-ins/${gym_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -25.5595683,
      })

    const { body, statusCode } = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(statusCode).toEqual(200)
    expect(body.checkInsCount).toEqual(2)
  })
})
