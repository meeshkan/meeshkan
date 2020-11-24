import get from 'lodash/get';
import { useContext } from 'react';

import { UserContext } from '../utils/user';

export default function useUser() {
	const user = useContext(UserContext);
	const email = get(user, 'email');

	return {
		...user,
		email,
	};
}
