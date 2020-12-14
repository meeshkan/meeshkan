import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import withAuth from '../hocs/with-auth';
import withChakra from '../hocs/with-chakra';

const CustomApp = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const isInvitePage = router.pathname === '/invite/[inviteId]';
	return (
		<>
			<Head>
				<title>Meeshkan Webapp</title>
			</Head>
			<Layout>
				{!isInvitePage && <SideBar />}
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default withChakra(withAuth(CustomApp));
