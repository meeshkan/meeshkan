import { useEffect } from 'react';
import useSWR from 'swr';
import { IUser } from '../utils/user';
import { boot as bootIntercom } from '../utils/intercom';

type IUseFetchUser = {
	user: void | IUser;
	loading: boolean;
};

export const useFetchUser = (): IUseFetchUser => {
	const { data: user, error, isValidating } = useSWR('/api/session');

	useEffect(() => {
		if (user) {
			bootIntercom({
				id: user.id,
				email: user.email,
			});
		}
	}, [user]);

	return { user, loading: isValidating };
};
