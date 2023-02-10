import { Nullable } from 'src/domain/utils/Nullable'
import { User } from '../../../../domain/entities/User'
import { UserRepository } from '../../../../domain/repositories/UserRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBUserRepository implements UserRepository {
  private readonly _db = DynamoDB.getInstance()
   // let a = process.env.variable
  async getAll (): Promise<User[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'ENTITY_TYPE = :entity',
      ExpressionAttributeValues: {
        ':entity': {
          S: 'USER'
        }
      }
    }).promise()

    const items = (response.Items != null) ? response.Items : []

    const users = items.map((item: any) => {
      const age: string = item.age.N ?? ''
      const id: string = item['USER_PK'].S ?? ''
      const name: string = item.name.S ?? ''
      const username: string = item.username.S ?? ''
      
      return {
        id: id.split('_')[1],
        name,
        username,
        age: Number(age)
      }
    })

    return users
  }
//   _value
  async save (user: User): Promise<User> {
    await this._db.putItem({
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        'USER_PK': {
          S: `USER_${user.id}`
        },
        'USER_SK': {
          S: `USER_${user.id}`
        },
        ENTITY_TYPE: {
          S: 'USER'
        },
        username: {
          S: user.username
        },
        name: {
          S: user.name
        },
        age: {
          N: `${user?.age ?? ''}`
        }
      }
    }).promise()

    return user
  }

async getByUserName (username: string): Promise<Nullable<User>> {
  const response = await this._db.scan({
    TableName: DynamoDB.TABLE_NAME,
    FilterExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': {
        S: username
      }
    }
  }).promise()

  const item = (response.Items !== undefined) ? response.Items[0] : undefined

  if (item === undefined) return null

  const age: string = item.age.N ?? ''
  const id: string = item['USER_PK'].S ?? ''
  const name: string = item.name.S ?? ''
  const usernameItem: string = item.username.S ?? ''

  return {
    id: id.split('_')[1],
    name,
    username: usernameItem,
    age: Number(age)
  }
}
}