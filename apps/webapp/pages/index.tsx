import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import ChakraProvider from '../components/chakra'
import Layout from '../components/layout'
import SideBar from '../components/sidebar'
import Grid from '../components/grid'

export const Index = ({ cookies }) => {
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

export { getServerSideProps } from '../components/chakra'
