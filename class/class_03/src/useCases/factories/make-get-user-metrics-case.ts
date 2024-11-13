import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositorie'
import { GetUserMetricsUseCase } from '../get-user-metrics/get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const prisma = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(prisma)

  return useCase
}
