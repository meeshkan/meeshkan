import { gql } from '@apollo/client';

export const typeDefs = gql`
	type Query {
		project(id: ID!): Project
		projects: [Project]
		users: [User]
		user(id: ID!): User
	}

	"""
	A project represents an application in Meeshkan.
	"""
	type Project {
		id: ID!
		name: String!
		avatar: String
		configuration: Configuration
		integration: Integration
		activity: [activity]
		members: [User]!
	}

	"""
	Settings configuration for a project.
	"""
	type Configuration {
		id: [PropertyID]!
		productionUrl: URL
		stripeCustomerId: ID
		inviteLink: String
		project: Project
	}

	type Integration {
		slackWebhook: slack
		continuousIntegrationProvider: continuousIntegrationProvider
		continuousIntegration: integration
		projectManagementProvider: projectManagementProvider
		projectManagement: integration
		project: Project
	}

	type slack {
		slackSyncCheckSum: String
		slackSyncNonce: String
	}

	type linear {
		linearToken: String
		authenticated: Boolean!
	}

	type jira {
		jiraToken: String
		authenticated: Boolean!
	}

	type trello {
		trelloToken: String
		authenticated: Boolean!
	}

	type githubIssues {
		githubToken: String
		authenticated: Boolean!
	}

	type PropertyID {
		propertyName: String
		uuid: UUID!
	}

	enum continuousIntegrationProvider {
		circleCI
		gitlabCI
		bitbucketCI
		githubActions
	}

	enum projectManagementProvider {
		linear
		jira
		trello
		githubIssues
	}

	type integration {
		accessToken: String
		authenticated: Boolean
	}

	type activity {
		title: String
		date: DateTime
	}

	type User {
		id: ID!
		name: String
		email: EmailAddress!
		avatar: String
		intercomID: ID
	}

	scalar DateTime
	scalar EmailAddress
	scalar URL
	scalar UUID
	schema {
		query: Query
	}
`;
