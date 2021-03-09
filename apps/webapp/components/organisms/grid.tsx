import React, { useState, useEffect, useContext, useMemo } from 'react';
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
import {
	ArrowForwardIcon,
	ArrowUpDownIcon,
	ChevronDownIcon,
} from '@chakra-ui/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import theme, { EmptyDoughnutIcon } from '@frontend/chakra-theme'; // GitPullRequestIcon, // GitLabIcon, // GitCommitIcon, // GitMergeIcon,
import Card from '../atoms/card';
import StatCard from '../molecules/stat-card';
import GridCard from '../molecules/grid-card';
// import ActivityListItem from '../molecules/activity-list-item';
// import LinearListItem from '../molecules/linear-list-item';
import ConfidenceBreakdownItem from '../molecules/confidence-breakdown-item';
import ScriptTag from '../../components/molecules/script-tag';
import { UserContext, UserStories } from '../../utils/user';
import { createSlug } from '../../utils/createSlug';
import { capitalize } from '../../utils/capitalize';
import {
	getTestRuns,
	getDaysUntilRelease,
	getBugs,
	getConfidenceScore,
	getLatestTestStates,
	getRecordingsAndTestsByDay,
	sumOfObjectValues,
	getLastNDaysInFormat,
	DataPointTag,
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
			label: '# of test cases',
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

const timePeriodsInDays = {
	'24 hours': 1,
	'7 days': 7,
	'30 days': 30,
	'6 months': 183,
};

// TODO: fill me in with correct info once we can determine
// the release start date. For now, set arbitrarily to 30 days.
const getReleaseStartFromProject = (a) =>
	new Date().getTime() - 1000 * 60 * 60 * 24 * 30;

const calcPctChange = (key, confidenceScoreNDaysAgo, dataPoint) =>
	confidenceScoreNDaysAgo[key]
		? dataPoint.score - confidenceScoreNDaysAgo[key].score
		: dataPoint.score;

const deltaChange = (oldv, newv) =>
	oldv === 0 ? (newv === 0 ? 0 : 100) : ((oldv - newv) * 100) / oldv;

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

	const versions = selectedProject.release.items;

	const [version, setVersion] = useState(versions[0]);
	const [timePeriod, setTimePeriod] = useState('7 days');

	useEffect(() => setVersion(versions[0]), [versions]);

	const userStories: UserStories['items'] = selectedProject.userStories.items;

	const testRuns = getTestRuns(versions);
	const daysUntilRelease = getDaysUntilRelease(selectedProject);
	const bugs = getBugs(version.testRuns.items);
	const releaseStart = getReleaseStartFromProject(selectedProject);

	const confidenceDataPoints = getConfidenceScore(
		new Date().getTime(),
		releaseStart,
		userStories
	);

	const confidenceScore = Object.values(confidenceDataPoints)
		.map((dataPoint) => dataPoint.score)
		.reduce((a, b) => a + b, 0.0);

	const testCoverageScore =
		(Object.values(confidenceDataPoints)
			.filter((a) => a.tag === DataPointTag.TEST_COVERAGE)
			.map((a) => a.score)
			.reduce((a, b) => a + b, 0.0) *
			100) /
		30;

	const selectedTimePeriodInDays = timePeriodsInDays[timePeriod];

	const confidenceDataPointsNDaysAgo = getConfidenceScore(
		new Date().getTime() - 1000 * 60 * 60 * 24 * selectedTimePeriodInDays,
		releaseStart,
		userStories
	);

	const confidenceScoreNDaysAgo = Object.values(confidenceDataPointsNDaysAgo)
		.map((a) => a.score)
		.reduce((a, b) => a + b, 0.0);

	const testCoverageScoreNDaysAgo =
		(Object.values(confidenceDataPointsNDaysAgo)
			.filter((a) => a.tag === DataPointTag.TEST_RUN)
			.map((a) => a.score)
			.reduce((a, b) => a + b, 0.0) *
			100) /
		30;

	const confidenceChange = Object.entries(confidenceDataPoints).filter(
		([key, dataPoint]) =>
			0 !== calcPctChange(key, confidenceDataPointsNDaysAgo, dataPoint)
	);

	const latestTestStates = getLatestTestStates(version.testRuns.items);
	const doughnutDataValues = Object.values(latestTestStates);
	const doughnutDataLabels = Object.keys(latestTestStates).map(capitalize);
	doughnutData.datasets[0].data = doughnutDataValues;
	doughnutData.labels = doughnutDataLabels;

	const { recordingsByDay, testsByDay } = getRecordingsAndTestsByDay(
		selectedTimePeriodInDays,
		userStories
	);

	barData.datasets[0].data = Object.values(recordingsByDay);
	barData.datasets[1].data = Object.values(testsByDay);
	const barDataLabels = getLastNDaysInFormat(
		selectedTimePeriodInDays,
		'MMM DD'
	);
	barData.labels = barDataLabels;

	const totalRecordings = sumOfObjectValues(recordingsByDay);
	const totalTests = sumOfObjectValues(testsByDay);

	return (
		<Stack p={[4, 0, 0, 0]} w="100%" rounded="lg" spacing={6} {...props}>
			<Flex align="center" justify="space-between">
				<Flex align="center">
					<Heading
						as="h2"
						fontSize="md"
						display="inline"
						lineHeight="short"
						mr={2}
					>
						Last
					</Heading>
					<Menu>
						<MenuButton
							as={Button}
							fontSize="md"
							fontWeight="700"
							py={0}
							px={2}
							variant="ghost"
							colorScheme="gray"
							rightIcon={<ChevronDownIcon ml={-3} />}
							textAlign="left"
						>
							{timePeriod}
						</MenuButton>
						<MenuList>
							<MenuOptionGroup defaultValue={timePeriod} type="radio">
								{Object.keys(timePeriodsInDays).map((period) => (
									<MenuItemOption
										key={timePeriodsInDays[period]}
										value={period}
										onClick={() => setTimePeriod(period)}
									>
										{period}
									</MenuItemOption>
								))}
							</MenuOptionGroup>
						</MenuList>
					</Menu>
				</Flex>
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
							{version.name}
						</MenuButton>
						<MenuList>
							<MenuOptionGroup
								defaultValue={version.id}
								title="Versions"
								type="radio"
							>
								{versions.map((version, index) => (
									<MenuItemOption
										key={version.id}
										value={version.id}
										onClick={() => setVersion(version)}
									>
										{version.name}
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
							px={8}
						>
							<StatCard
								title="Confidence score"
								value={Number(confidenceScore.toFixed(2))}
								percentageChange={deltaChange(
									confidenceScoreNDaysAgo,
									confidenceScore
								)}
								dataPoints={Object.keys(confidenceDataPoints).length}
								my={[8, 0, 0, 0]}
							/>
							<StatCard
								title="Test coverage"
								value={Number(testCoverageScore.toFixed(2))}
								percentageChange={deltaChange(
									testCoverageScoreNDaysAgo,
									testCoverageScore
								)}
								dataPoints={
									Object.values(confidenceDataPoints).filter(
										(a) => a.tag === DataPointTag.TEST_COVERAGE
									).length
								}
								my={[8, 0, 0, 0]}
							/>
							<StatCard
								isPercentage={false}
								title="Tests ran"
								value={testRuns.value}
								percentageChange={testRuns.percentageChange}
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
										{confidenceChange.length === 0 ? (
											<Text>
												There hasn't been any change to your confidence score in
												the last {timePeriod}.
											</Text>
										) : null}
										{confidenceChange
											.slice(0, selectedTimePeriodInDays + 1)
											.map(([key, dataPoint]) => (
												<ConfidenceBreakdownItem
													key={key}
													value={calcPctChange(
														key,
														confidenceScoreNDaysAgo,
														dataPoint
													)}
													description={dataPoint.title}
												/>
											))}
									</List>
								</GridCard>
								<GridCard title="Recordings &amp; Test cases">
									<Bar data={barData} options={barOptions} />
									<Stack
										direction={['column', 'row']}
										justify="space-between"
										mt={4}
									>
										<Flex>
											<Text fontWeight="900" mr={2}>
												{totalRecordings}
											</Text>
											<Text color={useColorModeValue('gray.500', 'gray.400')}>
												Recordings
											</Text>
										</Flex>
										<Flex>
											<Text fontWeight="900" mr={2}>
												{totalTests}
											</Text>
											<Text color={useColorModeValue('gray.500', 'gray.400')}>
												Test cases
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
										{doughnutDataValues.some((value) => value !== 0) ? (
											<Doughnut data={doughnutData} options={doughnutOptions} />
										) : (
											<Flex w="100%" align="center">
												<EmptyDoughnutIcon
													h="128px"
													w="128px"
													color={useColorModeValue('gray.100', 'gray.800')}
													mr={6}
												/>
												<Text fontStyle="italic">
													No test data is available yet.
												</Text>
											</Flex>
										)}
									</Box>
								</GridCard>
								<GridCard title="Overview">
									<Stack direction="row" justify="space-around" mb={6}>
										<Box w="100px">
											<Flex align="baseline">
												<Text fontWeight="900" mr={2}>
													{daysUntilRelease || 'N/A'}
												</Text>
												<Text
													fontSize="sm"
													color={useColorModeValue('gray.500', 'gray.300')}
													fontWeight="500"
												>
													days
												</Text>
											</Flex>
											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight="700"
												fontSize="sm"
											>
												until release
											</Text>
										</Box>
										<Box w="100px">
											<Text fontWeight="900">
												{confidenceScore >= 90
													? `Ready`
													: confidenceScore >= 50
													? `Caution`
													: `Not ready`}
											</Text>
											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight="700"
												fontSize="sm"
											>
												merge status
											</Text>
										</Box>
									</Stack>
									<Stack direction="row" justify="space-around">
										<Box w="100px">
											<Flex align="baseline">
												<Text fontWeight="900" mr={2}>
													{bugs.introduced}
												</Text>
												<Text
													fontSize="sm"
													color={useColorModeValue('gray.500', 'gray.300')}
													fontWeight="500"
												>
													bug{bugs.introduced !== 1 && 's'}
												</Text>
											</Flex>
											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight="700"
												fontSize="sm"
											>
												introduced
											</Text>
										</Box>
										<Box w="100px">
											<Flex align="baseline">
												<Text fontWeight="900" mr={2}>
													0
												</Text>
												<Text
													fontSize="sm"
													color={useColorModeValue('gray.500', 'gray.300')}
													fontWeight="500"
												>
													bugs
												</Text>
											</Flex>
											<Text
												color={useColorModeValue('gray.700', 'gray.100')}
												fontWeight="700"
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
