import { gql } from 'graphql-request';

export const USER_STORY = gql`
	query USER_STORY($userStoryId: ID!) {
		userStory(id: $userStoryId) {
			createdAt
			createdBy {
				email
				firstName
				lastName
				avatar {
					downloadUrl
				}
			}
			id
			title
			description
			isTestCase
			flows {
				count
			}
			created
			isExpected
			requiresAuthentication
			significance
			project {
				configuration {
					activeTestRuns
					logInStory {
						id
					}
				}
			}
			video {
				downloadUrl
			}
			startEventId
			endEventId
			logInStoryConfig {
				logInStory {
					id
				}
			}
			testOutcome(sort: { createdAt: DESC }) {
				items {
					createdAt
					status
					testRun {
						id
					}
				}
			}
			scriptCommands {
				count
				items {
					id
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
					documentURL
					destinationXCoordinate
					destinationYCoordinate
					destinationTagName
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
			description
			isTestCase
			flows {
				count
			}
			created
			isExpected
			significance
			video {
				downloadUrl
			}
			startEventId
			endEventId
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
`;

export const DELETE_REJECTED_RECORDING = gql`
	mutation DELETE_REJECTED_RECORDING($userStoryId: ID!) {
		userStoryDelete(filter: { id: $userStoryId }, force: true) {
			success
		}
	}
`;

export const WATCH_RECORDING_CHANGES = gql`
	subscription WATCH_RECORDING_CHANGES($userStoryID: ID!) {
		UserStory(
			filter: {
				mutation_in: [create, update]
				node: { id: { equals: $userStoryID } }
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
			flows {
				count
			}
			created
			isExpected
			significance
			video {
				downloadUrl
				shareUrl
			}
			startEventId
			endEventId
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
			flows {
				count
			}
			created
			isExpected
			significance
			video {
				downloadUrl
				shareUrl
			}
			startEventId
			endEventId
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
			flows {
				count
			}
			created
			isExpected
			significance
			video {
				downloadUrl
				shareUrl
			}
			startEventId
			endEventId
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
`;

export const UPDATE_REQUIRES_AUTHENTICATION = gql`
	mutation UPDATE_REQUIRES_AUTHENTICATION(
		$userStoryId: ID!
		$isAuthenticated: Boolean!
	) {
		userStoryUpdateByFilter(
			filter: { id: { equals: $userStoryId } }
			data: { requiresAuthentication: { set: $isAuthenticated } }
		) {
			items {
				id
				title
				description
				isTestCase
				flows {
					count
				}
				created
				isExpected
				requiresAuthentication
				significance
				video {
					downloadUrl
					shareUrl
				}
				startEventId
				endEventId
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
`;

export const UPDATE_STEP = gql`
	mutation UPDATE_STEP(
		$commandID: ID!
		$scriptCommand: ScriptCommandUpdateInput!
	) {
		scriptCommandUpdate(filter: { id: $commandID }, data: $scriptCommand) {
			updatedAt
		}
	}
`;
