import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let addressRepository: InMemoryAddressRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    addressRepository = new InMemoryAddressRepository()
    sut = new RegisterUseCase(usersRepository, addressRepository)
  })

  it('should be able to register a user as an organization', async () => {
    const user = {
      email: 'user@example.com',
      name: 'user-1',
      password: '1234567',
      whatsapp_number: '22998885544',
    }

    const address = {
      city: 'city-1',
      postal_code: '23334-555',
      state: 'state-1',
      street: 'street-1',
      user_id: 'user-1',
    }

    const { userCreated } = await sut.execute({ user, address })

    expect(userCreated.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const user = {
      email: 'user@example.com',
      name: 'user-1',
      password: '1234567',
      whatsapp_number: '22998885544',
    }

    const address = {
      city: 'city-1',
      postal_code: '23334-555',
      state: 'state-1',
      street: 'street-1',
      user_id: 'user-1',
    }

    const { userCreated } = await sut.execute({ user, address })

    const passwordToCompare = '1234567'

    const isPasswordCorrectlyHashed = await compare(
      passwordToCompare,
      userCreated.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with existing email', async () => {
    const email = 'example@email.com'

    const user = {
      email,
      name: 'user-1',
      password: '1234567',
      whatsapp_number: '22998885544',
    }

    const address = {
      city: 'city-1',
      postal_code: '23334-555',
      state: 'state-1',
      street: 'street-1',
      user_id: 'user-1',
    }

    await sut.execute({
      user,
      address,
    })

    await expect(() => sut.execute({ user, address })).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })

  it('should be able to create an address when registering a new organization', async () => {
    const user = {
      email: 'user@example.com',
      name: 'user-1',
      password: '1234567',
      whatsapp_number: '22998885544',
    }

    const address = {
      city: 'city-1',
      postal_code: '23334-555',
      state: 'state-1',
      street: 'street-1',
      user_id: 'user-1',
    }

    const { addressCreated } = await sut.execute({ user, address })

    expect(addressCreated.id).toEqual(expect.any(String))
  })
})
