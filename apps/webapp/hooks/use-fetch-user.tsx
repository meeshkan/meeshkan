import { useEffect } from 'react';
import useSWR, { responseInterface } from 'swr';
import { IUser } from '@frontend/meeshkan-types';
import { boot as bootIntercom } from '../utils/intercom';
import { handleExtensionAuthHandshake } from '../utils/extension';

type IUseFetchUser = {
	user: void | IUser;
	loading: boolean;
	mutate: responseInterface<void | IUser, any>['mutate'];
};

export const useFetchUser = (): IUseFetchUser => {
	const { data: user, isValidating, mutate } = useSWR('/api/session');

	useEffect(() => {
		if (!user) {
			return;
		}

		bootIntercom({
			id: user.id,
			email: user.email,
			projectID: user?.project?.id,
			projectName: user?.project?.name,
			projectPlan: user?.project?.configuration?.plan,
			projectWebsite: user?.project?.configuration?.productionURL,
		});

		if (user?.email !== 'test@meeshkan.com') {
			window?.CommandBar?.boot({
				id: user.id,
				eventData: { email: user.email },
			});
		}

		handleExtensionAuthHandshake(user, false);
	}, [user]);

	return { user, loading: isValidating, mutate };
};
