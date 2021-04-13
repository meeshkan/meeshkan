import { gql } from 'graphql-request';

export const CURRENT_USER = gql`
	query CURRENT_USER {
		user {
			id
			email
		}
	}
`;

export const SIGN_UP_USER = gql`
	mutation SIGN_UP_USER($user: UserCreateInput!, $authProfileId: ID) {
		userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
			id
			email
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UPDATE_USER($id: ID!, $user: UserUpdateInput!) {
		userUpdate(filter: { id: $id }, data: $user) {
			id
			firstName
			lastName
			avatar {
				downloadUrl
			}
		}
	}
`;

export const UPDATE_AVATAR = gql`
	mutation UPDATE_AVATAR($id: ID!, $fileId: String!, $filename: String!) {
		userUpdate(
			filter: { id: $id }
			data: { avatar: { create: { fileId: $fileId, filename: $filename } } }
		) {
			avatar {
				id
				downloadUrl
				shareUrl
			}
		}
	}
`;

export const USER = gql`
	query USER {
		user {
			createdAt
			id
			email
			firstName
			lastName
			jobTitle
			productNotifications
			avatar {
				downloadUrl
				shareUrl
			}
			projects {
				items {
					id
					name
					avatar {
						downloadUrl
						shareUrl
					}
					configuration {
						activeTestRuns
						productionURL
						stagingURL
						inviteLink
						authenticationTokens {
							items {
								id
								type
								key
								value
							}
						}
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
							testOutcome {
								items {
									id
									status
									isResolved
									errorDetails {
										stepIndex
										exception
									}
									createdAt
									video {
										downloadUrl
										shareUrl
									}
								}
							}
							title
							testCreatedDate
							isTestCase
							createdAt
						}
					}
					release {
						count
						items {
							id
							name
							releaseDate
							testRuns {
								count
								items {
									id
									status
									ciRun
									createdAt
									testLength
									testOutcome {
										count
										items {
											id
											status
											isResolved
											errorDetails {
												stepIndex
												exception
											}
											createdAt
											video {
												downloadUrl
												shareUrl
											}
											userStory {
												id
												title
												recording {
													seleniumScriptJson
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const UPDATE_PRODUCT_NOTIFICATIONS = gql`
	mutation UPDATE_PRODUCT_NOTIFICATIONS(
		$id: ID!
		$productNotifications: Boolean!
	) {
		userUpdate(
			filter: { id: $id }
			data: { productNotifications: $productNotifications }
		) {
			id
		}
	}
`;
