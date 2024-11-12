import '@fastify/jwt'

export declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      role: 'ADMIN' | 'MEMBER'
      sub: string
    }
  }
}
