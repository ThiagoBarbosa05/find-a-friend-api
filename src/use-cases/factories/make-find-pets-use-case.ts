import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByCityUseCase } from '../find-pets'

export function makeFindPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetsByCityUseCase = new GetPetsByCityUseCase(petsRepository)

  return getPetsByCityUseCase
}
