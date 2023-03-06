const HOST = `http://users:4001`
const axios = require('axios');
const redis = require('../helpers/ioredis');


const typeDefs = `#graphql
    type User {
        _id: ID
        email:String
        role:String
        password:String
        username:String
        phoneNumber:String
        address:String
    }

    type createUserResult {
        statusCode: Int
        message: String
        id: String
        username: String
        email: String
    }

    type deletedUserResult {
        message: String
    }

    type Query {
        getUsers: [User]
        getUser(id: String): User
    }

    type Mutation {
        deleteUser(id: String): deletedUserResult 
        createUser(username: String, email: String, password: String, address: String, phoneNumber: String): createUserResult
    }
`;

const resolvers = {
    Query: {
        getUsers: async () => {
            try {

                const cacheData = await redis.get('users')
                if(cacheData){
                    return JSON.parse(cacheData)
                }

                const {data} = await axios.get(`${HOST}/users`)

                await redis.set('users',JSON.stringify(data.data))

                return data.data
            } catch (error) {
                console.log(error);
            }
        },

        getUser: async (_, {id}) => {
            try {
                const {data} = await axios.get(`${HOST}/users/${id}`)
                // console.log(data);
                return data.foundUser
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createUser: async (_, {username, email, password, address, phoneNumber}) => {
            try {
                const {data} = await axios({
                    method: 'post',
                    url: `${HOST}/users`,
                    data: {username, email, password, address, phoneNumber}
                })

                await redis.del('users')
                // console.log(data);
                return data
            } catch (error) {
                console.log(error);
            }
        },

        deleteUser: async (_,{id}) => {
            try {
                const {data} = await axios ({
                    method: 'delete',
                    url: `${HOST}/users/${id}`
                })

                await redis.del('users')

                return data
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}