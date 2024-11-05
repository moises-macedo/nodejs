import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorie'
import { GetUserProfileUseCase } from '../GetUserProfile/getUserProfile'

export function makeGetUserProfileUseCase() {
  const prisma = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prisma)

  return useCase
}
