import ChakraProvider from './molecules/chakra';
import LoadingScreen from './organisms/loading-screen';
import { useFetchUser, UserContext, IUser } from '../utils/user';

export interface IWithAuthProps {
	user?: IUser;
}

const withAuth = (PageComponent) => {
	return function AuthenticatedComponent(props: IWithAuthProps): JSX.Element {
		const { user } = useFetchUser(props.user);
		if (!user || (user && user.error)) {
			return (
				<ChakraProvider cookies={undefined}>
					<LoadingScreen />
				</ChakraProvider>
			);
		}

		return (
			<UserContext.Provider value={user}>
				<PageComponent {...props} />
			</UserContext.Provider>
		);
	};
};

export default withAuth;
