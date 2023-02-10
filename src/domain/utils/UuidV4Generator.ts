import { v4 as uuidv4 } from 'uuid'
import { UuidGenerator } from './uuidGenerator'

export class UuidV4Generator implements UuidGenerator {
  generate (): string {
    return uuidv4()
  }
}
