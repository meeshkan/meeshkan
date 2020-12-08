import { createContext } from 'react';
import { gql } from 'graphql-request';
import { eightBaseClient } from './graphql';
import { uploadFileFromUrl } from './8base';
import { Intercom } from './intercom';

const isServer = typeof window === 'undefined';

type Avatar = {
	downloadUrl: string;
	shareUrl?: string;
};

export interface AvatarFile {
	fileId: string;
	filename: string;
}

type Configuration = {
	inviteLink: string;
};

type TestRun = {
	status: string;
	dateTime: string;
	userStories: {
		items: Array<{ id: string }>;
	}
};

type TestRuns = {
	count: number;
	items: Array<TestRun>;
};

type UserStoryFailing = {
	count: number
	items: Array<{
		firstIntroduction: string;
		isResolved: boolean;
	}>
};

type UserStory = {
	id: string;
	failing: UserStoryFailing;
	title: string;
	isTestCase: boolean;
	testCreatedDate: string;
	testRuns: TestRuns;
};

export type UserStories = {
	count: number;
	items: Array<UserStory>
};

type Release = {
	count: number;
	items: Array<{ releaseDate: string }>
};

export type Project = {
	id: string;
	name: string;
	avatar: Avatar;
	configuration: Configuration;
	hasReceivedEvents: boolean;
	userStories: UserStories;
	release?: Release;
};

export interface IUser {
	id?: string;
	email: string;
	name?: string;
	avatar: string;
	nickname: string;
	idToken?: string;
	error?: string;
	projects?: Array<Project>;
}

declare global {
	interface Window {
		__user?: IUser;
		Intercom?: Intercom;
	}
}

export const UserContext = createContext(null);

export const getUser = (serverSideUser?: IUser): IUser | void => {
	if (isServer) {
		return serverSideUser;
	}

	return window.__user || serverSideUser;
};

export const removeUser = (): void => {
	if (isServer) {
		return;
	}

	delete window.__user;
};

export const storeUser = (user: IUser): void => {
	if (isServer) {
		return;
	}

	window.__user = user;
};

export const goToLogin = () => {
	if (isServer) {
		return;
	}

	const redirectTo = encodeURIComponent(
		window.location.pathname + window.location.search
	);
	const loginHref = `/api/login?redirectTo=${redirectTo}`;
	window.location.href = loginHref;
};

export const CURRENT_USER_QUERY = gql`
	query CurrentUser {
		user {
			id
			email
		}
	}
`;

const USER_SIGN_UP_MUTATION = gql`
	mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
		userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
			id
			email
		}
	}
`;

export const getUserId = async (idToken: string) => {
	const client = eightBaseClient(idToken);
	const data = await client.request(CURRENT_USER_QUERY);
	return data.user.id;
};

const splitName = (name: string): { firstName: string; lastName: string } => {
	const nameArray = name.split(' ');
	const firstName = nameArray.slice(0, -1).join(' ');
	const lastName = nameArray.slice(-1).join(' ');
	return {
		firstName,
		lastName,
	};
};

const UPDATE_USER_MUTATION = gql`
	mutation UpdateUser($id: ID!, $user: UserUpdateInput!) {
		userUpdate(filter: { id: $id }, data: $user) {
			id
		}
	}
`;

const uploadAvatar = async (idToken: string, avatar: string) => {
	const { filename, url } = await uploadFileFromUrl(idToken, avatar);
	const fileId = url.split('/').slice(-1)[0];
	return {
		fileId,
		filename,
	};
};

export const confirmOrCreateUser = async (user: IUser) => {
	const client = eightBaseClient(user.idToken);
	await client.request(CURRENT_USER_QUERY).catch(async () => {
		const { userSignUpWithToken } = await client.request(
			USER_SIGN_UP_MUTATION,
			{
				user: {
					email: user.email,
				},
				authProfileId: process.env.EIGHT_BASE_AUTH_PROFILE_ID,
			}
		);
		const { firstName, lastName } = splitName(user.name);
		const { fileId, filename } = await uploadAvatar(user.idToken, user.avatar);
		await client.request(UPDATE_USER_MUTATION, {
			id: userSignUpWithToken.id,
			user: {
				firstName,
				lastName,
				avatar: {
					create: {
						fileId,
						filename,
					},
				},
			},
		});
	});
};

export const updateProfile = async (
	idToken: string,
	data: { name: string; jobTitle: string }
) => {
	const client = eightBaseClient(idToken);
	const id = await getUserId(idToken);
	const { firstName, lastName } = splitName(data.name);

	let result;
	try {
		result = await client.request(UPDATE_USER_MUTATION, {
			id,
			user: {
				firstName,
				lastName,
				jobTitle: data.jobTitle,
			},
		});
	} catch (error) {
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};

const UPDATE_AVATAR_MUTATION = gql`
	mutation UpdateAvatar($id: ID!, $fileId: String!, $filename: String!) {
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

export const updateAvatar = async (
	idToken: string,
	data: { fileId: string; filename: string }
) => {
	const client = eightBaseClient(idToken);
	const id = await getUserId(idToken);

	let result;
	try {
		result = await client.request(UPDATE_AVATAR_MUTATION, {
			id,
			fileId: data.fileId,
			filename: data.filename,
		});
	} catch (error) {
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};

const USER_AVATAR_QUERY = gql`
	query CurrentUser {
		user {
			avatar {
				downloadUrl
				shareUrl
			}
		}
	}
`;

export const getUserAvatar = async (idToken: string) => {
	const client = eightBaseClient(idToken);
	try {
		const data = await client.request(USER_AVATAR_QUERY);
		return data.user.avatar?.downloadUrl || '';
	} catch (error) {
		console.error(error);
		return error;
	}
};
