import path from 'path'
import * as dotenv from 'dotenv'
import { User } from '../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { DynamoDBUserRepository } from '../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'

export const saveUser = async (userNew: User) => {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo)
    
  await userCreatorUseCase.run(userNew)

  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)
  const usersReturned = await userGetterUseCase.run()
  return usersReturned
}
