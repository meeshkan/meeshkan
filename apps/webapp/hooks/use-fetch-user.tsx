import { useEffect } from 'react';
import useSWR, { responseInterface } from 'swr';
import { IUser } from '@frontend/meeshkan-types';
import { boot as bootIntercom } from '../utils/intercom';

type IUseFetchUser = {
	user: void | IUser;
	loading: boolean;
	mutate: responseInterface<void | IUser, any>['mutate'];
};

export const useFetchUser = (): IUseFetchUser => {
	const { data: user, isValidating, mutate } = useSWR('/api/session');

	useEffect(() => {
		if (user) {
			bootIntercom({
				id: user.id,
				email: user.email,
			});
			window.CommandBar.boot(user.id);
		}
	}, [user]);

	return { user, loading: isValidating, mutate };
};
