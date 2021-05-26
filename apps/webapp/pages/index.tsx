import { useEffect, useContext } from 'react';
import { Stack } from '@chakra-ui/react';
import LoadingScreen from '../components/organisms/loading-screen';
import Onboarding from '../components/organisms/onboarding';
import Card from '../components/atoms/card';
import { UserContext } from '../utils/user';
import { getProject } from '../utils/project';

type IndexProps = {
	cookies: string | undefined;
};

const Index = (props: IndexProps) => {
	const { idToken, projects, setProject, loadingProject, setLoadingProject } = useContext(UserContext);
	const hasProjects = projects.length > 0;

	useEffect(() => {
		const setDefaultProject = async () => {
			if (!hasProjects) {
				return;
			}

			setLoadingProject(true);
			const firstProject = await getProject(idToken, projects[0].id);
			setProject(firstProject);
			setLoadingProject(false);
		}

		setDefaultProject();
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
