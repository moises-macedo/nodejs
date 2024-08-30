import { FastifyReply, FastifyRequest } from 'fastify'

export const checkSessionIdExists = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { sessionId } = req.cookies
  if (!sessionId) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
