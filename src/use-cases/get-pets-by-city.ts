import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Pet } from '@/@types'

interface GetPetsByCityUseCaseResponse {
  petsByCity: Pet[]
}

export class GetPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(city: string): Promise<GetPetsByCityUseCaseResponse> {
    const petsByCity = await this.petsRepository.getPetsByCity(city)

    if (!petsByCity) {
      throw new ResourceNotFoundError()
    }

    return { petsByCity }
  }
}
