import { prisma } from '@/lib/primas'
import { Prisma } from '@prisma/client'

interface createUserDto extends Prisma.UserCreateInput {}

export class PrismaUsersRepositorie {
  async create(data: createUserDto) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
