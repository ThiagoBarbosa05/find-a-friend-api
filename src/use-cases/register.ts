import { Address, User } from '@/@types'
import { UsersRepository } from '@/repositories/contracts/users-repository'
import { formatWhatsappNumber } from '@/utils/formatWhatsappNumber'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { AddressRepository } from '@/repositories/contracts/address-repository'

interface RegisterUseCaseRequest {
  user: {
    name: string
    email: string
    password: string
    whatsapp_number: string
  }
  address: {
    city: string
    postal_code: string
    state: string
    street: string
    user_id: string
  }
}

interface RegisterUseCaseResponse {
  userCreated: User
  addressCreated: Address
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private addressRepository: AddressRepository,
  ) {}

  async execute({
    user,
    address,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(user.password, 5)

    const isUserAlreadyExist = await this.usersRepository.findByEmail(
      user.email,
    )

    if (isUserAlreadyExist) {
      throw new UserAlreadyExistsError()
    }

    const addressCreated = await this.addressRepository.create({
      city: address.city,
      postal_code: address.postal_code,
      state: address.state,
      street: address.street,
      user_id: address.user_id,
    })

    const userCreated = await this.usersRepository.create({
      email: user.email,
      name: user.name,
      password_hash,
      role: 'ORG',
      whatsapp_number: formatWhatsappNumber(user.whatsapp_number),
      address_id: addressCreated.id,
    })

    return { userCreated, addressCreated }
  }
}
