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
				seleniumScript {
					version
					groups(orderBy: gIndex_ASC) {
						groupsCount: count
						groupItems: items {
							gIndex
							name
							commands(orderBy: sIndex_ASC) {
								count
								items {
									open {
										value
									}
									setViewportSize {
										value {
											xCoord
											yCoord
										}
									}
									click {
										target {
											selector {
												selector
												tagName
												innerText
											}
										}
									}
									type {
										value
										target {
											selector {
												tagName
											}
										}
									}
									dragndrop {
										sourceTarget {
											selector {
												tagName
												innerText
											}
											coordinates {
												xCoord
												yCoord
											}
										}
										destinationTarget {
											selector {
												tagName
												innerText
											}
											coordinates {
												xCoord
												yCoord
											}
										}
									}
									sIndex
								}
							}
						}
					}
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
