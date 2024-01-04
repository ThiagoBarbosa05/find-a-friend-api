import { Pet, FilterPets } from '@/@types'
import { PetsRepository } from '../contracts/pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Pet) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) return null

    return pet
  }

  // filterPets(query: FilterPets): Promise<Pet[] | null> {
  //   throw new Error('Method not implemented.')
  // }
  async getPetsByCity(city: string): Promise<Pet[] | null> {
    const foundPets = await prisma.user.findMany({
      where: {
        Address: {
          city: {
            equals: city,
            mode: 'insensitive',
          },
        },
      },
      include: {
        Pet: true,
      },
    })

    if (!foundPets) return null

    const pets = foundPets.flatMap((user) => user.Pet)

    return pets
  }
}
