import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import Grid from '../../components/organisms/grid';
import Card from '../../components/atoms/card';

type ProjectProps = {
	cookies: string | undefined;
};

const Project = (props: ProjectProps) => {
	const { loading } = useValidateSelectedProject();

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	return (
		<Grid />
	);
};

export default Project;

export { getServerSideProps } from '../../components/molecules/chakra';
