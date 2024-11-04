import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

interface checkInDTO extends Prisma.CheckInUncheckedCreateInput {}

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: checkInDTO) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.items.push(checkIn)

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((el) => el.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((el) => el.user_id === userId).length
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((el) => el.id === id)

    if (!checkIn) return null

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((el) => el.id === checkIn.id)

    if (checkInIndex >= 0) return (this.items[checkInIndex] = checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endtOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDAte = this.items.find((el) => {
      const checkInDate = dayjs(el.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endtOfTheDay)

      return el.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDAte) return null

    return checkOnSameDAte
  }
}
