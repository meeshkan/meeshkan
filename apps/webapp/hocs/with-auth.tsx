import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createSlug } from '../utils/createSlug';
import LoadingScreen from '../components/organisms/loading-screen';
import AuthScreen from '../components/organisms/auth-screen';
import { UserContext, IUser } from '../utils/user';
import { useFetchUser } from '../hooks/use-fetch-user';

export interface IWithAuthProps {
	cookies: string | undefined;
	user?: IUser;
}

const withAuth = (PageComponent) => {
	return (props: IWithAuthProps): JSX.Element => {
		const router = useRouter();
		const { user, loading } = useFetchUser(props.user);
		const [project, setProject] = useState({ id: -1, name: '' });
		const isInvitePage = router.pathname === '/invite/[inviteId]';

		useEffect(() => {
			if (project.name) {
				router.push(router.pathname.includes('[projectName]')
					? router.pathname.replace('[projectName]', createSlug(project.name))
					: `/${createSlug(project.name)}`);
			}
		}, [project]);

		if (isInvitePage) {
			return <PageComponent {...props} />;
		}

		if (user && !user.error) {
			const providerValue = { ...user, project, setProject };
			return (
				<UserContext.Provider value={providerValue}>
					<PageComponent {...props} />
				</UserContext.Provider>
			);
		}

		if (loading) {
			return <LoadingScreen h="100vh" />;
		}

		return <AuthScreen />;
	};
};

export default withAuth;
