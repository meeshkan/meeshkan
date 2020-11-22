import {
	Box,
	Stack,
	Flex,
	Avatar,
	Text,
	Badge,
	Stat,
	StatLabel,
	List,
	ListItem,
	ListIcon,
	StatNumber,
	StatHelpText,
	StatArrow,
	Select,
	SimpleGrid,
	Heading,
	Divider,
	useColorModeValue
} from '@chakra-ui/react';
import {
	GitMergeIcon,
	GitCommitIcon,
	GitLabIcon,
	GitPullRequestIcon,
	GitBranchIcon,
} from '@frontend/chakra-theme'
import Card from '../atoms/card'
import StatCard from '../molecules/stat-card'
import GridCard from '../molecules/grid-card'

const ActivityListItem = ({ title, subtitle, icon }) => {
	return (
		<ListItem
			as={Flex}
			align="center"
		>
			<ListIcon
				as={icon}
				ml={2}
				mr={4}
			/>
			<Flex direction="column">
				<Text
					color={useColorModeValue('gray.900', 'gray.200')}
				>
					{title}
				</Text>
				<Text
					fontSize="sm"
				>
					{subtitle}
				</Text>
			</Flex>
		</ListItem>
	)
}

const LinearListItem = ({ title, avatar }) => {
	return (
		<ListItem
			as={Flex}
			align="center"
			justify="space-between"
		>
			<Text
				color={useColorModeValue('gray.900', 'gray.200')}
			>
				{title}
			</Text>
			<Avatar
				size="xs"
				// name="Ryan Florence"
				src={avatar}
				ml={4}
			/>
		</ListItem>
	)
}

const Grid = (props) => {
	return (
		<Stack
			p={[6, 6, 0, 0]}
			w="100%"
			h="100%"
			rounded="lg"
			spacing={6}
			{...props}
		>
			<Flex
				align="center"
				justify="space-between"
			>
				<Heading
					as="h2"
					fontSize="md"
					lineHeight="short"
				>
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
				<Stack
					spacing={6}
					h="100%"
					w="100%"
					flex="1"
				>
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
							<GridCard title="Confidence Breakdown" height={['200px', '150px', 'auto', "auto"]} />
							<GridCard title="Recordings vs. Tests" height={['200px', '150px', 'auto', "auto"]} />
							<Card height={['200px', '150px', 'auto', "auto"]} />
							<Card height={['200px', '150px', 'auto', "auto"]} />
						</SimpleGrid>
					</Flex>
				</Stack>
				<Flex
					mt={[6, 6, 0, 0]}
					ml={[0, 0, 6, 6]}
					h="100%"
				>
					<SimpleGrid
						columns={1}
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
						<GridCard title="Linear Tickets">
							<List
								spacing={3}
								color={useColorModeValue('gray.600', 'gray.400')}
							>
								<LinearListItem
									title="User can't schedule pickup"
									avatar="https://bit.ly/ryan-florence"
								/>
								<LinearListItem
									title="`basic` user is authorized to s..."
									avatar="https://bit.ly/kent-c-dodds"
								/>
								<LinearListItem
									title="User can't schedule pickup"
									avatar="https://bit.ly/ryan-florence"
								/>
								<LinearListItem
									title="User can't reschedule delivery..."
									avatar="https://bit.ly/sage-adebayo"
								/>
								<LinearListItem
									title="`basic` user is authorized to s..."
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
