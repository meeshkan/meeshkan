import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import Grid from '../../components/organisms/grid';
import Card from '../../components/atoms/card';
import ValidatedBillingPlan from '../../components/molecules/validated-billing-plan';
import NotFoundError from '../404';
import { Button } from '@chakra-ui/react';

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
			<Button
				onClick={() =>
					fetch('/api/lead', {
						method: 'POST',
						headers: new Headers({ 'Content-Type': 'application/json' }),
						body: JSON.stringify({
							email: 'makenna+1@meeshkan.com',
							location: 'pricing',
						}),
					})
				}
			>
				click me
			</Button>
			<Grid />
		</ValidatedBillingPlan>
	);
};

export default Project;

export { getServerSideProps } from '../../components/molecules/chakra';
