import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetsUseCase } from '../create-pets'

export function makeCreatePetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const createPetsUseCase = new CreatePetsUseCase(petsRepository)

  return createPetsUseCase
}
