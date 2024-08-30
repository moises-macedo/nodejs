import { test, beforeAll, afterAll, describe, expect } from 'vitest'
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

  test('Should be able to list all transactions', async () => {
    const transactionValue = {
      title: `teste ${Math.random() * 10}`,
      amout: 1000,
    }
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({ ...transactionValue, type: 'CREDIT_CARD' })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies as string[])
      .expect(200)
      .then((res) => res.body)

    expect(listTransactionsResponse).toEqual([
      expect.objectContaining({
        ...transactionValue,
      }),
    ])

    console.log(listTransactionsResponse)
  })
})
