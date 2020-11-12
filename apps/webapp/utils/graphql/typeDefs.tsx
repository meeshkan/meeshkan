import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Query {
    project: Project
    configuration: Configuration
    integration: Integration
  }

  """
  A project represents an application in Meeshkan.
  """
  type Project {
    name: String!
    avatar: String
    configuration: Configuration
  }

  """
  Settings configuration for a project.
  """
  type Configuration {
    id: [UUID!]
    productionUrl: String
    stripeCustomerId: ID
    inviteLink: String
  }

  type Integration {
    slackWebhook: Slack
    continuousIntegrationProvider: continuousIntegrationProvider
    continuousIntegration: continuousIntegration
    projectManagementProvider: projectManagementProvider
    projectManagement: projectManagement
  }

  type Slack {
    slackSyncCheckSum: String
    slackSyncNonce: String
  }

  type CircleCI {
    authenticated: Boolean!
  }

  type GitlabCI {
    authenticated: Boolean!
  }

  type BitbucketCI {
    authenticated: Boolean!
  }

  type GithubActions {
    authenticated: Boolean!
  }

  type Linear {
    authenticated: Boolean!
    personalToken: String
  }

  type Jira {
    authenticated: Boolean!
  }

  type Trello {
    authenticated: Boolean!
  }

  type GithubIssues {
    authenticated: Boolean!
  }

  interface UUID {
    propertyName: String
    uuid: ID!
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

  """
  CI details as a union since it will conditionally be available.
  """
  union continuousIntegration =
      BitbucketCI
    | CircleCI
    | GitlabCI
    | GithubActions

  """
  Project management details as a union since it will conditionally be available.
  """
  union projectManagement = Linear | Jira | Trello | GithubIssues
  schema {
    query: Query
  }
`;
