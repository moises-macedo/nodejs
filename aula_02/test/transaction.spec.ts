import { test, beforeAll, afterAll, describe } from 'vitest'
import supertest from 'supertest'
import { app } from '../src/app'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  test('User can create a new transaction', async () => {
    await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'teste 2',
        amout: 1000,
        type: 'CREDIT_CARD',
      })
      .expect(201)
  })
})
