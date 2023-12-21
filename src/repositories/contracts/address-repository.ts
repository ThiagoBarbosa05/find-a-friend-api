import { Address } from '@/@types'

export interface AddressRepository {
  create(data: Address): Promise<Address>
}
