import { gql } from 'graphql-request';
import { eightBaseClient } from './graphql';
import { CURRENT_USER_QUERY } from './user';

const PROJECT_CREATE_MUTATION = gql`
	mutation($userId: ID!, $projectName: String!, $inviteLink: String!) {
		userUpdate(
			filter: { id: $userId }
			data: {
				projects: {
					create: {
						name: $projectName
						configuration: { create: { inviteLink: $inviteLink } }
					}
				}
			}
		) {
			projects(filter: { name: { equals: $projectName } }) {
				items {
					id
				}
			}
		}
	}
`;

const PROJECTS = gql`
	query {
		user {
			projects {
				items {
					id
					name
					avatar {
						downloadUrl
					}
					configuration {
						inviteLink
					}
					hasReceivedEvents
				}
			}
		}
	}
`;

export const createProject = async (userIdToken, data) => {
	const client = eightBaseClient(userIdToken);
	const { user } = await client.request(CURRENT_USER_QUERY);
	let result;
	try {
		result = await client.request(PROJECT_CREATE_MUTATION, {
			userId: user.id,
			projectName: data.name,
			inviteLink: Math.random().toString(36).substring(7),
		});
	} catch (error) {
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
