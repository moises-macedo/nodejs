import { randomUUID } from 'node:crypto'
import { knex as knexDb } from './database'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { checkSessionIdExists } from './middlewares/check-session-id-exists'

export async function transActionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const { sessionId } = req.cookies

    const trasActionsAll = await knexDb('transactions')
      .where('session_id', sessionId)
      .select('')
    return res.status(200).send(trasActionsAll)
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const { sessionId } = req.cookies
    const transActionId = z.object({
      id: z.string().uuid(),
    })

    const { id } = transActionId.parse(req.params)
    const trasAction = (
      await knexDb('transactions').where({ id, session_id: sessionId })
    ).at(0)
    return res.status(200).send(trasAction)
  })

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const { sessionId } = req.cookies
      const trasAction = (
        await knexDb('transactions')
          .where('session_id', sessionId)
          .sum('amout', { as: 'amout' })
      ).at(0)
      return res.status(200).send(trasAction)
    },
  )

  app.post('/', async (req, res) => {
    const createtransActionsBody = z.object({
      title: z.string().min(3),
      type: z.enum(['CREDIT_CARD', 'DEBIT']),
      amout: z.number(),
    })
    const { title, amout, type } = createtransActionsBody.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    await knexDb('transactions').insert({
      id: randomUUID(),
      title,
      amout: type === 'CREDIT_CARD' ? amout : amout * -1,
      session_id: sessionId,
    })

    return res.status(201).send()
  })
}
