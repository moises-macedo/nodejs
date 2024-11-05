import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repositorie'
import { CreateGymsUseCase } from '../CreateGyms/gyms'

export function makeCreateGymUseCase() {
  const prisma = new PrismaGymsRepository()
  const useCase = new CreateGymsUseCase(prisma)

  return useCase
}
