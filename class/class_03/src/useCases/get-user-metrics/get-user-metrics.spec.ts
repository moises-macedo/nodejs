import { expect, it, describe, beforeEach } from 'vitest'

import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_one',
      user_id: 'user_one',
    })

    await checkInsRepository.create({
      gym_id: 'gym_two',
      user_id: 'user_one',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user_one',
    })

    expect(checkInsCount).toEqual(2)
  })
})
