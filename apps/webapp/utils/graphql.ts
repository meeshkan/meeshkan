import { GraphQLClient } from 'graphql-request';

export const eightBaseClient = (token: string) => {
	const context = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};

	const client = new GraphQLClient(
		process.env.NEXT_PUBLIC_8BASE_ENDPOINT || 'https://api.8base.com/ckhqdz5mu01r307mn6szcbdke',
		context
	);

	return client;
};
