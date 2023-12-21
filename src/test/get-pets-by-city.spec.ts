import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetPetsByCityUseCase } from '@/use-cases/get-pets-by-city'
import { beforeEach, describe, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let usersRepository = new InMemoryUsersRepository()
let sut: GetPetsByCityUseCase

describe('Register use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new GetPetsByCityUseCase(petsRepository)
  })

  it('should be able to retrieve pets by city', async () => {})
})
