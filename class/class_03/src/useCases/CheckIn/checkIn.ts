import {
  MaxdistanceError,
  MaxNumberOfCheckInsError,
  ResourceNotFound,
} from '@/errors'
import { CheckInsRepository, GymsRepository } from '@/repositories'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseReq {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId: user_id,
    gymId: gym_id,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseReq): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gym_id)

    if (!gym) throw new ResourceNotFound()

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxdistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      user_id,
      new Date(),
    )

    if (checkInOnSameDay) throw new MaxNumberOfCheckInsError()

    const checkIn = await this.checkInsRepository.create({
      gym_id,
      user_id,
    })

    return { checkIn }
  }
}
