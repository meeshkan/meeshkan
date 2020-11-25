import get from 'lodash/get';
import { createContext } from 'react';

const isServer = typeof window === 'undefined';
const isDisabled = process.env.NEXT_PUBLIC_AUTH_DISABLED === 'true';

export interface IUser {
	email: string;
	name?: string;
	picture: string;
	nickname: string;
	idToken?: string;
	error?: string;
}

declare global {
	interface Window {
		__user?: IUser;
	}
}

const localUser: IUser = {
	email: 'local',
	picture: 'https://meeshkan.com/icons/icon-384x384.png',
	nickname: 'local',
};

export const UserContext = createContext(null);

export const getUser = (serverSideUser?: IUser): IUser | void => {
	if (isDisabled) {
		return localUser;
	}

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
	if (isServer || isDisabled) {
    return;
  }

	const redirectTo = encodeURIComponent(
		window.location.pathname + window.location.search
	);
	const loginHref = `/api/login?redirectTo=${redirectTo}`;
	window.location.href = loginHref;
}
