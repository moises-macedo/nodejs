import { InvalidCredentialsError } from '@/errors'

import { FastifyReply, FastifyRequest } from 'fastify'

export const refreshToken = async (req: FastifyRequest, res: FastifyReply) => {
  await req.jwtVerify({ onlyCookie: true })
  try {
    const { role, sub } = req.user
    const token = await res.jwtSign(
      { role },
      {
        sign: {
          sub,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      { role },
      {
        sign: {
          sub,
          expiresIn: '7d',
        },
      },
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (erro) {
    if (erro instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: erro.message })
    }
    throw erro
  }
}
