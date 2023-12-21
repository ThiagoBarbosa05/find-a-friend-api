import { FilterPets, Pet } from '@/@types'
import { PetsRepository } from '../contracts/pets-repository'
import { randomUUID } from 'node:crypto'
import { InMemoryUsersRepository } from './in-memory-users-repository'
import { InMemoryAddressRepository } from './in-memory-address-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Pet) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      about: data.about,
      age_range: data.age_range,
      energy: data.energy,
      environment: data.environment,
      independence_level: data.independence_level,
      name: data.name,
      requirements: data.requirements,
      size: data.size,
      user_id: data.user_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }

  async filterPets(query: FilterPets) {
    const pet = this.items.filter(
      (item) =>
        item.age_range === query.age_range ||
        item.energy === query.energy ||
        item.size === query.size ||
        item.independence_level === query.independence_level,
    )

    if (!pet) return null

    return pet
  }

  async getPetsByCity(city: string) {
    const addressRepository = new InMemoryAddressRepository()
    const usersRepository = new InMemoryUsersRepository()

    const petsInCity = this.items.filter((pet) => {
      const org = usersRepository.items.find((user) => user.id === pet.user_id)
      const address = addressRepository.items.find(
        (address) => address.id === org?.address_id,
      )

      return address?.city === city
    })

    return petsInCity
  }
}
