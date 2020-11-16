import {
	DateTimeResolver,
	EmailAddressResolver,
	URLResolver,
	UUIDResolver,
} from 'graphql-scalars';

let users = [
	{
		id: '123456789',
		name: 'Makenna',
		avatar: 'https://media.graphcms.com/gRq2y5BsRNqNNrlPwTgX',
		email: 'makennasmutz@gmail.com',
	},
	{
		id: '987654321',
		name: 'Mike',
		avatar: 'https://media.graphcms.com/gRq2y5BsRNqNNrlPwTgX',
		email: 'mike@meeshkan.com',
	},
];

let projects = [
	{
		id: 'XYZ',
		name: 'Demo bank',
		avatar: 'https://media.graphcms.com/korhwDyZQBSRALKVzit3',
		members: [
			{
				id: '123456789',
				name: 'Makenna',
				avatar: 'https://media.graphcms.com/gRq2y5BsRNqNNrlPwTgX',
				email: 'makennasmutz@gmail.com',
			},
			{
				id: '987654321',
				name: 'Mike',
				avatar: 'https://media.graphcms.com/gRq2y5BsRNqNNrlPwTgX',
				email: 'mike@meeshkan.com',
			},
		],
		configuration: {
			id: [
				{
					propertyName: 'production',
					uuid: '646c1d74-0583-408c-9eb5-de7c5c832791',
				},
			],
			productionUrl: 'https://bank.meeshkan.com',
			stripeCustomerId: 'XXXXXXXX',
			inviteLink: 'https://example.com/invite',
		},
		integration: {
			slack: {
				slackSyncCheckSum: 'XXXXXX',
				slackSyncNonce: 'XXXXXX',
			},
			continuousIntegrationProvider: 'circleCI',
			continuousIntegration: {
				accessToken: 'XYZABC',
				authenticated: true,
			},

			projectManagementProvider: 'linear',
			projectManagement: {
				accessToken: 'XXXXXX',
				authenticated: true,
			},
		},
		activity: [
			{
				title: 'New branch created MEM-123',
				date: '2020-11-16T06:34:51Z',
			},
			{
				title: '4 recordings added for review',
				date: '2020-11-16T06:35:49Z',
			},
		],
	},
	{
		id: 'ABC',
		name: 'Meeshkan webapp',
		avatar: 'https://media.graphcms.com/gRq2y5BsRNqNNrlPwTgX',
		members: [
			{
				id: '123456789',
				name: 'Makenna',
				avatar: 'https://media.graphcms.com/gRq2y5BsRNqNNrlPwTgX',
				email: 'makennasmutz@gmail.com',
			},
		],
		configuration: {
			id: [
				{
					propertyName: 'production',
					uuid: '11747120-E7C0-4FD7-9884-301136E0B728',
				},
			],
			productionUrl: 'https://app.meeshkan.com',
			stripeCustomerId: 'XXXXXXXX',
			inviteLink: 'https://example.com/invite',
		},
		integration: {
			slack: {
				slackSyncCheckSum: 'XXXXXX',
				slackSyncNonce: 'XXXXXX',
			},
			continuousIntegrationProvider: 'circleCI',
			continuousIntegration: {
				accessToken: 'ABCXYZ',
				authenticated: true,
			},
			projectManagementProvider: 'linear',
			projectManagement: {
				accessToken: 'XXXXXX',
				authenticated: true,
			},
		},
		activity: [
			{
				title: 'New branch created MEM-123',
				date: '2020-11-16T06:34:51Z',
			},
		],
	},
];

export const resolvers = {
	Query: {
		projects: () => {
			return projects;
		},
		project: (parent, args, context, info) => {
			return projects.find((project) => project.id === args.id);
		},
		users: () => {
			return users;
		},
		user: (parent, args, context, info) => {
			return users.find((user) => user.id === args.id);
		},
	},
	DateTime: DateTimeResolver,
	EmailAddress: EmailAddressResolver,
	URL: URLResolver,
	UUID: UUIDResolver,
	// Mutation: {
	//   updateBook: (root, args) => {
	//     book.name = args.name;
	//     book.author = args.author;
	//     return book;
	//   },
	// },
};
