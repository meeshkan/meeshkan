import ChakraProvider from '../components/molecules/chakra';
import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import Grid from '../components/organisms/grid';
import withAuth from '../hocs/with-auth';

type IndexProps = {
	cookies: string | undefined;
};

const Index = ({ cookies }: IndexProps) => {
	return (
		<ChakraProvider cookies={cookies}>
			<Layout>
				<SideBar />
				<Grid />
			</Layout>
		</ChakraProvider>
	);
};

export default withAuth(Index);

export { getServerSideProps } from '../components/molecules/chakra';
