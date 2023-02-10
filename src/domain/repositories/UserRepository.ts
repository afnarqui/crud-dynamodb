import { User } from '../entities/User'
import { Nullable } from '../utils/Nullable'

export interface UserRepository {
    getAll: () => Promise<User[]>
    save: (user: User) => Promise<User>
    getByUserName: (username: string) => Promise<Nullable<User>>
}