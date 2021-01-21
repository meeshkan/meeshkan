import { useContext } from 'react';
import {
	Flex,
	Stack,
	Text,
	Box,
	List,
	ListItem,
	Center,
	useColorModeValue,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import _ from 'lodash';
import theme from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import TestRunCard from '../../../components/molecules/test-run-card';
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const doughnutDefaultDataValues = [80, 8, 12];
const doughnutBackgroundColors = [
	theme.colors.blue[500],
	theme.colors.blue[700],
	theme.colors.blue[300],
];

const doughnutData = {
	labels: ['Passing', "Didn't run", 'Failing'],
	datasets: [
		{
			data: doughnutDefaultDataValues,
			backgroundColor: doughnutBackgroundColors,
			borderColor: theme.colors.transparent,
		},
	],
};

const TestRunsPage = () => {
	const { found, loading } = useValidateSelectedProject();
	const { project } = useContext(UserContext);

	const testRuns = project?.release.items[0]?.testRuns?.items;
	const latestTestRun = testRuns?.sort(
		(a, b) => new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()
	)[0];

	const latestTestRunStats =
		latestTestRun &&
		_.countBy(
			latestTestRun.testOutcome.items
				.map((outcome) => capitalize(outcome.status))
				.reduce((pre, cur) => pre.concat(cur), []) || []
		);

	const validTestRunStatus = ['Passing', 'Failing', 'Did not run'];
	Object.keys(latestTestRunStats || {}).forEach(
		(key) => validTestRunStatus.includes(key) || delete latestTestRunStats[key]
	);

	const doughnutDataValues = Object.values(latestTestRunStats || {});
	const totalTestRunOutcomes = doughnutDataValues.reduce((a, b) => a + b, 0);
	doughnutData.datasets[0].data = doughnutDataValues;
	const doughnutDataLabels = Object.keys(latestTestRunStats || {});
	doughnutData.labels = doughnutDataLabels;

	const doughnutOptions = {
		legend: {
			display: false,
		},
		responsive: false,
		maintainAspectRatio: false,
	};

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return (
		<Flex direction="column" w="100%" p={[6, 0, 0, 0]}>
			{doughnutDataValues.length > 0 && (
				<GridCard title="Latest test case status" mb={12} flex="0 0 auto">
					<Flex
						justify="center"
						align="center"
						direction={['column', 'column', 'row', 'row']}
					>
						<Doughnut
							data={doughnutData}
							options={doughnutOptions}
							height={150}
							width={125}
						/>
						<Stack
							as={List}
							direction={['column', 'row']}
							spacing={[4, 8]}
							ml={[0, 0, 16]}
							mt={[8, 0]}
						>
							{doughnutDataLabels.map((label, index) => {
								return (
									<ListItem
										key={label}
										d="flex"
										flexDirection="column"
										alignItems="center"
									>
										<Text fontSize="40px" fontWeight={700}>
											{Math.round(
												(latestTestRunStats[label] / totalTestRunOutcomes) * 100
											)}
											%
										</Text>
										<Flex align="center">
											<Box
												borderRadius="md"
												bg={doughnutBackgroundColors[index]}
												w={4}
												h={4}
											/>
											<Text ml={3}>{label}</Text>
										</Flex>
									</ListItem>
								);
							})}
						</Stack>
					</Flex>
				</GridCard>
			)}
			{testRuns.length > 0 ? (
				<Stack spacing={6} overflowY="scroll">
					{testRuns.map((testRun, index) => {
						const { status, createdAt } = testRun;
						return (
							<TestRunCard
								status={status}
								runNumber={index + 1}
								date={new Date(createdAt)}
								stats={_.countBy(
									testRun.testOutcome.items.map((outcome) => outcome.status)
								)}
							/>
						);
					})}
				</Stack>
			) : (
				<Center h="100%" as={Card}>
					<Text fontStyle="italic" fontSize="lg">
						There are no test runs for this project just yet.
					</Text>
				</Center>
			)}
		</Flex>
	);
};

export default TestRunsPage;
