import { GraphQLClient } from 'graphql-request';

export const eightBaseClient = (token: string) => {
	const context = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};

	const client = new GraphQLClient(
		'https://api.8base.com/ckhqdz5mu01r307mn6szcbdke_staging',
		context
	);

	return client;
};
