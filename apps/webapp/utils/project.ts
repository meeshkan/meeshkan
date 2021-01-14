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
		const response = await client
			.request(CREATE_PROJECT, {
				userId: user.id,
				projectName: name,
				inviteLink: Math.random().toString(36).substring(7),
				avatar: fileId && id ? avatar : undefined,
				today: getDateInEightBaseFormat(new Date()),
			})
			.then((res) => {
				fetch(
					'https://hooks.slack.com/services/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',
					{
						method: 'POST',
						mode: 'no-cors',
						body: JSON.stringify({
							text: `*A new project has been created! 🎉* \n\n Created by: ${user.email} \n Project ID: \`${res.userUpdate.projects.items[0].id} \` \n Project name: _${name}_`,
						}),
						headers: { 'Content-type': 'application/json' },
					}
				);
				return res;
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
		};
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
