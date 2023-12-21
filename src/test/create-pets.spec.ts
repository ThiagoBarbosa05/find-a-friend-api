import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetsUseCase } from '@/use-cases/create-pets'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetsUseCase

describe('Register use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetsUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      age_range: 'CUB',
      energy: 'MEDIUM',
      environment: 'CLOSED',
      independence_level: 'MEDIUM',
      name: 'pet-1',
      size: 'MEDIUM',
      user_id: 'org-1',
      about: 'A Pet incredible',
      requirements: 'a lovely owner',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
