import { gql } from '@apollo/client';

export const typeDefs = gql`
	"""
	The base data queries available.
	"""
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
		userStories: [UserStory]
		userStory(id: ID!): UserStory
	}

	"""
	A user in the Meeshkan webapp.
	"""
	type User {
		id: ID!
		name: String
		email: EmailAddress!
		avatar: String
		intercomID: ID
	}

	"""
	User story represents how users act in your application.
	"""
	type UserStory {
		id: ID!
		title: String
		recording: Recording
		isTestCase: Boolean!
		groupedFlows: Int
		created: created
		isExpected: Boolean
		failing: Failing
		testRuns: [TestRun]
		project: Project!
	}

	"""
	User stories run in a CI, and all of the run details.
	"""
	type TestRun {
		id: ID!
		status: Status!
		dateTime: DateTime!
		userStories: [UserStory]!
		ciRun: URL
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

	"""
	Integrations and their permisisons for a project.
	"""
	type Integration {
		slackWebhook: slack
		continuousIntegrationProvider: continuousIntegrationProvider
		continuousIntegration: integration
		projectManagementProvider: projectManagementProvider
		projectManagement: integration
		project: Project
	}

	"""
	Details for slack notifications.
	"""
	type slack {
		slackSyncCheckSum: String
		slackSyncNonce: String
	}

	"""
	The property details associated with recordings.
	"""
	type PropertyID {
		propertyName: String
		uuid: UUID!
	}

	"""
	The base type for integrations.
	"""
	type integration {
		accessToken: String
		authenticated: Boolean
	}

	"""
	The base type for activity happening in regards to a release.
	"""
	type activity {
		title: String
		date: DateTime
	}

	"""
	Browser and environment information about a recording to help debug issues.
	"""
	type Environment {
		ipAddress: IPv6
		browser: String
		browserVersion: String
		operatingSystem: String
		language: String
	}

	"""
	User flow recordings with context and two ways to understand.
	"""
	type Recording {
		environment: Environment
		sideScript: JSONObject
		steps: JSONObject
	}

	"""
	Information needed if a test run on a user story is failing.
	"""
	type Failing {
		firstIntroduction: DateTime
		error: String
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

	enum created {
		manual
		user
	}

	enum Status {
		queued
		running
		passing
		runError
		failing
	}

	scalar DateTime
	scalar EmailAddress
	scalar IPv6
	scalar JSONObject
	scalar URL
	scalar UUID

	schema {
		query: Query
	}
`;
