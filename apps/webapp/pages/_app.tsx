import React, { useContext, useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import withAuth from '../hocs/with-auth';
import withChakra from '../hocs/with-chakra';
import { UserContext } from '../utils/user';
import PlanAndBillingCard from '../components/organisms/plan-and-billing';
import Card from '../components/atoms/card';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const CustomApp = ({ Component, pageProps }: AppProps) => {
	const user = useContext(UserContext);
	const router = useRouter();
	const isInvitePage = router.pathname === '/invite/[inviteId]';
	const mixpanel = useAnalytics();
	const freePlan = user?.project?.configuration.plan == 'Free';

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
				{freePlan ? (
					<Card w="full" h="min-content">
						<Alert status="info" mb={8}>
							<AlertIcon />
							<AlertTitle mb={0}>You are on the free plan.</AlertTitle>
							We will notify you when free functionality is exposed. If you'd
							like earlier acccess, feel free to upgrade.
						</Alert>
						<PlanAndBillingCard />
					</Card>
				) : (
					<Component {...pageProps} />
				)}
			</Layout>
		</>
	);
};

export default withChakra(withAuth(CustomApp));
