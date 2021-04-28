import React, { useContext, useState } from 'react';
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
	Button,
	useColorMode,
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
import { useToaster } from '../../../hooks/use-toaster';

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
	const { colorMode } = useColorMode();
	const [testTriggering, setTestTriggering] = useState(false);
	const toaster = useToaster();

	const testRuns = project?.release.items[0]?.testRuns?.items;
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

	const triggerTestRun = async () => {
		setTestTriggering(true);
		try {
			await fetch(
				process.env.NEXT_PUBLIC_TEST_TRIGGER_ENDPOINT ||
					'https://7cs97h8es9.execute-api.eu-west-1.amazonaws.com/main/test-trigger',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						clientId: project?.id,
						url: project?.configuration?.stagingURL,
					}),
				}
			);
			await toaster({
				title: 'Test run triggered',
				description: 'The run should show up shortly.',
				status: 'success',
			});
		} catch (error) {
			console.log(error.message);
			toaster({
				title: 'Test run failed to trigger',
				description: 'Try again shortly.',
				status: 'error',
			});
		}
		setTestTriggering(false);
	};

	const borderColor = useColorModeValue('gray.300', 'gray.600');
	const backgroundColor = useColorModeValue('gray.200', 'gray.700');
	const emptyDoughnutColor = useColorModeValue('gray.100', 'gray.800');

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return (
		<ValidatedBillingPlan>
			<Flex direction="column" w="100%" p={[6, 0, 0, 0]}>
				<Alert status="warning" mb={4} p={3} flex="none">
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
					{sortedTestRuns.length > 0 ? (
						<Stack spacing={6}>
							{sortedTestRuns.map((testRun, index) => {
								const { id, status, createdAt } = testRun;
								return (
									<TestRunCard
										id={id}
										key={id}
										status={status}
										runNumber={testRuns.length - index}
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
