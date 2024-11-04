import { GymsRepository } from '@/repositories'
import { Gym } from '@prisma/client'

interface CreateGymsUseCaseReq {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymsUseCaseResponse {
  gym: Gym
}

export class CreateGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(el: CreateGymsUseCaseReq): Promise<CreateGymsUseCaseResponse> {
    const gym = await this.gymsRepository.create(el)

    return { gym }
  }
}
