import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorie'
import { AuthenticateUseCase } from '../Authenticate/authenticate'

export function makeAuthenticateUseCase() {
  const prisma = new PrismaUsersRepository()
  const authenticate = new AuthenticateUseCase(prisma)

  return authenticate
}
