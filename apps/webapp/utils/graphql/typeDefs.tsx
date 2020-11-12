import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Query{
	project: Project
	configuration: Configuration
	integration: Integration
}

"""
A project represents an application in Meeshkan.
"""
type Project{
	name: String!
	avatar: String
	configuration: Configuration
	integration: Integration
}

"""
Settings configuration for a project.
"""
type Configuration{
	id: [UUID!]
	productionUrl: String
	stripeCustomerId: ID
	inviteLink: String
}

type Integration{
	slackWebhook: slack
	continuousIntegrationProvider: continuousIntegrationProvider
	continuousIntegration: continuousIntegration
	projectManagementProvider: projectManagementProvider
	projectManagement: projectManagement
}

type slack{
	slackSyncCheckSum: String
	slackSyncNonce: String
}

type circleCI{
	authenticated: Boolean!
}

type gitlabCI{
	authenticated: Boolean!
}

type bitbucketCI{
	authenticated: Boolean!
}

type githubActions{
	authenticated: Boolean!
}

type linear{
	authenticated: Boolean!
	personalToken: String
}

type jira{
	authenticated: Boolean!
}

type trello{
	authenticated: Boolean!
}

type githubIssues{
	authenticated: Boolean!
}

interface UUID{
	propertyName: String
	uuid: ID!
}

enum continuousIntegrationProvider{
	circleCI
	gitlabCI
	bitbucketCI
	githubActions
}

enum projectManagementProvider{
	linear
	jira
	trello
	githubIssues
}

"""
Configuration details as a union since it will conditionally be available.
"""
union continuousIntegration = bitbucketCI | circleCI | gitlabCI | githubActions

union projectManagement = linear | jira | trello | githubIssues
schema{
	query: Query
}
`;
