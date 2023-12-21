import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FilterPetsUseCase } from '@/use-cases/filter-pets'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: FilterPetsUseCase

describe('Register use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsUseCase(petsRepository)
  })

  it('should be able to filter pets', async () => {
    await petsRepository.create({
      age_range: 'CUB',
      energy: 'HIGH',
      environment: 'CLOSED',
      independence_level: 'MEDIUM',
      name: 'pet-1',
      size: 'MEDIUM',
      user_id: 'org-1',
      about: 'A Pet incredible',
      requirements: 'a lovely owner',
    })
    await petsRepository.create({
      age_range: 'CUB',
      energy: 'MEDIUM',
      environment: 'CLOSED',
      independence_level: 'MEDIUM',
      name: 'pet-1',
      size: 'LARGE',
      user_id: 'org-1',
      about: 'A Pet incredible',
      requirements: 'a lovely owner',
    })
    await petsRepository.create({
      age_range: 'CUB',
      energy: 'MEDIUM',
      environment: 'CLOSED',
      independence_level: 'MEDIUM',
      name: 'pet-1',
      size: 'LARGE',
      user_id: 'org-1',
      about: 'A Pet incredible',
      requirements: 'a lovely owner',
    })

    const { pets } = await sut.execute({ size: 'LARGE', energy: 'MEDIUM' })

    expect(pets).toEqual([
      expect.objectContaining({ size: 'LARGE' }),
      expect.objectContaining({ size: 'LARGE' }),
    ])
  })
})
