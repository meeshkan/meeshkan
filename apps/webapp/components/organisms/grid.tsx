import {
	Stack,
	Flex,
	List,
	Select,
	SimpleGrid,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { Bar, Doughnut } from 'react-chartjs-2';
import theme, {
	GitMergeIcon,
	GitCommitIcon,
	GitLabIcon,
	GitPullRequestIcon,
} from '@frontend/chakra-theme';
import Card from '../atoms/card';
import StatCard from '../molecules/stat-card';
import GridCard from '../molecules/grid-card';
import ActivityListItem from '../molecules/activity-list-item';
import LinearListItem from '../molecules/linear-list-item';
import ConfidenceBreakdownItem from '../molecules/confidence-breakdown-item';

const barData = {
	labels: ['1', '2', '3', '4', '5', '6'],
	datasets: [
		{
			label: '# of recordings',
			data: [1000, 4000, 3000, 5000, 2000, 3000, 5000, 2000],
			backgroundColor: theme.colors.cyan[300],
		},
		{
			label: '# of tests',
			data: [2000, 3584, 2485, 4300, 1000, 4000, 5000, 1294],
			backgroundColor: theme.colors.blue[300],
		},
	],
};

const barOptions = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					display: false,
				},
				gridLines: {
					display: false,
				},
			},
		],
		xAxes: [
			{
				ticks: {
					display: false,
				},
				gridLines: {
					display: false,
				},
				barPercentage: 0.5,
			},
		],
	},
};

const doughnutData = {
	labels: ['Passing', 'Warning', 'Failure', 'Error Running'],
	datasets: [
		{
			label: '# of Votes',
			data: [80, 12, 5, 3],
			backgroundColor: [
				'rgba(75, 192, 192, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
			],
			borderColor: [
				'rgba(75, 192, 192, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
			],
			borderWidth: 1,
		},
	],
};

const Grid = (props) => {
	const chartOptions = {
		legend: {
			labels: {
				fontColor: useColorModeValue(theme.colors.gray[600], theme.colors.gray[400]),
			},
		},
	};

	return (
		<Stack
			p={[6, 6, 0, 0]}
			w="100%"
			h="100%"
			rounded="lg"
			spacing={6}
			{...props}
		>
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
					<Select
						placeholder="v0.0.1"
						variant="outline"
						rounded="md"
						size="sm"
					/>
				</Flex>
			</Flex>
			<Flex
				direction={['column', 'column', 'row', 'row']}
				h="100%"
				w="100%"
				overflow="auto"
			>
				<Stack spacing={6} h="100%" w="100%" flex="1">
					<Flex
						as={Card}
						justify="space-between"
						align={['center', 'stretch', 'stretch', 'stretch']}
						direction={['column', 'row', 'row', 'row']}
					>
						<StatCard
							title="Confidence Score"
							value={98}
							percentageChange={19}
							dataPoints={4036}
						/>
						<StatCard
							title="Test Coverage"
							value={68}
							percentageChange={-2}
							dataPoints={2227}
							my={[8, 0, 0, 0]}
						/>
						<StatCard
							isPercentage={false}
							title="Test Run"
							value={71897}
							percentageChange={12}
							dataPoints={70946}
						/>
					</Flex>
					<Flex flex="1" w="full">
						<SimpleGrid
							columns={[1, 1, 2, 2]}
							spacingX={6}
							spacingY={6}
							w="100%"
							h="100%"
						>
							<GridCard title="Confidence Breakdown" h="auto">
								<List
									spacing={3}
									color={useColorModeValue('gray.600', 'gray.400')}
								>
									<ConfidenceBreakdownItem
										value={0.05}
										description="Users can successfully upgrade their subscription."
									/>
									<ConfidenceBreakdownItem
										value={0.05}
										description="Lorem ipsum dolor sit amet."
									/>
									<ConfidenceBreakdownItem
										value={-0.1}
										description="Lorem ipsum dolor sit amet."
									/>
									<ConfidenceBreakdownItem
										value={0.05}
										description="Lorem ipsum dolor sit amet."
									/>
									<ConfidenceBreakdownItem
										value={-2.0}
										description="Lorem ipsum dolor sit amet."
									/>
								</List>
							</GridCard>
							<GridCard title="Recordings vs. Tests" h="auto">
								<Bar
									data={barData}
									options={{ ...barOptions, ...chartOptions }}
								/>
							</GridCard>
							<GridCard title="Test Suite State" h="auto">
								<Doughnut data={doughnutData} options={chartOptions} />
							</GridCard>
							<Card h={['200px', '150px', 'auto', 'auto']} />
						</SimpleGrid>
					</Flex>
				</Stack>
				<Flex mt={[6, 6, 0, 0]} ml={[0, 0, 6, 6]} h="100%">
					<SimpleGrid columns={1} spacingY={6} w="100%">
						<GridCard title="Activity">
							<List
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
							</List>
						</GridCard>
						<GridCard title="Linear Tickets">
							<List
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
							</List>
						</GridCard>
					</SimpleGrid>
				</Flex>
			</Flex>
		</Stack>
	);
};

export default Grid;
