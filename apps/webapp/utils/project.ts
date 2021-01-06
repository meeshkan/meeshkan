import {
	CREATE_PROJECT,
	UPDATE_PROJECT,
	PROJECTS,
} from '../graphql/project';
import { CURRENT_USER } from '../graphql/user';
import { eightBaseClient } from './graphql';

export const createProject = async (
	idToken: string,
	data: { name: string; fileId: string; filename: string }
) => {
	const client = eightBaseClient(idToken);
	const { user } = await client.request(CURRENT_USER);

	const { name, fileId, filename } = data;
	const avatar = {
		create: {
			fileId,
			filename,
		},
	};

	let result;
	try {
		result = await client.request(CREATE_PROJECT, {
			userId: user.id,
			projectName: name,
			inviteLink: Math.random().toString(36).substring(7),
			avatar: fileId && filename ? avatar : undefined,
		});
	} catch (error) {
		console.error(error);
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};

export const updateProject = async (
	idToken: string,
	data: { id: string; name: string; fileId: string; filename: string }
) => {
	const client = eightBaseClient(idToken);

	const { id, name, fileId, filename } = data;
	const avatar = {
		create: {
			fileId,
			filename,
		},
	};

	let result;
	try {
		result = await client.request(UPDATE_PROJECT, {
			projectId: id,
			projectName: name,
			avatar: fileId && filename ? avatar : undefined,
		});
	} catch (error) {
		console.error(error);
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};

export const getProjects = async (userIdToken) => {
	const client = eightBaseClient(userIdToken);
	const { user } = await client.request(PROJECTS);
	return user.projects.items;
};
