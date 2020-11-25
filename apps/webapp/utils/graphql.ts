import { GraphQLClient } from 'graphql-request';

export const eightBaseClient = (token: string) => {
	const context = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};

	const client = new GraphQLClient(
		process.env.EIGHT_BASE_ENDPOINT,
		context
	);

	return client;
};
