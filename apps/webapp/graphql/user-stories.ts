import { gql } from 'graphql-request';

export const PROJECT_USER_STORIES = gql`
	fragment stories on UserStory {
		id
		title
		flowIDs
		created
		significance
		isExpected
		recording {
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

	query PROJECT_USER_STORIES($projectId: ID!, $first: Int, $skip: Int) {
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
