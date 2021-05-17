import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import Grid from '../../components/organisms/grid';
import Card from '../../components/atoms/card';
import ValidatedBillingPlan from '../../components/molecules/validated-billing-plan';
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

	return (
		<ValidatedBillingPlan>
			<Grid />
		</ValidatedBillingPlan>
	);
};

export default Project;

export { getServerSideProps } from '../../components/molecules/chakra';
