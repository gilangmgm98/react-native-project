const HOST = `http://app:4002`
const axios = require('axios');
const redis = require('../helpers/ioredis');

const typeDefs = `#graphql
    type Category {
        id: ID
        name: String
    }

    type DelCategory {
        message: String
    }

    type Query {
        getCategory: [Category]
    }

    # type Mutation {
    #     delCategory(id: Int): DelCategory karena client tidak perlu menghapus
    # }
`;

const resolvers = {
    Query: {
        getCategory: async () => {
            try {
                const {data} = await axios.get(`${HOST}/category`)
                console.log(data);

                // await redis.set('categories')
    
                return data
            } catch (error) {
                console.log(error);
            }
        }
    },
    // Mutation: {
    //     delCategory: async (_,{id}) => {
    //         try {
    //             const {data} = await axios({
    //                 method: 'delete',
    //                 url: `${HOST}/category/${id}`
    //             })

    //             await redis.del('categories')

    //             console.log(data);
    //             return data
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
}

module.exports = {
    typeDefs,
    resolvers
}