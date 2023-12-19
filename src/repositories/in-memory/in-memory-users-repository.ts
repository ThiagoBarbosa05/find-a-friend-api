import { User } from '@/@types/users'
import { UsersRepository } from '../contracts/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) return null

    return user
  }

  async create(data: User) {
    const user: User = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role,
      whatsapp_number: data.whatsapp_number,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
