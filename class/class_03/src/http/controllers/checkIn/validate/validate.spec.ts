import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test'

describe('Validate Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to validate a check-in', async () => {
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

    const {
      body: { gyms },
    } = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Gym One',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const {
      body: { checkIn },
    } = await request(app.server)
      .post(`/check-ins/${gyms[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -25.5595683,
      })

    const { statusCode } = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    const list = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const checkInValidate = list.body.checkIns.find(
      (el: ReturnType<typeof checkIn>) => el.id === checkIn.id,
    )

    expect(statusCode).toEqual(204)
    expect(checkIn.validated_at).toEqual(null)
    expect(checkInValidate.validated_at).toEqual(expect.any(String))
  })
})
