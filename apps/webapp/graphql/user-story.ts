import { gql } from 'graphql-request';

export const USER_STORY = gql`
	query USER_STORY($userStoryId: ID!) {
		userStory(id: $userStoryId) {
			id
			title
			isTestCase
			flowIDs
			created
			isExpected
			isAuthenticated
			significance
			recording {
				items {
					video {
						downloadUrl
						shareUrl
					}
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
			isTestCase
			flowIDs
			created
			isExpected
			significance
			recording {
				items {
					video {
						downloadUrl
						shareUrl
					}
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
	}
`;

export const DELETE_REJECTED_RECORDING = gql`
	mutation DELETE_REJECTED_RECORDING($userStoryId: ID!) {
		userStoryDelete(filter: { id: $userStoryId }, force: true) {
			success
		}
	}
`;

export const UPDATE_STORY_TITLE = gql`
	mutation UPDATE_STORY_TITLE($userStoryId: ID!, $newTitle: String) {
		userStoryUpdate(filter: { id: $userStoryId }, data: { title: $newTitle }) {
			id
			title
			isTestCase
			flowIDs
			created
			isExpected
			significance
			recording {
				items {
					video {
						downloadUrl
						shareUrl
					}
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
			isTestCase
			flowIDs
			created
			isExpected
			significance
			recording {
				items {
					video {
						downloadUrl
						shareUrl
					}
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
	}
`;
