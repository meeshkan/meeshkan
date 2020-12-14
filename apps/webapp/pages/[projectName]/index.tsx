import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import LoadingScreen from '../../components/organisms/loading-screen';
import Grid from '../../components/organisms/grid';
import { UserContext } from '../../utils/user';

type ProjectProps = {
	cookies: string | undefined;
};

const Project = (props: ProjectProps) => {
	const { projects, project, setProject } = useContext(UserContext);
	const router = useRouter();
	const { projectName } = router.query;

	useEffect(() => {
		const selectedProject = projects.find(
			(project) => slugify(project.name, { lower: true }) === projectName
		);

		selectedProject ? setProject(selectedProject) : router.push('/404');
	}, [projectName, projects, setProject]);

	if (project.id === -1) {
		return <LoadingScreen />;
	}

	return (
		<Grid />
	);
};

export default Project;

export { getServerSideProps } from '../../components/molecules/chakra';
