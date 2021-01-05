import { useEffect } from 'react';
import useSWR, { responseInterface } from 'swr';
import { getUser, removeUser, storeUser, IUser } from '../utils/user';
import { boot as bootIntercom } from '../utils/intercom';

export const useFetchUser = (
	serverSideUser?: IUser
): {
	user: void | IUser;
	loading: boolean;
	mutate: responseInterface<void | IUser, any>['mutate'];
} => {
	const { data: user, error, isValidating, mutate } = useSWR('/api/session', {
		initialData: getUser(serverSideUser),
	});

	if (error || (user && user.error)) {
		removeUser();
	}

	useEffect(() => {
		if (user) {
			storeUser(user);
			bootIntercom({
				id: user.id,
				email: user.email,
			});
		}
	}, [user]);

	return { user, loading: isValidating, mutate };
};
