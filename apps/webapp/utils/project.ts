import { CREATE_PROJECT, UPDATE_PROJECT } from '../graphql/project';
import { CURRENT_USER } from '../graphql/user';
import { getDateInEightBaseFormat } from './date';
import { eightBaseClient } from './graphql';

export const createProject = async (
	idToken: string,
	data: { name: string; fileId: string; id: string }
) => {
	const client = eightBaseClient(idToken);
	const { user } = await client.request(CURRENT_USER);

	const { name, fileId, id } = data;
	const avatar = {
		connect: {
			fileId,
			id,
		},
	};

	try {
		const response = await client.request(CREATE_PROJECT, {
			userId: user.id,
			projectName: name,
			inviteLink: Math.random().toString(36).substring(7),
			avatar: fileId && id ? avatar : undefined,
			today: getDateInEightBaseFormat(new Date()),
		});

		return response;
	} catch (error) {
		console.error(error);
		return {
			error: error.response.errors[0],
		};
	}
};

export const updateProject = async (
	idToken: string,
	data: {
		id: string;
		name: string;
		avatar: {
			fileId: string;
			id: string;
		}
	}
) => {
	const client = eightBaseClient(idToken);

	const { id, name } = data;
	let result;
	try {
		result = await client.request(UPDATE_PROJECT, {
			projectId: id,
			projectName: name,
			avatar: {
				connect: data.avatar,
			},
		});
	} catch (error) {
		console.error(error);
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};
