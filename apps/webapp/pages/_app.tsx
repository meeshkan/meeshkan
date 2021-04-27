import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import withAuth from '../hocs/with-auth';
import withChakra from '../hocs/with-chakra';

const CustomApp = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const isInvitePage = router.pathname === '/invite/[inviteId]';
	const mixpanel = useAnalytics();

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			mixpanel.track('Navigation', {
				destinationUrl: url,
				destinationPathname: Router.pathname,
			});
		};

		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, []);

	return (
		<>
			<Head>
				<title>
					{process.env.NODE_ENV === 'production'
						? `Meeshkan Webapp`
						: `Dev — Meeshkan Webapp`}{' '}
				</title>
			</Head>
			<Layout>
				{!isInvitePage && <SideBar />}
				
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default withChakra(withAuth(CustomApp));
