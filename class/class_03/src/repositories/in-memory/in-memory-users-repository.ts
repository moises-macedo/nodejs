import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

interface createUserDto extends Prisma.UserCreateInput {}

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []
  async findById(id: string) {
    const user = this.users.find((el) => el.id === id)

    if (!user) return null
    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((el) => el.email === email)

    if (!user) return null
    return user
  }

  async create({ email, name, password_hash }: createUserDto) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    }
    this.users.push(user)

    return user
  }
}
