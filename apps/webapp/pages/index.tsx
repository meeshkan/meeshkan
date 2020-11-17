import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import ChakraProvider from '../components/molecules/chakra'
import Layout from '../components/templates/layout'
import SideBar from '../components/organisms/sidebar'
import Grid from '../components/organisms/grid'

type IndexProps = {
  cookies: string | undefined
}

export const Index = ({ cookies }: IndexProps) => {
  const client = new ApolloClient({
    uri: 'http://localhost:4200/api/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <ChakraProvider cookies={cookies}>
        <Layout>
          <SideBar />
          <Grid />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default Index;

export { getServerSideProps } from '../components/molecules/chakra'
