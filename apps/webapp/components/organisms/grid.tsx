import React, { useState, useContext, useMemo } from 'react';
import {
	Box,
	Stack,
	Flex,
	List,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	SimpleGrid,
	Heading,
	useColorModeValue,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createSlug } from '../../utils/createSlug';
import { ArrowForwardIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import theme from '@frontend/chakra-theme'; // GitPullRequestIcon, // GitLabIcon, // GitCommitIcon, // GitMergeIcon,
import Card from '../atoms/card';
import StatCard from '../molecules/stat-card';
import GridCard from '../molecules/grid-card';
// import ActivityListItem from '../molecules/activity-list-item';
// import LinearListItem from '../molecules/linear-list-item';
import ConfidenceBreakdownItem from '../molecules/confidence-breakdown-item';
import ScriptTag from '../../components/molecules/script-tag';
import { UserContext, UserStories } from '../../utils/user';
import {
	getTestRuns,
	getDaysUntilRelease,
	getBugs,
	getTestCoverage,
	getConfidenceScore,
	getLatestTestStates,
	getRecordingsAndTestsByDay,
	sumOfObjectValues,
	getLastSevenDaysInFormat,
} from '../../utils/metrics';
require('../molecules/rounded-chart');

const barData = {
	labels: ['Nov 22', 'Nov 23', 'Nov 24', 'Nov 25', 'Nov 26', 'Nov 27'],
	datasets: [
		{
			label: '# of recordings',
			data: [1000, 4000, 3000, 5000, 2000, 3000, 5000, 2000],
			backgroundColor: theme.colors.blue[200],
		},
		{
			label: '# of tests',
			data: [2000, 3584, 2485, 4300, 1000, 4000, 5000, 1294],
			backgroundColor: theme.colors.blue[500],
		},
	],
};

const doughnutData = {
	labels: ['Queued', 'Running', 'Passing', 'Run error', 'Failing'],
	datasets: [
		{
			label: '# of Votes',
			data: [80, 12, 5, 3],
			backgroundColor: [
				theme.colors.blue[50],
				theme.colors.blue[200],
				theme.colors.blue[500],
				theme.colors.blue[700],
				theme.colors.blue[900],
			],
			borderColor: theme.colors.transparent,
		},
	],
};

const versions = ['v0.0.2', 'v0.0.1'];

// TODO: fill me in with correct info once we can determine
// the release start date. For now, set arbitrarily to 30 days.
const getReleaseStartFromProject = (a) =>
	new Date().getTime() - 1000 * 60 * 60 * 24 * 30;

const calcPctChange = (key, confidenceScoreSevenDaysAgo, dataPoint) =>
	confidenceScoreSevenDaysAgo.dataPoints[key]
		? confidenceScoreSevenDaysAgo.dataPoints[key].score === 0
			? dataPoint.score === 0
				? 0
				: 100
			: ((confidenceScoreSevenDaysAgo.dataPoints[key].score - dataPoint.score) *
					100) /
			  confidenceScoreSevenDaysAgo.dataPoints[key].score
		: 0;

const Grid = (props) => {
	const { project: selectedProject } = useContext(UserContext);
	const router = useRouter();
	const slugifiedProjectName = useMemo(() => createSlug(selectedProject.name), [
		selectedProject.name,
	]);

	const [showScript, setShowScript] = useState<boolean>(
		!selectedProject?.hasReceivedEvents
	);

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

	const barOptions = {
		legend: {
			labels: {
				boxWidth: 12,
				fontColor: useColorModeValue(
					theme.colors.gray[600],
					theme.colors.gray[400]
				),
			},
			position: 'bottom',
			align: 'center',
		},
		cornerRadius: 6,
		scales: {
			yAxes: [
				{
					type: 'linear',
					stacked: false,
					ticks: {
						maxTicksLimit: 4,
						beginAtZero: true,
						display: true,
					},
					gridLines: {
						display: false,
					},
				},
			],
			xAxes: [
				{
					stacked: false,
					ticks: {
						display: true,
					},
					gridLines: {
						display: false,
					},
				},
			],
		},
	};

	const [version, setVersion] = useState(versions[0]);

	const userStories: UserStories['items'] = selectedProject.userStories.items;

	const testRuns = getTestRuns(userStories);
	const daysUntilRelease = getDaysUntilRelease(selectedProject);
	const bugs = getBugs(userStories);
	const testCoverage = getTestCoverage(userStories);
	const releaseStart = getReleaseStartFromProject(selectedProject);
	const confidenceScore = getConfidenceScore(
		new Date().getTime(),
		releaseStart,
		userStories
	);
	const confidenceScoreSevenDaysAgo = getConfidenceScore(
		new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		releaseStart,
		userStories
	);
	const latestTestStates = getLatestTestStates(userStories);
	const doughnutDataValues = Object.values(latestTestStates);
	const doughnutDataLabels = Object.keys(latestTestStates);
	doughnutData.datasets[0].data = doughnutDataValues;
	doughnutData.labels = doughnutDataLabels;

	const { recordingsByDay, testsByDay } = getRecordingsAndTestsByDay(
		userStories
	);
	barData.datasets[0].data = Object.values(recordingsByDay);
	barData.datasets[1].data = Object.values(testsByDay);
	const barDataLabels = getLastSevenDaysInFormat('MMM DD');
	barData.labels = barDataLabels;

	const totalRecordings = sumOfObjectValues(recordingsByDay);
	const totalTests = sumOfObjectValues(testsByDay);

	return (
		<Stack p={[4, 0, 0, 0]} w="100%" rounded="lg" spacing={6} {...props}>
			<Flex align="center" justify="space-between">
				<Heading as="h2" fontSize="md" lineHeight="short">
					Last 7 Days
				</Heading>
				<Flex align="center">
					<Heading
						as="h2"
						fontSize="md"
						display="inline"
						lineHeight="short"
						color={useColorModeValue('gray.600', 'gray.400')}
						mr={3}
					>
						Release
					</Heading>
					<Menu>
						<MenuButton
							as={Button}
							size="sm"
							variant="outline"
							colorScheme="gray"
							rightIcon={<ArrowUpDownIcon />}
							w="100%"
							textAlign="left"
						>
							{version}
						</MenuButton>
						<MenuList>
							<MenuOptionGroup
								defaultValue={version}
								title="Versions"
								type="radio"
							>
								{versions.map((version, index) => (
									<MenuItemOption
										key={index}
										value={version}
										onClick={() => setVersion(version)}
									>
										{version}
									</MenuItemOption>
								))}
							</MenuOptionGroup>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
			<Box overflowY="scroll">
				<Flex
					direction={['column', 'column', 'column', 'column', 'row']}
					align="stretch"
					w="100%"
				>
					<Stack spacing={6} w="100%" flex="1">
						<Flex
							as={Card}
							justify="space-between"
							align={['center', 'stretch', 'stretch', 'stretch']}
							direction={['column', 'row', 'row', 'row']}
						>
							<StatCard
								title="Confidence score"
								value={Number(
									confidenceScore.displayableMetric.value.toFixed(2)
								)}
								percentageChange={
									confidenceScoreSevenDaysAgo.displayableMetric.value === 0
										? confidenceScore.displayableMetric.value === 0
											? 0
											: 100
										: ((confidenceScoreSevenDaysAgo.displayableMetric.value -
												confidenceScore.displayableMetric.value) *
												100) /
										  confidenceScoreSevenDaysAgo.displayableMetric.value
								}
								dataPoints={confidenceScore.displayableMetric.dataPoints}
								my={[8, 0, 0, 0]}
							/>
							<StatCard
								title="Test coverage"
								value={Number(testCoverage.value.toFixed(2))}
								percentageChange={testCoverage.percentageChange}
								dataPoints={testCoverage.dataPoints}
								my={[8, 0, 0, 0]}
							/>
							<StatCard
								isPercentage={false}
								title="Tests ran"
								value={testRuns.value}
								percentageChange={testRuns.percentageChange}
								dataPoints={testRuns.dataPoints}
							/>
						</Flex>
						{showScript && (
							<ScriptTag handleClose={() => setShowScript(false)} />
						)}
						<Flex flex="1">
							<SimpleGrid
								columns={[1, 1, 2, 2]}
								spacingX={6}
								spacingY={6}
								w="100%"
							>
								<GridCard title="Confidence change">
									<List
										spacing={3}
										color={useColorModeValue('gray.600', 'gray.400')}
										fontSize="sm"
									>
										{Object.entries(confidenceScore.dataPoints)
											.filter(
												([key, dataPoint]) =>
													0 !==
													calcPctChange(
														key,
														confidenceScoreSevenDaysAgo,
														dataPoint
													)
											)
											.slice(0, 8)
											.map(([key, dataPoint]) => (
												<ConfidenceBreakdownItem
													key={key}
													value={calcPctChange(
														key,
														confidenceScoreSevenDaysAgo,
														dataPoint
													)}
													description={dataPoint.title}
												/>
											))}
									</List>
								</GridCard>
								<GridCard title="Recordings vs. Tests">
									<Bar data={barData} options={barOptions} />
									<Stack
										direction={['column', 'row']}
										justify="space-between"
										mt={4}
									>
										<Flex>
											<Text fontWeight={900} mr={2}>
												{totalRecordings}
											</Text>
											<Text color={useColorModeValue('gray.500', 'gray.400')}>
												Recordings
											</Text>
										</Flex>
										<Flex>
											<Text fontWeight={900} mr={2}>
												{totalTests}
											</Text>
											<Text color={useColorModeValue('gray.500', 'gray.400')}>
												Tests
											</Text>
										</Flex>
									</Stack>
									<Button
										mt={4}
										size="sm"
										colorScheme="gray"
										variant="subtle"
										w="full"
										onClick={() =>
											router.push(`/${slugifiedProjectName}/user-stories`)
										}
									>
										Review recordings <ArrowForwardIcon ml={2} />
									</Button>
								</GridCard>
								<GridCard title="Test suite state">
									<Box w="275px">
										{doughnutDataValues.length > 0 ? (
											<Doughnut data={doughnutData} options={doughnutOptions} />
										) : (
											<Text fontStyle="italic">
												No tests have been run yet.
											</Text>
										)}
									</Box>
								</GridCard>
								<GridCard title="Overview">
									<Stack direction="row" justify="space-around" mb={6}>
										<Box w="100px">
											<Flex align="baseline">
												<Text fontWeight={900} mr={2}>
													{daysUntilRelease || 'N/A'}
												</Text>
												<Text
													fontSize="sm"
													color={useColorModeValue('gray.500', 'gray.300')}
													fontWeight={500}
												>
													days
												</Text>
											</Flex>
											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight={700}
												fontSize="sm"
											>
												until release
											</Text>
										</Box>
										<Box w="100px">
											<Text fontWeight={900}>
												{confidenceScore.displayableMetric.value >= 90
													? 'Ready'
													: confidenceScore.displayableMetric.value >= 50
													? 'Proceed with caution'
													: 'Do not release'}
											</Text>

											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight={700}
												fontSize="sm"
											>
												merge status
											</Text>
										</Box>
									</Stack>
									<Stack direction="row" justify="space-around">
										<Box w="100px">
											<Flex align="baseline">
												<Text fontWeight={900} mr={2}>
													{bugs.introduced}
												</Text>
												<Text
													fontSize="sm"
													color={useColorModeValue('gray.500', 'gray.300')}
													fontWeight={500}
												>
													bugs
												</Text>
											</Flex>
											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight={700}
												fontSize="sm"
											>
												introduced
											</Text>
										</Box>
										<Box w="100px">
											<Flex align="baseline">
												<Text fontWeight={900} mr={2}>
													{bugs.fixed}
												</Text>
												<Text
													fontSize="sm"
													color={useColorModeValue('gray.500', 'gray.300')}
													fontWeight={500}
												>
													bugs
												</Text>
											</Flex>
											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight={700}
												fontSize="sm"
											>
												fixed
											</Text>
										</Box>
									</Stack>
								</GridCard>
							</SimpleGrid>
						</Flex>
					</Stack>
					<Flex mt={[6, 6, 6, 6, 0]} ml={[0, 0, 0, 0, 6]}>
						<SimpleGrid
							columns={[1, 1, 2, 2, 1]}
							spacingX={6}
							spacingY={6}
							w="100%"
						>
							<GridCard title="Activity">
								<Text fontStyle="italic">Coming soon, stay tuned!</Text>
								{/* <List
									spacing={3}
									color={useColorModeValue('gray.600', 'gray.400')}
								>
									<ActivityListItem
										title="Release successfully merged"
										subtitle="MEM-123 | Improve settings UX"
										icon={GitMergeIcon}
									/>
									<ActivityListItem
										title="Deploy preview ready"
										subtitle="MEM-123 | Improve settings UX"
										icon={GitLabIcon}
									/>
									<ActivityListItem
										title="Deploy preview ready"
										subtitle="MEM-123 | Improve settings UX"
										icon={GitLabIcon}
									/>
									<ActivityListItem
										title="Changes from code review"
										subtitle="MEM-123 | Improve settings UX"
										icon={GitCommitIcon}
									/>
									<ActivityListItem
										title="Pull request opened"
										subtitle="MEM-123 | Improve settings UX"
										icon={GitPullRequestIcon}
									/>
									<ActivityListItem
										title="Changes from code review"
										subtitle="MEM-123 | Improve settings UX"
										icon={GitCommitIcon}
									/>
								</List> */}
							</GridCard>
							<GridCard
								title="Linear Tickets"
								leftIconSrc="https://media.graphcms.com/AIPdNiTtReCzrrRorDL5"
							>
								<Text fontStyle="italic">Coming soon, stay tuned!</Text>
								{/* <List
									spacing={3}
									color={useColorModeValue('gray.600', 'gray.400')}
								>
									<LinearListItem
										title="User can't schedule pickup"
										author="Ryan Florence"
										avatar="https://bit.ly/ryan-florence"
									/>
									<LinearListItem
										title="`basic` user is authorized to save"
										author="Kent C. Dodds"
										avatar="https://bit.ly/kent-c-dodds"
									/>
									<LinearListItem
										title="User can't schedule pickup"
										author="Ryan Florence"
										avatar="https://bit.ly/ryan-florence"
									/>
									<LinearListItem
										title="User can't reschedule a delivery"
										author="Sage Adebayo"
										avatar="https://bit.ly/sage-adebayo"
									/>
									<LinearListItem
										title="`basic` user is authorized to save"
										author="Code Beast"
										avatar="https://bit.ly/code-beast"
									/>
								</List> */}
							</GridCard>
						</SimpleGrid>
					</Flex>
				</Flex>
			</Box>
		</Stack>
	);
};

export default Grid;
