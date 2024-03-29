import React, { useContext } from 'react';
import {
	Flex,
	Stack,
	Text,
	Box,
	List,
	ListItem,
	useColorModeValue,
	Alert,
	AlertIcon,
	AlertDescription,
	useColorMode,
	Button,
	LightMode,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import _ from 'lodash';
import theme, {
	EmptyDoughnutIcon,
	FilterIcon,
	SortIcon,
} from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import TestRunCard from '../../../components/molecules/test-run-card';
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import ValidatedBillingPlan from '../../../components/molecules/validated-billing-plan';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';
import { capitalize } from '../../../utils/capitalize';
import { TriggerTestRun } from '../../../utils/test-triggers';
import { eightBaseClient } from '../../../utils/graphql';
import useSWR from 'swr';
import { TEST_RUNS } from '../../../graphql/test-run';
import { TestRunListResponse } from '@frontend/meeshkan-types';
import DemoPlan from '../../../components/molecules/demo-plan';

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
	const user = useContext(UserContext);
	const { project, idToken } = user;
	const { colorMode } = useColorMode();

	const client = eightBaseClient(idToken);
	const onDemoPlan = project?.configuration?.plan === 'Demo';

	// Initial data fetch
	const fetcher = (query: string) =>
		client.request(query, {
			projectId: project?.id,
		});

	type TestRunsResponse = {
		testRunsList: TestRunListResponse;
	};

	const { data, error, isValidating } = useSWR<TestRunsResponse>(
		TEST_RUNS,
		fetcher
	);
	if (loading || isValidating) {
		return <LoadingScreen as={Card} />;
	}
	if (error || !found || !data) {
		return <NotFoundError />;
	}

	// const testRuns = project?.release.items[0]?.testRuns?.items;
	const testRuns = data.testRunsList.items;
	const sortedTestRuns = testRuns?.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	const completedTestRuns =
		sortedTestRuns?.filter((testRun) => testRun.status === 'completed') || [];

	const latestTestRun =
		completedTestRuns.length > 0 ? completedTestRuns[0] : null;

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

	const borderColor = useColorModeValue('gray.300', 'gray.600');
	const backgroundColor = useColorModeValue('gray.200', 'gray.700');
	const emptyDoughnutColor = useColorModeValue('gray.100', 'gray.800');

	return (
		<ValidatedBillingPlan>
			<Flex direction="column" w="100%" p={[6, 0, 0, 0]}>
				{onDemoPlan && <DemoPlan />}
				<Alert
					status="warning"
					mb={4}
					mt={onDemoPlan ? 4 : 0}
					p={3}
					flex="none"
				>
					<AlertIcon />
					<AlertDescription>
						Test runs are experimental at this time.
					</AlertDescription>
				</Alert>
				<Box overflowY="auto">
					<GridCard
						title="Latest complete test case status"
						subtitle="This is the breakdown of tests from the newest test run. Click on individual test runs below for further details."
						mb={12}
						flex="0 0 auto"
					>
						{doughnutDataValues.length > 0 ? (
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
												<Text fontSize="40px" fontWeight="700">
													{Math.round(
														(latestTestRunStats[label] / totalTestRunOutcomes) *
															100
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
						) : (
							<Flex w="100%" align="center">
								<EmptyDoughnutIcon
									h="128px"
									w="128px"
									color={emptyDoughnutColor}
									mr={6}
								/>
								<Text fontStyle="italic">
									There are no test cases with 'passing', 'failing', or 'did not
									run' status in the latest test run.
								</Text>
							</Flex>
						)}
					</GridCard>
					<Flex justify="flex-end" mb={3}>
						<Button
							isDisabled
							size="sm"
							variant="ghost"
							sx={{
								mixBlendMode: colorMode === 'light' ? 'multiply' : 'normal',
							}}
							colorScheme="gray"
							fontWeight="400"
							mr={2}
							leftIcon={<SortIcon />}
						>
							Sort
						</Button>
						<Button
							isDisabled
							size="sm"
							variant="ghost"
							colorScheme="gray"
							sx={{
								mixBlendMode: colorMode === 'light' ? 'multiply' : 'normal',
							}}
							fontWeight="400"
							mr={4}
							leftIcon={<FilterIcon />}
						>
							Filter
						</Button>
						<LightMode>
							<TriggerTestRun onDemoPlan={onDemoPlan} singleOrAll="all" />
						</LightMode>
					</Flex>

					{sortedTestRuns.length > 0 ? (
						<Stack spacing={6}>
							{sortedTestRuns.map((testRun, index) => {
								const { id, status, runLink, createdAt } = testRun;
								return (
									<TestRunCard
										id={id}
										key={id}
										status={status}
										runNumber={testRuns.length - index}
										runLink={runLink}
										date={new Date(createdAt)}
										stats={_.countBy(
											testRun.testOutcome.items.map((outcome) => outcome.status)
										)}
									/>
								);
							})}
						</Stack>
					) : (
						<Stack spacing={6}>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								opacity="0.9"
								border="1px dashed"
								borderColor={borderColor}
								borderRadius="lg"
								h="64px"
								backgroundColor={backgroundColor}
							>
								<Text fontStyle="italic" fontSize="md">
									Test runs will show up here.
								</Text>
							</Box>
							<Box
								opacity="0.6"
								border="1px dashed"
								borderColor={borderColor}
								borderRadius="lg"
								h="64px"
								backgroundColor={backgroundColor}
							/>
							<Box
								opacity="0.3"
								border="1px dashed"
								borderColor={borderColor}
								borderRadius="lg"
								h="64px"
								backgroundColor={backgroundColor}
							/>
						</Stack>
					)}
				</Box>
			</Flex>
		</ValidatedBillingPlan>
	);
};

export default TestRunsPage;
