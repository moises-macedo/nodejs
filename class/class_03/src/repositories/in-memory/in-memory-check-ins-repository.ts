import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

interface checkInDTO extends Prisma.CheckInUncheckedCreateInput {}

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public itens: CheckIn[] = []

  async create(data: checkInDTO) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.itens.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endtOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDAte = this.itens.find((el) => {
      const checkInDate = dayjs(el.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endtOfTheDay)

      return el.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDAte) return null

    return checkOnSameDAte
  }
}
