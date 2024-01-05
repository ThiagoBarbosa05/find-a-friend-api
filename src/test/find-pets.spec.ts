import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { GetPetsByCityUseCase } from '@/use-cases/find-pets'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCityUseCase

describe('Find pets use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()

    sut = new GetPetsByCityUseCase(petsRepository)
  })

  it('should be able to retrieve pets by city', async () => {
    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 1',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-1',
    })

    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 2',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-2',
    })

    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 3',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-3',
    })

    const { pets } = await sut.execute({ city: 'Rio De Janeiro' })

    expect(pets).toEqual([
      expect.objectContaining({ user_id: 'org-1' }),
      expect.objectContaining({ user_id: 'org-2' }),
    ])
  })

  it('should return an empty list with a non-existent city', async () => {
    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 1',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-1',
    })

    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 2',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-2',
    })

    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 3',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-3',
    })

    const { pets } = await sut.execute({ city: 'São Paulo' })

    expect(pets).toEqual([])
  })

  it('should be able to filter pets', async () => {
    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 1',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-1',
    })

    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 2',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'HIGH',
      size: 'MEDIUM',
      user_id: 'org-2',
    })

    await petsRepository.create({
      age_range: 'ADULT',
      name: 'pet 3',
      energy: 'LOW',
      environment: 'BROAD',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      user_id: 'org-3',
    })

    const { pets } = await sut.execute({
      city: 'Rio De Janeiro',
      size: 'MEDIUM',
      independenceLevel: 'HIGH',
    })

    expect(pets).toEqual([
      expect.objectContaining({ size: 'MEDIUM', independence_level: 'HIGH' }),
    ])

    console.log(pets)
  })
})
