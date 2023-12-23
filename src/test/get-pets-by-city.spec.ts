import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetPetsByCityUseCase } from '@/use-cases/get-pets-by-city'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let address: InMemoryAddressRepository
let sut: GetPetsByCityUseCase

describe('Get pets by city use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    address = new InMemoryAddressRepository()

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

    const pets = await sut.execute('Rio De Janeiro')

    expect(pets.petsByCity).toEqual([
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

    const pets = await sut.execute('São Paulo')

    expect(pets.petsByCity).toEqual([])
  })
})
