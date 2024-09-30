import { prisma } from '@/lib/primas'
import { hash } from 'bcryptjs'

interface CreateUserUseCaseDTO {
  email: string
  password: string
  name: string
}

export const createUserUseCase = async ({
  email,
  password,
  name,
}: CreateUserUseCaseDTO) => {
  const password_hash = await hash(password, 10)

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (userWithSameEmail) {
    console.log('enterou')
    throw new Error('Email already exists')
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })
}
