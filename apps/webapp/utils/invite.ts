import { eightBaseClient } from './graphql';
import { JOIN_PROJECT } from '../graphql/project';

export const propagateInviteToDb = async (inviteId: string, userId: string) => {
	const client = eightBaseClient(process.env.EIGHTBASE_TOKEN);

	let result;
	try {
		result = await client.request(JOIN_PROJECT, {
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
