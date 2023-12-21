import { FilterPets, Pet } from '@/@types'

export interface PetsRepository {
  create(data: Pet): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  filterPets(query: FilterPets): Promise<Pet[] | null>
  getPetsByCity(city: string): Promise<Pet[] | null>
}
