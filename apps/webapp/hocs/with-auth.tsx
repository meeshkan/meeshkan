import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { createSlug } from '../utils/createSlug';
import LoadingScreen from '../components/organisms/loading-screen';
import AuthScreen from '../components/organisms/auth-screen';
import { UserContext, IUser, Project } from '../utils/user';
import { useFetchUser } from '../hooks/use-fetch-user';

export interface IWithAuthProps {
	cookies: string | undefined;
}

const withAuth = (PageComponent) => {
	return (props: IWithAuthProps): JSX.Element => {
		const router = useRouter();
		const { user, loading, mutate } = useFetchUser();
		const [project, setProject] = useState<Project>(null);
		const isInvitePage = router.pathname === '/invite/[inviteId]';

		const slugifiedProjectName = useMemo(
			() => createSlug(project?.name || ''),
			[project?.name]
		);

		useEffect(() => {
			if (slugifiedProjectName) {
				router.push(router.pathname.includes('[projectName]')
					? router.pathname.replace('[projectName]', slugifiedProjectName)
					: `/${slugifiedProjectName}`);
			}
		}, [slugifiedProjectName]);

		if (user && !user.error) {
			const providerValue = { ...user, mutate, project, setProject };
			return (
				<UserContext.Provider value={providerValue}>
					<PageComponent {...props} />
				</UserContext.Provider>
			);
		}

		if (isInvitePage) {
			return <PageComponent {...props} />;
		}

		if (loading) {
			return <LoadingScreen h="100vh" />;
		}

		return <AuthScreen />;
	};
};

export default withAuth;
