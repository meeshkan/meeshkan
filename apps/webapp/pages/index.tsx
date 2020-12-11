import { useState, useContext } from 'react';
import Grid from '../components/organisms/grid';
import { UserContext } from '../utils/user';

type IndexProps = {
	cookies: string | undefined;
};

const Index = ({ cookies }: IndexProps) => {
	const { projects } = useContext(UserContext);
	const [project, setProject] = useState(projects[0] || { id: -1, name: '' });
	return (
		<>
			<Grid project={project} />
		</>
	);
};

export { getServerSideProps } from '../components/molecules/chakra';

export default Index;
