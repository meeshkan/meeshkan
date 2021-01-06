import { gql } from 'graphql-request';
import { eightBaseClient } from './graphql';
import { CURRENT_USER_QUERY } from './user';

const PROJECT_CREATE_MUTATION = gql`
	mutation(
		$userId: ID!
		$projectName: String!
		$inviteLink: String!
		$avatar: ProjectAvatarRelationInput
	) {
		userUpdate(
			filter: { id: $userId }
			data: {
				projects: {
					create: {
						name: $projectName
						configuration: { create: { inviteLink: $inviteLink } }
						avatar: $avatar
					}
				}
			}
		) {
			projects(filter: { name: { equals: $projectName } }) {
				items {
					id
					name
					avatar {
						downloadUrl
						shareUrl
					}
					configuration {
						inviteLink
					}
					hasReceivedEvents
					members {
						count
						items {
							firstName
							lastName
							email
							avatar {
								downloadUrl
							}
						}
					}	
				}
			}
		}
	}
`;

const PROJECT_UPDATE_MUTATION = gql`
	mutation UpdateProject(
		$projectId: ID!
		$projectName: String!
		$avatar: ProjectAvatarUpdateRelationInput
	) {
		projectUpdate(
			filter: {
				id: $projectId
			}
			data: {
				name: $projectName
				avatar: $avatar
			}
		) {
			id
			name
			avatar {
				downloadUrl
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
						shareUrl
					}
					configuration {
						inviteLink
					}
					hasReceivedEvents
					members {
						count
						items {
							firstName
							lastName
							email
							avatar {
								downloadUrl
							}
						}
					}
					userStories {
						count
						items {
							id
							failing {
								count
								items {
									firstIntroduction
									isResolved
								}
							}
							title
							testCreatedDate
							isTestCase
							significance
							createdAt
							testRuns {
								count
								items {
									status
									dateTime
									userStories {
										items {
											id
										}
									}
								}
							}
						}
					}
					release {
						count
						items {
							releaseDate
						}
					}
				}
			}
		}
	}
`;

export const createProject = async (
	idToken: string,
	data: { name: string; fileId: string; filename: string }
) => {
	const client = eightBaseClient(idToken);
	const { user } = await client.request(CURRENT_USER_QUERY);

	const { name, fileId, filename } = data;
	const avatar = {
		create: {
			fileId,
			filename,
		},
	};

	let result;
	try {
		result = await client.request(PROJECT_CREATE_MUTATION, {
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
		result = await client.request(PROJECT_UPDATE_MUTATION, {
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
