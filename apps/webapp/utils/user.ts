import get from 'lodash/get';
import { createContext, useEffect } from 'react';
import useSWR from 'swr';

const isServer = typeof window === 'undefined';
const isDisabled = process.env.NEXT_PUBLIC_AUTH_DISABLED === 'true';

export interface IUser {
	email: string;
	picture: string;
	nickname: string;
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

export const getIdToken = (): string | void => {
	return get(getUser(), 'idToken');
}

const goToLogin = () => {
	if (isServer || isDisabled) {
    return;
  }

	const redirectTo = encodeURIComponent(
		window.location.pathname + window.location.search
	);
	const loginHref = `/api/login?redirectTo=${redirectTo}`;
	window.location.href = loginHref;
}

export const useFetchUser = (
	serverSideUser?: IUser
): {
	user: void | IUser;
	loading: boolean;
} => {
	const { data: user, error, isValidating } = useSWR('/api/session', {
		initialData: getUser(serverSideUser),
	});

	if (error || (user && user.error)) {
		removeUser();
		goToLogin();
	}

	useEffect(() => {
		if (user) storeUser(user);
	}, [user]);

	return { user, loading: isValidating };
}
