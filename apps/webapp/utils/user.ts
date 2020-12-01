import { createContext } from 'react';
import { gql } from 'graphql-request';
import { eightBaseClient } from './graphql';
import { Intercom } from './intercom';

const isServer = typeof window === 'undefined';

type Avatar = {
	downloadUrl: string;
};

type Configuration = {
	inviteLink: string;
};

export type Project = {
	id: string;
	name: string;
	avatar: Avatar;
	configuration: Configuration;
	hasReceivedEvents: boolean;
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

export const confirmOrCreateUser = async (user: IUser) => {
	const client = eightBaseClient(user.idToken);
	await client.request(CURRENT_USER_QUERY).catch(() =>
		client.request(USER_SIGN_UP_MUTATION, {
			user: {
				email: user.email,
			},
			authProfileId: process.env.EIGHT_BASE_AUTH_PROFILE_ID,
		})
	);
};

const UPDATE_PROFILE_MUTATION = gql`
	mutation UpdateProfile($id: ID!, $firstName: String!, $lastName: String!, $jobTitle: String!) {
		userUpdate(
			filter: {
				id: $id
			}
			data: {
				firstName: $firstName
				lastName: $lastName
				jobTitle: $jobTitle
			}
		) {
			id
		}
	}
`;

export const updateProfile = async (idToken: string, data: { name: string, jobTitle: string }) => {
	const client = eightBaseClient(idToken);
	const id = await getUserId(idToken);
	const nameArray = data.name.split(' ');
	const firstName = nameArray.slice(0, -1).join(' ');
	const lastName = nameArray.slice(-1).join(' ');

	let result;
	try {
		result = await client.request(UPDATE_PROFILE_MUTATION, {
			id,
			firstName,
			lastName,
			jobTitle: data.jobTitle,
		});
	} catch (error) {
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};
