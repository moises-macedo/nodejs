import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repositorie'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms/fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const prisma = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(prisma)

  return useCase
}
