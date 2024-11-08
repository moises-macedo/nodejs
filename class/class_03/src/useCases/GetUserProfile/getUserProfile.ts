import { ResourceNotFound } from '@/errors'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseReq {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: Omit<User, 'password_hash'>
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseReq): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound()
    }
    // eslint-disable-next-line
    const { password_hash, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
    }
  }
}
