import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../utils/graphql/schema';

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context(ctx) {
    return ctx;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
  engine: {
    reportSchema: true,
    variant: 'current',
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
