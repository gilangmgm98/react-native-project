const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');

const {
    typeDefs: typeUser,
    resolvers: rsvUser
} = require('./schemas/user');

const {
    typeDefs: typeFood,
    resolvers: rsvFood
} = require('./schemas/food');

const {
    typeDefs: typeCategory,
    resolvers: rsvCategory 
} = require('./schemas/category');
(async () => {
    const server = new ApolloServer({
        typeDefs: [typeUser, typeFood, typeCategory],
        resolvers: [rsvUser, rsvFood, rsvCategory],
        introspection: true,
    })
    
    const { url } = await startStandaloneServer(server, {
        listen: {port: 4000},
        introspection: true
    });

    console.log(`🚀  Server ready at: ${url}`);
})()


