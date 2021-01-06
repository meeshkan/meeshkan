import { gql } from 'graphql-request';

export const PROJECT_CREATE_MUTATION = gql`
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
				}
			}
		}
	}
`;

export const PROJECT_UPDATE_MUTATION = gql`
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

export const PROJECTS = gql`
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

export const PROJECT_JOIN_MUTATION = gql`
	mutation JoinProject($userId: ID!, $inviteLink: String!) {
		configurationUpdate(
			filter: { inviteLink: $inviteLink }
			data: { project: { update: { members: { connect: { id: $userId } } } } }
		) {
			project {
				id
				name
			}
		}
	}
`;

export const REMOVE_TEAM_MEMBER = gql`
	mutation REMOVE_TEAM_MEMBER($projectId: ID!, $memberEmail: String) {
		projectUpdate(
			filter: { id: $projectId }
			data: { members: { disconnect: { email: $memberEmail } } }
		) {
			id
		}
	}
`;

export const PROJECT_USER_STORIES = gql`
	fragment stories on UserStory {
		id
		title
		flowIDs
		created
		significance
		isExpected
		recording {
			items {
				environment {
					items {
						ipAddress
						browser
						browserVersion
						operatingSystem
						language
					}
				}
				sideScript
			}
		}
	}

	query PROJECT_USER_STORIES($projectId: ID!, $first: Int!, $skip: Int!) {
		recordings: userStoriesList(
			filter: {
				project: { id: { equals: $projectId } }
				isTestCase: { equals: false }
			}
			first: $first
			skip: $skip
		) {
			count
			items {
				...stories
			}
		}
		testCases: userStoriesList(
			filter: {
				project: { id: { equals: $projectId } }
				isTestCase: { equals: true }
			}
			first: $first
			skip: $skip
		) {
			count
			items {
				testCreatedDate
				...stories
			}
		}
	}
`;
