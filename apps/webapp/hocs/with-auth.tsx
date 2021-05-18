import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { createSlug } from '../utils/createSlug';
import LoadingScreen from '../components/organisms/loading-screen';
import AuthScreen from '../components/organisms/auth-screen';
import { UserContext } from '../utils/user';
import { Project } from '@frontend/meeshkan-types';
import { useFetchUser } from '../hooks/use-fetch-user';
import { useFirstRender } from '../hooks/use-first-render';

export interface IWithAuthProps {
	cookies: string | undefined;
}

const withAuth = (PageComponent: any) => {
	return (props: IWithAuthProps): JSX.Element => {
		const router = useRouter();
		const { user, loading, mutate } = useFetchUser();
		const firstRender = useFirstRender();
		const [project, setProject] = useState<Project>(null);
		const isInvitePage = router.pathname === '/invite/[inviteId]';

		const slugifiedProjectName = useMemo(
			() => createSlug(project?.name || ''),
			[project?.name]
		);

		useEffect(() => {
			if (slugifiedProjectName) {
				let url = router.pathname;
				const query = router.query;
				query.projectName = slugifiedProjectName;
				Object.keys(query).forEach((param) => {
					url = url.replace(`[${param as string}]`, query[param] as string);
				});

				if (url === '/') {
					url = `/${slugifiedProjectName}`;
				}

				router.push(url);
			}
		}, [slugifiedProjectName]);

		useEffect(() => {
			if ((user && !user.error) || loading || firstRender || isInvitePage) {
				return;
			}

			router.push(
				`/api/login${
					router.asPath.length > 1
						? `?redirectTo=${router.asPath}`
						: ''
				}`
			);
		}, [user, loading, firstRender]);

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

		return <LoadingScreen h="100vh" />;
	};
};

export default withAuth;
