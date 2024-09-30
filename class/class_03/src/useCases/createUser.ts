import { prisma } from '@/lib/primas'
import { hash } from 'bcryptjs'
import { PrismaUsersRepositorie } from '../repositories/prisma-users-repositorie'

interface CreateUserUseCaseDTO {
  email: string
  password: string
  name: string
}

export class CreateUserCase {
  constructor(private userRepository: any) { }

  async execute({ email, password, name }: CreateUserUseCaseDTO) {
    const password_hash = await hash(password, 10)

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }
    await this.userRepository.
      create({
        email,
        name,
        password_hash,
      })
  }
}
