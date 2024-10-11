import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

interface createUserDto extends Prisma.UserCreateInput {}

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((el) => el.email === email)

    if (!user) return null
    return user
  }

  async create({ email, name, password_hash }: createUserDto) {
    const user = {
      id: String(Math.random()),
      name,
      email,
      password_hash,
      created_at: new Date(),
    }
    this.users.push(user)

    return user
  }
}
