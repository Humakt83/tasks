import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({  
  uri: 'file://Front-end assignment station data .json',
  cache: new InMemoryCache()
});

export default client;