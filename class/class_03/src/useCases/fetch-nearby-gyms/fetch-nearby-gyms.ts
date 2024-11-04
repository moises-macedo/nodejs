import { GymsRepository } from '@/repositories'

import { Gym } from '@prisma/client'

interface FetchNearbyGymsReq {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsReq): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
