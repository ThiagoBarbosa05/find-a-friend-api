import { User } from '@/@types'

export interface UsersRepository {
  create(data: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
