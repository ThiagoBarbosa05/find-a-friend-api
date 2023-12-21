import { Address } from '@/@types'
import { AddressRepository } from '../contracts/address-repository'
import { randomUUID } from 'crypto'

export class InMemoryAddressRepository implements AddressRepository {
  public items: Address[] = []

  async create(data: Address) {
    const address: Address = {
      id: data.id ?? randomUUID(),
      city: data.city,
      postal_code: data.postal_code,
      state: data.state,
      street: data.street,
      user_id: data.user_id,
    }

    return address
  }
}
