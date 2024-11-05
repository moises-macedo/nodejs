import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repositorie'
import { SearchGymsUseCase } from '../search-gyms/search-gyms'

export function makeSearchGymsUseCase() {
  const prisma = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(prisma)

  return useCase
}
