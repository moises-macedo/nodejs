import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { AppError } from './appError'

export function errorHandler(
  err: Error,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  if (err instanceof ZodError) {
    const zodError = err as ZodError
    const errorMessage = zodError.errors
      .map((error) => `${error.path.join('.')} - ${error.message}`)
      .join(', ')
    return reply.status(400).send({
      status: 'error',
      message: errorMessage,
    })
  } else if (err instanceof AppError) {
    return reply.status(err.statusCode).send({
      status: 'error',
      message: err.message,
    })
  } else {
    return reply.status(500).send({
      status: 'error',
      message: 'Internal server error',
    })
  }
}