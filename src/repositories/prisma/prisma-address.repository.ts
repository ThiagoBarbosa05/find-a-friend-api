import { Address } from '@/@types'
import { AddressRepository } from '../contracts/address-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAddressRepository implements AddressRepository {
  async create(data: Address) {
    const address = await prisma.address.create({ data })

    return address
  }
}
