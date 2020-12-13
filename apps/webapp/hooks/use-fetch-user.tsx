import { useEffect } from 'react';
import useSWR from 'swr';
import { getUser, removeUser, storeUser, IUser } from '../utils/user';
import { boot as bootIntercom } from '../utils/intercom';

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
	}

	useEffect(() => {
		if (user) {
			storeUser(user);
			// Temporarily comment out intercom code that causes an error.
			// bootIntercom({
			// 	id: user.id,
			// 	email: user.email,
			// });
		}
	}, [user]);

	return { user, loading: isValidating };
};
