import { useState } from 'react';
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
} from '@chakra-ui/react';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
require('../molecules/rounded-chart');
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
import { transparentize } from '@chakra-ui/theme-tools';

const barData = {
	labels: ['Nov 22', 'Nov 23', 'Nov 24', 'Nov 25', 'Nov 26', 'Nov 27'],
	datasets: [
		{
			label: '# of recordings',
			data: [1000, 4000, 3000, 5000, 2000, 3000, 5000, 2000],
			backgroundColor: theme.colors.cyan[500],
		},
		{
			label: '# of tests',
			data: [2000, 3584, 2485, 4300, 1000, 4000, 5000, 1294],
			backgroundColor: theme.colors.blue[500],
		},
	],
};

const barOptions = {
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
		},
	],
};

const versions = ['v0.0.2', 'v0.0.1'];

const Grid = (props) => {
	const [version, setVersion] = useState(versions[0]);
	const barChartOptions = {
		legend: {
			labels: {
				fontColor: useColorModeValue(
					theme.colors.gray[600],
					theme.colors.gray[400]
				),
			},
			position: 'bottom',
			align: 'center',
		},
	};
	const doughnutChartOptions = {
		legend: {
			labels: {
				fontColor: useColorModeValue(
					theme.colors.gray[600],
					theme.colors.gray[400]
				),
			},
			position: 'right',
			align: 'center',
		},
	};

	return (
		<Stack p={[6, 0, 0, 0]} w="100%" rounded="lg" spacing={6} {...props}>
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
						<Flex flex="1">
							<SimpleGrid
								columns={[1, 1, 2, 2]}
								spacingX={6}
								spacingY={6}
								w="100%"
							>
								<GridCard title="Confidence Breakdown">
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
								<GridCard title="Recordings vs. Tests">
									<Bar
										data={barData}
										options={{ ...barOptions, ...barChartOptions }}
									/>
								</GridCard>
								<GridCard title="Test Suite State">
									<Doughnut
										data={doughnutData}
										options={doughnutChartOptions}
									/>
								</GridCard>
								<Card h={['200px', '150px', 'auto', 'auto']} />
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
							<GridCard
								title="Linear Tickets"
								leftIconSrc="https://media.graphcms.com/AIPdNiTtReCzrrRorDL5"
							>
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
			</Box>
		</Stack>
	);
};

export default Grid;
