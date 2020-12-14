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
			significance
			recording {
				items {
					video {
						downloadUrl
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
