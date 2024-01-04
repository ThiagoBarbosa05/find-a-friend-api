import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByCityUseCase } from '../get-pets-by-city'

export function makeGetPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetsByCityUseCase = new GetPetsByCityUseCase(petsRepository)

  return getPetsByCityUseCase
}
