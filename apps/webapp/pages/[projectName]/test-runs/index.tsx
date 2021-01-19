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

const doughnutDefaultDataValues = [80, 8, 12];
const doughnutData = {
	labels: ['Passing', "Didn't run", 'Failure'],
	datasets: [
		{
			data: doughnutDefaultDataValues,
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

	const testRuns = project?.release.items[0]?.testRuns?.items;
	const testRunsData = testRuns && _.countBy(testRuns
		.map(testRun => testRun.testOutcome.items.map(outcome => outcome.status))
		.reduce((pre, cur) => pre.concat(cur), []) || []);

	if (testRunsData?.queued) {
		delete testRunsData.queued;
	}

	const doughnutDataValues = Object.values(testRunsData || {});
	doughnutData.datasets[0].data = doughnutDataValues;
	doughnutData.labels = Object.keys(testRunsData || {});

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
		<Flex direction="column" w="100%" p={[6, 0, 0, 0]}>
			<GridCard title="Latest case status" mb={6} flex="0 0 auto">
				{doughnutDataValues.length > 0 ? (
					<Doughnut data={doughnutData} options={doughnutOptions} height={30} />
				) : (
					<Text fontStyle="italic">We don't have enough test runs just yet.</Text>
				)}
			</GridCard>
			<Stack spacing={6} overflowY="scroll">
				{testRuns
					.map((testRun, index) => {
						const { status, createdAt } = testRun;
						return (
							<TestRunCard
								status={status}
								runNumber={index + 1}
								date={new Date(createdAt)}
								stats={_.countBy(
									testRun.testOutcome.items
										.map(outcome => outcome.status)
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
