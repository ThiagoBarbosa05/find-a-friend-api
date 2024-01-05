import { Pet } from '@/@types'
import { PetsRepository } from '../contracts/pets-repository'
import { randomUUID } from 'node:crypto'

const addresses = [
  {
    id: 'ad-1',
    city: 'Rio De Janeiro',
    postal_code: '28977-098',
    state: 'Rio De Janeiro',
    street: 'Rua 1',
    user_id: 'org-1',
  },
  {
    id: 'ad-2',
    city: 'Rio De Janeiro',
    postal_code: '28977-098',
    state: 'Rio De Janeiro',
    street: 'Rua 2',
    user_id: 'org-2',
  },
  {
    id: 'ad-3',
    city: 'Minas Gerais',
    postal_code: '28977-098',
    state: 'Minas Gerais',
    street: 'Rua 3',
    user_id: 'org-3',
  },
]

const orgs = [
  {
    id: 'org-1',
    email: 'org1@email.com',
    name: 'org 1',
    password_hash: '123456',
    whatsapp_number: '(22)99887-9987',
    role: 'ORG',
    address_id: 'ad-1',
  },
  {
    id: 'org-2',
    email: 'org2@email.com',
    name: 'org 2',
    password_hash: '123456',
    whatsapp_number: '(22)99887-9987',
    role: 'ORG',
    address_id: 'ad-2',
  },
  {
    id: 'org-3',
    email: 'org3@email.com',
    name: 'org 3',
    password_hash: '123456',
    whatsapp_number: '(22)99887-9987',
    role: 'ORG',
    address_id: 'ad-3',
  },
]

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

  async findPets(city: string) {
    const petsInCity = this.items.filter((pet) => {
      const org = orgs.find((user) => user.id === pet.user_id)
      const address = addresses.find(
        (address) => address.id === org?.address_id,
      )
      return address?.city === city
    })
    return petsInCity
  }
}
