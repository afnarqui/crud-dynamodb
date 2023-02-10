import { APIGatewayProxyHandler } from 'aws-lambda'
import { UuidV4Generator } from './domain/utils/UuidV4Generator';
import { saveUser }  from './infraestructure/driving-adapters/user';

export const handler: APIGatewayProxyHandler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ hello: 'aja'})
    }
}

export const save: APIGatewayProxyHandler = async (event: any) => {
    const uuidV4Generator = new UuidV4Generator()
    const { name, username, age } = JSON.parse(event.body)
    const UsarData = {
        id: JSON.stringify(uuidV4Generator),
        name,
        username,
        age
    }
    const data = await saveUser(UsarData)

    return {
        statusCode: 200,
        body: JSON.stringify({ hello: 'aja', values: data})
    }
}