import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const Home = ({ data }) => {
  const client = new ApolloClient({
    uri: 'http://localhost:4200/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Meeshkan webapp placeholder</h1>
      </div>
    </ApolloProvider>
  );
};

export default Home;
