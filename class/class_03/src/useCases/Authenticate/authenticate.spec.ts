import { expect, it, describe, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from '@/errors'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 10),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 10),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '78945612',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
