import { FilterPets, Pet } from '@/@types'

export interface PetsRepository {
  create(data: Pet): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findPets(city: string): Promise<Pet[] | null>
}
