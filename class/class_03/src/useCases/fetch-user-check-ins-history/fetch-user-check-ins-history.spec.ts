import { expect, it, describe, beforeEach } from 'vitest'

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_one',
      user_id: 'user_one',
    })

    await checkInsRepository.create({
      gym_id: 'gym_two',
      user_id: 'user_one',
    })

    const { checkIns } = await sut.execute({
      userId: 'user_one',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_one' }),
      expect.objectContaining({ gym_id: 'gym_two' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 0; i <= 21; i++) {
      await checkInsRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user_one',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_one',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_20' }),
      expect.objectContaining({ gym_id: 'gym_21' }),
    ])
  })
})
