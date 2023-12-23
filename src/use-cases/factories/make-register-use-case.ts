import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repoository'
import { RegisterUseCase } from '../register'
import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address.repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const addressRepository = new PrismaAddressRepository()
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    addressRepository,
  )

  return registerUseCase
}
