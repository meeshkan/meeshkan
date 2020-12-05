import { useState, useContext } from 'react';
import Layout from '../components/templates/layout';
import Grid from '../components/organisms/grid';
import withAuth from '../hocs/with-auth';
import { UserContext } from '../utils/user';

type IndexProps = {
	cookies: string | undefined;
};

const Index = ({ cookies }: IndexProps) => {
	const { projects } = useContext(UserContext);
	const [project, setProject] = useState(projects[0] || { id: -1, name: '' });
	return (
		<Layout>
			<Grid project={project} />
		</Layout>
	);
};

export default withAuth(Index);

export { getServerSideProps } from '../components/molecules/chakra';
