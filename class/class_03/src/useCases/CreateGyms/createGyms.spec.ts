import { InMemoryGymsRepository } from '@/repositories/in-memory'
import { expect, it, describe, beforeEach } from 'vitest'
import { CreateGymsUseCase } from './gyms'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymsUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymsUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      description: 'Create gym',
      title: 'Gym One',
      phone: '+55410000000000',
      latitude: -27.2092052,
      longitude: -25.5595683,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
