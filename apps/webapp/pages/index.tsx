import { useEffect, useContext } from 'react';
import { Stack } from '@chakra-ui/react';
import LoadingScreen from '../components/organisms/loading-screen';
import Onboarding from '../components/organisms/onboarding';
import Card from '../components/atoms/card';
import { UserContext } from '../utils/user';

type IndexProps = {
	cookies: string | undefined;
};

const Index = (props: IndexProps) => {
	const { idToken, projects, setProject } = useContext(UserContext);
	const hasProjects = projects.length > 0;

	useEffect(() => {
		if (hasProjects) {
			setProject(projects[0]);
		}
	}, [projects, setProject, hasProjects]);

	if (idToken && !hasProjects) {
		return (
			<Stack
				as={Card}
				p={[6, 0, 0, 0]}
				w="100%"
				rounded="lg"
				spacing={6}
				{...props}
			>
				<Onboarding />
			</Stack>
		);
	}

	return <LoadingScreen as={Card} />;
};

export default Index;

export { getServerSideProps } from '../components/molecules/chakra';
