import ChakraProvider from '../components/molecules/chakra';
import LoadingScreen from '../components/organisms/loading-screen';
import { UserContext, IUser } from '../utils/user';
import { useFetchUser } from '../hooks/use-fetch-user';

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
