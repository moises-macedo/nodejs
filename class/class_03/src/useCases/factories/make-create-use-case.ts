import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorie'
import { CreateUserCase } from '../CreateUser/createUser'

export function makeCreateUserCase() {
  const prisma = new PrismaUsersRepository()
  const createUserCase = new CreateUserCase(prisma)

  return createUserCase
}
