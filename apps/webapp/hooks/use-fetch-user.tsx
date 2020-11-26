import { useEffect } from 'react';
import useSWR from 'swr';
import {
	getUser,
	removeUser,
	goToLogin,
	storeUser,
	IUser,
} from '../utils/user';

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
		if (user) {
			storeUser(user);
		}
	}, [user]);

	return { user, loading: isValidating };
};
