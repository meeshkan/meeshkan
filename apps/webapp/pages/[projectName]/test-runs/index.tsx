import { useContext } from 'react';
import {
	Flex,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import _ from 'lodash';
import theme from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import TestRunCard from '../../../components/molecules/test-run-card'
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';

const doughnutDataValues = [80, 8, 12];
const doughnutData = {
	labels: ['Passing', "Didn't run", 'Failure'],
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
	const { project } = useContext(UserContext);

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
		tooltips: {
			callbacks: {
				label: (tooltipItem, data) => {
					const dataset = data.datasets[tooltipItem.datasetIndex];
					const currentValue = dataset.data[tooltipItem.index];
					return `${currentValue}%`;
				},
				title: (tooltipItem, data) => {
					return data.labels[tooltipItem[0].index];
				},
			},
		},
	};

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return (
		<Flex direction="column" w="100%" p={[6, 0, 0, 0]}>
			<GridCard title="Latest case status" mb={6} flex="0 0 auto">
				{doughnutDataValues.length > 0 ? (
					<Doughnut data={doughnutData} options={doughnutOptions} height={30} />
				) : (
					<Text fontStyle="italic">No tests have been run yet.</Text>
				)}
			</GridCard>
			<Stack spacing={6} overflowY="scroll">
				{project.release.items[0]?.testRuns?.items
					.map((testRun, index) => {
						const { status, createdAt } = testRun;
						return (
							<TestRunCard
								status={status}
								runNumber={index + 1}
								date={new Date(createdAt)}
								stats={_.countBy(
									testRun.userStories.items
										.map(story => story.testOutcome.items.map(outcome => outcome.status))
										.reduce((pre, cur) => pre.concat(cur))
								)}
							/>
						);
					})
				}
			</Stack>
		</Flex>
	);
};

export default TestRunsPage;
