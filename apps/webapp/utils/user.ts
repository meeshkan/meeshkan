import get from 'lodash/get';
import { createContext } from 'react';
import { gql } from 'graphql-request';
import { eightBaseClient } from './graphql';

const isServer = typeof window === 'undefined';

export interface IUser {
	email: string;
	name?: string;
	avatar: string;
	nickname: string;
	idToken?: string;
	error?: string;
}

declare global {
	interface Window {
		__user?: IUser;
	}
}

export const UserContext = createContext(null);

export const getUser = (serverSideUser?: IUser): IUser | void => {
	if (isServer) {
		return serverSideUser;
	}

	return window.__user || serverSideUser;
}

export const removeUser = (): void => {
	if (isServer) {
		return;
	}

	delete window.__user;
}

export const storeUser = (user: IUser): void => {
	if (isServer) {
		return;
	}

	window.__user = user;
}

export const goToLogin = () => {
	if (isServer) {
    return;
  }

	const redirectTo = encodeURIComponent(
		window.location.pathname + window.location.search
	);
	const loginHref = `/api/login?redirectTo=${redirectTo}`;
	window.location.href = loginHref;
}

const CURRENT_USER_QUERY = gql`
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

export const confirmOrCreateUser = async (user: IUser) => {
  const client = eightBaseClient(user.idToken);
	await client.request(
		CURRENT_USER_QUERY,
	)
		.catch(() => client.request(
			USER_SIGN_UP_MUTATION,
			{
				user: {
					email: user.email,
				},
				authProfileId: process.env.EIGHT_BASE_AUTH_PROFILE_ID,
			}
		));
}
