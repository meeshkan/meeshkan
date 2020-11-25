import get from 'lodash/get';
import { useContext } from 'react';
import { UserContext } from '../utils/user';

export const useUser = () => {
	const user = useContext(UserContext);
	return user;
};
