import { eightBaseClient } from './graphql';
import { PROJECT_JOIN_MUTATION } from '../graphql/project';

export const propagateInviteToDb = async (inviteId: string, userId: string) => {
	const client = eightBaseClient(process.env.EIGHTBASE_TOKEN);

	let result;
	try {
		result = await client.request(PROJECT_JOIN_MUTATION, {
			userId: userId,
			inviteLink: `https://app.meeshkan.com/invite/${inviteId}`,
		});
	} catch (error) {
		console.error(error);
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};
