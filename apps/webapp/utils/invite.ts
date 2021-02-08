import { eightBaseClient } from './graphql';
import { JOIN_PROJECT } from '../graphql/project';

export const propagateInviteToDb = async (inviteId: string, userId: string) => {
	const twentyFourHoursAgo =
		new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
			.toISOString()
			.replace('Z', '') + '+00:00';
	const client = eightBaseClient(process.env.EIGHTBASE_TOKEN);

	try {
		const response = await client.request(JOIN_PROJECT, {
			userId: userId,
			inviteLink: `https://app.meeshkan.com/invite/${inviteId}`,
			cutOffDate: twentyFourHoursAgo,
		});

		return response;
	} catch (error) {
		console.error(error);
		return {
			error: error.response.errors[0],
		};
	}
};
