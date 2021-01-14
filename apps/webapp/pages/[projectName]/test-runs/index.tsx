import { Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Bar, Doughnut } from 'react-chartjs-2';
import theme from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';

const doughnutDataValues = [80, 8, 12];
const doughnutData = {
	labels: ['Passing', 'Didn\'t run', 'Failure'],
	datasets: [
		{
			data: doughnutDataValues, 
			backgroundColor: [
				theme.colors.blue[500],
				theme.colors.blue[700],
				theme.colors.blue[900],
			],
			borderColor: theme.colors.transparent,
		},
	],
};

const TestRunsPage = () => {
	const { found, loading } = useValidateSelectedProject();

	const doughnutOptions = {
		legend: {
			labels: {
				boxWidth: 12,
				fontColor: useColorModeValue(
					theme.colors.gray[600],
					theme.colors.gray[400]
				),
			},
			position: 'right',
			align: 'center',
		},
	};

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return (
		<Stack p={[6, 0, 0, 0]} w="100%" spacing={6}>
			<GridCard title="Latest case status">
				{doughnutDataValues.length > 0 ? (
					<Doughnut data={doughnutData} options={doughnutOptions} />
				) : (
					<Text fontStyle="italic">
						No tests have been run yet.
					</Text>
				)}
			</GridCard>
		</Stack>
	);
};

export default TestRunsPage;
