import { useState, useContext } from 'react';
import Layout from '../components/templates/layout';
import Grid from '../components/organisms/grid';
import withAuth from '../hocs/with-auth';
import { UserContext } from '../utils/user';

const Index = () => {
	const { projects } = useContext(UserContext);
	const [project, setProject] = useState(projects[0] || { id: -1, name: '' });
	return (
		<Layout>
			<Grid project={project} />
		</Layout>
	);
};

export { getServerSideProps } from '../components/molecules/chakra';

export default withAuth(Index);
