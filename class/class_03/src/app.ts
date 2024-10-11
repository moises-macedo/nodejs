import fastify from 'fastify'
import { user } from './http/routes/users'
import { ZodError } from 'zod'

export const app = fastify()

app.register(user)

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    const zodError = err as ZodError
    const errorMessage = zodError.errors
      .map((error) => `${error.path.join('.')} - ${error.message}`)
      .join(', ')
    return reply.status(400).send({
      status: 'error',
      message: errorMessage,
    })
  } else if (err instanceof Error) {
    console.error(err)
    return reply.status(Number(err.code)).send({
      status: 'error',
      message: err.message,
    })
  } else {
    return reply.status(500).send({
      status: 'error',
      message: 'Internal server error',
    })
  }
})
