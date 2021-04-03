import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '@organisms/loading-screen';
import Grid from '@organisms/grid';
import Card from '@atoms/card';
import NotFoundError from '../404';

type ProjectProps = {
	cookies: string | undefined;
};

const Project = (props: ProjectProps) => {
	const { found, loading } = useValidateSelectedProject();

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return <Grid />;
};

export default Project;

export { getServerSideProps } from '@molecules/chakra';
