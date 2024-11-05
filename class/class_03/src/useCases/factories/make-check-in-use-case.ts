import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositorie'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repositorie'
import { CheckInUseCase } from '../CheckIn/checkIn'

export function makeCheckInUseCase() {
  const prisma = new PrismaCheckInsRepository()
  const gyms = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(prisma, gyms)

  return useCase
}
