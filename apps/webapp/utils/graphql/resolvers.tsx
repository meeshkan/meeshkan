let project = {
  name: "Demo bank",
  avatar: "https://media.graphcms.com/korhwDyZQBSRALKVzit3",
  configuration: {
    id: [
      {
        propertyName: "production",
        uuid: "646c1d74-0583-408c-9eb5-de7c5c832791"
      }
    ],
    productionUrl: "https://bank.meeshkan.com",
    stripeCustomerId: "XXXXXXXX",
    inviteLink: "https://example.com/invite"
  },
  integration: {
    slack: {
      slackSyncCheckSum: "XXXXXX",
      slackSyncNonce: "XXXXXX"
    },
    continuousIntegrationProvider: "circleCI",
    continuousIntegration: {
      CircleCI: {
        authenticated: true
      }
    },
    projectManagementProvider: "linear",
    projectManagement: {
      authenticated: true,
      personalToken: "XXXXXX"
    }
  }
}

export const resolvers = {
  Query: {
    project(parent, args, context, info) {
      return project
    }
    // configuration: Configuration
    // integration: Integration
  },

  // Mutation: {
  //   updateBook: (root, args) => {
  //     book.name = args.name;
  //     book.author = args.author;
  //     return book;
  //   },
  // },
};
