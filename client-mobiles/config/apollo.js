const { ApolloClient, InMemoryCache } = require('@apollo/client');


const client = new ApolloClient({
    uri: 'https://xxx.awdong.shop',
    cache: new InMemoryCache(),
  });

  export default client