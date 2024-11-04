import { GymsRepository } from '@/repositories'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseReq {
  query: string
  page: number
}

interface SearchGymsResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page,
    query,
  }: SearchGymsUseCaseReq): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.searchManyByQuery(query, page)

    return { gyms }
  }
}
