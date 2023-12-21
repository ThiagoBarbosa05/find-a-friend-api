import { Pet } from '@/@types'
import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetByIdUseCaseResponse {
  pet: Pet
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
