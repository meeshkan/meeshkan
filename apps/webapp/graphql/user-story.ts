import { gql } from 'graphql-request';

export const USER_STORY = gql`
	query USER_STORY($userStoryId: ID!) {
		userStory(id: $userStoryId) {
			id
			title
			description
			isTestCase
			flowIDs
			created
			isExpected
			isAuthenticated
			significance
			configuration {
				logInFlow {
					id
				}
			}
			recording {
				video {
					downloadUrl
				}
				id
				startEventId
				endEventId
				environment {
					items {
						ipAddress
						browser
						browserVersion
						operatingSystem
						language
					}
				}
				seleniumScriptJson
			}
		}
	}
`;

export const UPDATE_EXPECTED_TEST = gql`
	mutation UPDATE_EXPECTED_TEST($userStoryId: ID!, $testCreatedDate: DateTime) {
		userStoryUpdate(
			filter: { id: $userStoryId }
			data: { isTestCase: true, testCreatedDate: $testCreatedDate }
		) {
			id
			title
			description
			isTestCase
			flowIDs
			created
			isExpected
			significance
			recording {
				video {
					downloadUrl
				}
				id
				startEventId
				endEventId
				environment {
					items {
						ipAddress
						browser
						browserVersion
						operatingSystem
						language
					}
				}
				seleniumScriptJson
			}
		}
	}
`;

export const DELETE_REJECTED_RECORDING = gql`
	mutation DELETE_REJECTED_RECORDING($userStoryId: ID!) {
		userStoryDelete(filter: { id: $userStoryId }, force: true) {
			success
		}
	}
`;

export const WATCH_RECORDING_CHANGES = gql`
	subscription WATCH_RECORDING_CHANGES($recordingID: ID!) {
		Recording(
			filter: {
				mutation_in: [create, update]
				node: { id: { equals: $recordingID } }
			}
		) {
			node {
				id
				video {
					downloadUrl
				}
			}
		}
	}
`;

export const UPDATE_STORY_TITLE = gql`
	mutation UPDATE_STORY_TITLE($userStoryId: ID!, $newTitle: String) {
		userStoryUpdate(filter: { id: $userStoryId }, data: { title: $newTitle }) {
			id
			title
			description
			isTestCase
			flowIDs
			created
			isExpected
			significance
			recording {
				video {
					downloadUrl
					shareUrl
				}
				id
				startEventId
				endEventId
				environment {
					items {
						ipAddress
						browser
						browserVersion
						operatingSystem
						language
					}
				}
				seleniumScriptJson
			}
		}
	}
`;

export const UPDATE_STORY_DESCRIPTION = gql`
	mutation UPDATE_STORY_DESCRIPTION(
		$userStoryId: ID!
		$newDescription: String
	) {
		userStoryUpdate(
			filter: { id: $userStoryId }
			data: { description: $newDescription }
		) {
			id
			title
			description
			isTestCase
			flowIDs
			created
			isExpected
			significance
			recording {
				video {
					downloadUrl
					shareUrl
				}
				id
				startEventId
				endEventId
				environment {
					items {
						ipAddress
						browser
						browserVersion
						operatingSystem
						language
					}
				}
				seleniumScriptJson
			}
		}
	}
`;

export const UPDATE_STORY_SIGNIFICANCE = gql`
	mutation UPDATE_STORY_SIGNIFICANCE(
		$userStoryId: ID!
		$newSignificance: String!
	) {
		userStoryUpdate(
			filter: { id: $userStoryId }
			data: { significance: $newSignificance }
		) {
			id
			title
			description
			isTestCase
			flowIDs
			created
			isExpected
			significance
			recording {
				video {
					downloadUrl
					shareUrl
				}
				id
				startEventId
				endEventId
				environment {
					items {
						ipAddress
						browser
						browserVersion
						operatingSystem
						language
					}
				}
				seleniumScriptJson
			}
		}
	}
`;
