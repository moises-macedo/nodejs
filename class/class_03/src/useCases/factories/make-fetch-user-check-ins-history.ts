import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositorie'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history/fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const prisma = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(prisma)

  return useCase
}
