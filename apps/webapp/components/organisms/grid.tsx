import {
	Stack,
	Flex,
	Avatar,
	Text,
	List,
	ListItem,
	ListIcon,
	Select,
	SimpleGrid,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { Bar, Doughnut } from 'react-chartjs-2';
import truncate from 'truncate';
import theme, {
	GitMergeIcon,
	GitCommitIcon,
	GitLabIcon,
	GitPullRequestIcon,
} from '@frontend/chakra-theme';
import Card from '../atoms/card';
import StatCard from '../molecules/stat-card';
import GridCard from '../molecules/grid-card';

const ActivityListItem = ({ title, subtitle, icon }) => {
	return (
		<ListItem as={Flex} align="center">
			<ListIcon as={icon} ml={2} mr={4} />
			<Flex direction="column">
				<Text color={useColorModeValue('gray.900', 'gray.200')}>{title}</Text>
				<Text fontSize="sm">{subtitle}</Text>
			</Flex>
		</ListItem>
	);
};

const LinearListItem = ({ title, author, avatar }) => {
	return (
		<ListItem as={Flex} align="center" justify="space-between">
			<Text color={useColorModeValue('gray.900', 'gray.200')}>
				{truncate(title, 30)}
			</Text>
			<Avatar
				size="xs"
				name={author}
				src={avatar}
				ml={4}
			/>
		</ListItem>
	);
};

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

const colorFromValue = (value) => {
	let color;

	if (value > 0) {
		color = useColorModeValue('cyan.500', 'cyan.400');
	} else if (value < 0 && value > -1) {
		color = useColorModeValue('yellow.500', 'yellow.400');
	} else {
		color = useColorModeValue('red.500', 'red.400');
	}

	return color;
};

const ConfidenceBreakdownItem = ({ value, description }) => {
	value = (Math.round(value * 100) / 100).toFixed(2);
	return (
		<ListItem as={Flex} align="center" lineHeight="tall">
			<Text as="span" mr={3} color={colorFromValue(value)} w="45px">
				{value > 0 ? `+${value}` : value}
			</Text>
			{description}
		</ListItem>
	);
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
