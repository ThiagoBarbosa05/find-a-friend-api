import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Pet } from '@/@types'

interface GetPetsByCityUseCaseRequest {
  city: string
  ageRange?: 'CUB' | 'YOUNG' | 'ADULT'
  energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'
}

interface GetPetsByCityUseCaseResponse {
  // petsByCity: Pet[]
  pets: Pet[]
}

export class GetPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    ageRange,
    energy,
    independenceLevel,
    size,
  }: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
    const petsByCity = await this.petsRepository.findPets(city)

    if (!petsByCity) {
      throw new ResourceNotFoundError()
    }

    const pets = petsByCity.filter((pet) => {
      return (
        (!ageRange || pet.age_range === ageRange) &&
        (!energy || pet.energy === energy) &&
        (!size || pet.size === size) &&
        (!independenceLevel || pet.independence_level === independenceLevel) &&
        pet
      )
    })

    return { pets }
  }
}
