import { ValidateCheckInUseCase } from '../validate-check-in/validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositorie'

export function makeValidateCheckInUseCase() {
  const prisma = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(prisma)

  return useCase
}
