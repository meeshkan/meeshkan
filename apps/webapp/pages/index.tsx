import { useEffect, useContext } from 'react';
import LoadingScreen from '../components/organisms/loading-screen';
import Card from '../components/atoms/card';
import { UserContext } from '../utils/user';

type IndexProps = {
	cookies: string | undefined;
};

const Index = (props: IndexProps) => {
	const { projects, project, setProject } = useContext(UserContext);

	useEffect(() => {
		if (projects.length > 0) {
			setProject(projects[0]);
		}
	}, [projects, setProject]);

	return <LoadingScreen as={Card} />;
};

export default Index;

export { getServerSideProps } from '../components/molecules/chakra';
