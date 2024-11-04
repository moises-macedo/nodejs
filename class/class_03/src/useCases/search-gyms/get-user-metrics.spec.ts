import { expect, it, describe, beforeEach } from 'vitest'

import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'gym_one',
      latitude: -27.2092052,
      longitude: -25.5595683,
    })

    await gymsRepository.create({
      title: 'gym_two',
      latitude: -27.2092052,
      longitude: -25.5595683,
    })

    const { gyms } = await sut.execute({
      query: 'gym_two',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym_two' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 0; i <= 21; i++) {
      await gymsRepository.create({
        title: `gym ${i}`,
        latitude: -27.2092052,
        longitude: -25.5595683,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    console.log(gyms)

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym 20' }),
      expect.objectContaining({ title: 'gym 21' }),
    ])
  })
})
