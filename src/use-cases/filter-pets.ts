import { FilterPets, Pet } from '@/@types'
import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age_range,
    energy,
    independence_level,
    size,
  }: FilterPets): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPets({
      age_range,
      energy,
      independence_level,
      size,
    })

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
