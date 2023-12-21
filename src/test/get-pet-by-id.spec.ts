import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetByIdUseCase } from '@/use-cases/get-pet-by-id'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Register use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to retrieve a pet by id', async () => {
    await petsRepository.create({
      id: 'pet-1',
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

    const petToRetrieve = await petsRepository.create({
      id: 'pet-2',
      age_range: 'CUB',
      energy: 'MEDIUM',
      environment: 'CLOSED',
      independence_level: 'MEDIUM',
      name: 'pet-2',
      size: 'MEDIUM',
      user_id: 'org-1',
      about: 'A Pet incredible',
      requirements: 'a lovely owner',
    })

    const { pet } = await sut.execute('pet-2')

    expect(petToRetrieve.id).toEqual(pet.id)
  })
})
