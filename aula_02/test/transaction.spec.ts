import { test, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import supertest from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
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
  })

  test('Should be able to get specific transaction', async () => {
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
    const id = listTransactionsResponse.at(0).id

    const getTransactionsResponse = await supertest(app.server)
      .get(`/transactions/${id}`)
      .set('Cookie', cookies as string[])
      .expect(200)
      .then((res) => res.body)

    expect(id).toEqual(getTransactionsResponse.id)
  })

  test('should be able to get the summary', async () => {
    const transactionValue = {
      title: `teste ${Math.random() * 10}`,
      amout: 5000,
    }
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({ ...transactionValue, type: 'CREDIT_CARD' })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await supertest(app.server)
      .post('/transactions')
      .set('Cookie', cookies as string[])
      .send({
        title: `teste ${Math.random() * 10}`,
        amout: 2000,
        type: 'DEBIT',
      })

    const summaryTransactionsResponse = await supertest(app.server)
      .get(`/transactions/summary`)
      .set('Cookie', cookies as string[])
      .expect(200)
      .then((res) => res.body)

    expect(summaryTransactionsResponse).toEqual({ amout: 3000 })
  })
})
