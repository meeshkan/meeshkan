import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import Grid from '../components/organisms/grid';
import withAuth from '../hocs/with-auth';

type IndexProps = {
	cookies: string | undefined;
	isOnboarding: boolean;
};

const Index = ({ cookies, isOnboarding }: IndexProps) => {
	return (
		<Layout>
			<SideBar />
			<Grid isOnboarding={isOnboarding} />
		</Layout>
	);
};

export default withAuth(Index);

export const getServerSideProps = ({ req: request }) => {
	return {
		props: {
			cookies: request.headers.cookie ?? '',
			isOnboarding: (request.query && request.query.onboarding) ?? null,
		},
	};
};
