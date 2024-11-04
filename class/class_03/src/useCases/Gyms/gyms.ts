import { ResourceNotFound } from '@/errors'
import { GymsRepository } from '@/repositories'
import { Gym } from '@prisma/client'

interface GymsUseCaseReq {
  userId: string
  gymId: string
}

interface GymsUseCaseResponse {
  gym: Gym
}

export class GymsUseCase {
  constructor(private GymsRepository: GymsRepository) {}

  async execute({
    userId: user_id,
    gymId: gym_id,
  }: GymsUseCaseReq): Promise<GymsUseCaseResponse> {
    const GymsOnSameDay = await this.GymsRepository.findByUserIdOnDate(
      user_id,
      new Date(),
    )

    if (GymsOnSameDay) {
      throw new ResourceNotFound()
    }

    const gym = await this.GymsRepository.create({
      gym_id,
      user_id,
    })

    return { gym }
  }
}
