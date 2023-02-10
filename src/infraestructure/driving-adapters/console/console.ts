import path from 'path'
import * as dotenv from 'dotenv'
import { User } from '../../../domain/entities/User'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
// import { InMemoryUserRepository } from '../../implementations/inMemory/inMemoryUserRepository'
import { DynamoDBUserRepository } from '../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'

(async () => {
    dotenv.config({
      path: path.resolve(__dirname, '../../../../.env')
    })
    // const inMemoryUserRepo = new InMemoryUserRepository()
    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo)
    const userCreator: User = {
            name: 'afn',
            age: 12,
            username: 'afnarqui',
            id: 'hh'
        }
      
    await userCreatorUseCase.run(userCreator)

  // Obteniendo usuarios
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)    
   
})()
