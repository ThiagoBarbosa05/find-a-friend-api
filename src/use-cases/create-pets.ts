import { Pet } from '@/@types'
import { PetsRepository } from '@/repositories/contracts/pets-repository'

interface CreatePetsUseCaseResponse {
  pet: Pet
}

export class CreatePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age_range,
    energy,
    environment,
    independence_level,
    name,
    size,
    user_id,
    about,
    requirements,
  }: Pet): Promise<CreatePetsUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age_range,
      energy,
      environment,
      independence_level,
      name,
      size,
      user_id,
      about,
      requirements,
    })

    return { pet }
  }
}
