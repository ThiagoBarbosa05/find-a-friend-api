import { Address } from '@/@types/users'

export interface AddressRepository {
  create(data: Address): Promise<Address>
}
