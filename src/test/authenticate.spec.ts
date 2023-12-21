import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate a user as ORG', async () => {
    const passwordHashed = await hash('123456', 5)

    await usersRepository.create({
      email: 'example@email.com',
      password_hash: passwordHashed,
      name: 'org-1',
      whatsapp_number: '+55 (22) 99883-0987',
    })

    const { user } = await sut.execute({
      email: 'example@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("shouldn't be able to authenticate a user with invalid credentials", async () => {
    const passwordHashed = await hash('123456', 5)

    await usersRepository.create({
      email: 'example@email.com',
      password_hash: passwordHashed,
      name: 'org-1',
      whatsapp_number: '+55 (22) 99883-0987',
    })

    await expect(() =>
      sut.execute({
        email: 'wrongemail@email.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
