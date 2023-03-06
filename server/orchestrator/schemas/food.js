const HOST = `http://app:4002`
const axios = require('axios');
const redis = require('../helpers/ioredis');


const typeDefs = `#graphql
    type Food {
        id: Int
        name: String
        description: String
        price: Int
        imgUrl: String
        mongoId: String
        categoryId: Int
        Ingredients: [Ingredient]
        Category: Category
    }

    type Category {
        id: ID
        name: String
    }

    type Ingredient {
        id: ID
        itemId: Int
        name: String
    }

    type DelFoodResult {
        message: String
    }

    type CreateFood {
        item: InputFood
        array: [InputIngred]
    }

    type InputFood {
        id: ID
        name: String
        description: String
        price: Int
        categoryId: Int
        imgUrl: String
        mongoId: String
        updatedAt: String
        createdAt: String
    }

    type InputIngred {
        itemId: Int
        name: String
    }

    type UpdateResult {
        message: String
    }

    type Query {
        getFoods: [Food]
        getFood(id: Int): Food
    }

    type Mutation {
        createFood(name:String,description:String,price:Int,categoryId:Int,imgUrl:String,ingredient:[String]): CreateFood
        updateFood(id:Int,name:String,description:String,price:Int,categoryId:Int,imgUrl:String,ingredient:[String]): UpdateResult
        delFood(id: Int): DelFoodResult
        
    }
`

const resolvers = {
    Query: {
        getFoods: async () => {
            try {
                
                const cacheData =  await redis.get('foods')
                if(cacheData){
                    return JSON.parse(cacheData)
                }

                const {data} = await axios.get(`${HOST}/item`)
                console.log(data);

                await redis.set('foods',JSON.stringify(data))

                return data

            } catch (error) {
                console.log(error);
            }
        },
        getFood: async (_,{id}) => {
            try {
                const {data} = await axios.get(`${HOST}/item/${id}`)

                return data
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createFood: async (_,{name,description,price,categoryId,imgUrl,ingredient}) => {
            try {
                const {data} = await axios({
                    method: 'post',
                    url: `${HOST}/item`,
                    data: {name,description,price,categoryId,imgUrl,ingredient}
                })

                await redis.del('foods')
                // console.log(data);
                return data
            } catch (error) {
                console.log(error);
            }
        },

        updateFood: async (_,{id,name,description,price,categoryId,imgUrl,ingredient}) => {
            try {
                const {data} = await axios({
                    method: 'put',
                    url: `${HOST}/item/${id}`,
                    data: {name,description,price,categoryId,imgUrl,ingredient}
                })

                await redis.del('foods')
                // console.log(data);
                return data
            } catch (error) {
                console.log(error);
            }
        },

        delFood: async (_,{id}) => {
            try {
                const {data} = await axios.delete(`${HOST}/item/${id}`)
                // console.log(data);                

                await redis.del('foods')

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

