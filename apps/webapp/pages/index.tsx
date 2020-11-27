import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import Grid from '../components/organisms/grid';
import withAuth from '../hocs/with-auth';

type IndexProps = {
	cookies: string | undefined;
};

const Index = ({ cookies }: IndexProps) => {
	return (
		<Layout>
			<SideBar />
			<Grid />
		</Layout>
	);
};

export default withAuth(Index);

export { getServerSideProps } from '../components/molecules/chakra';
