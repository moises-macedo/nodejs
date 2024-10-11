import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcrypt'

interface CreateUserUseCaseDTO {
  email: string
  password: string
  name: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class CreateUserCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
    name,
  }: CreateUserUseCaseDTO): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 10)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}
