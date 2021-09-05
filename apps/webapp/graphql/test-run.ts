import { gql } from 'graphql-request';

export const TEST_RUN_QUERY = gql`
	query TEST_RUN_QUERY($testRunId: ID!) {
		testRun(id: $testRunId) {
			id
			status
			runLink
			baseURL
			createdAt
			testLength
			testOutcome {
				count
				items {
					id
					status
					isResolved
					errorStepIndex
					errorMessage
					assertionError
					createdAt
					video {
						downloadUrl
					}
					userStory {
						id
						title
						created
						requiresAuthentication
						scriptCommands {
							items {
								command
								sIndex
								value
								xCoordinate
								yCoordinate
								xpath
								selector
								className
								tagName
								tagId
								innerText
								altOrAriaText
								scrollTop
								scrollLeft
								destinationXCoordinate
								destinationYCoordinate
								destinationTagName
							}
						}
					}
				}
			}
		}
	}
`;

export const TEST_RUNS = gql`
	query TEST_RUN($projectId: ID!) {
		testRunsList(
			filter: { release: { project: { id: { equals: $projectId } } } }
		) {
			items {
				id
				status
				runLink
				baseURL
				createdAt
				testOutcome {
					count
					items {
						status
					}
				}
			}
		}
	}
`;
