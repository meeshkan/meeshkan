import { gql } from 'graphql-request';

export const TEST_RUN = gql`
	query TEST_RUN($testRunId: ID!) {
		testRun(id: $testRunId) {
			id
			status
			runLink
			createdAt
			testLength
			testOutcome {
				count
				items {
					id
					status
					isResolved
					errorStepIndex
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
