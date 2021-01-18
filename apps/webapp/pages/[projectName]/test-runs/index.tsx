import { useState, useContext, useMemo } from 'react';
import {
	Flex,
	Center,
	Box,
	Stack,
	Text,
	Button,
	Badge,
	useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import _ from 'lodash';
import theme, {
	CheckmarkIcon,
	XmarkIcon,
	MinusIcon,
} from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';
import { createSlug } from '../../../utils/createSlug';

const doughnutDataValues = [80, 8, 12];
const doughnutData = {
	labels: ['Passing', "Didn't run", 'Failure'],
	datasets: [
		{
			data: doughnutDataValues,
			backgroundColor: [
				theme.colors.blue[500],
				theme.colors.blue[700],
				theme.colors.blue[900],
			],
			borderColor: theme.colors.transparent,
		},
	],
};

type TestRunCardProps = {
	// status: 'queued' | 'running' | 'completed' | 'run error';
	status: string;
	runNumber: number;
	date: Date;
	stats: {
		passing?: number;
		failing?: number;
		notRan?: number;
	};
};

const TestRunCard = ({ status, runNumber, date, stats }: TestRunCardProps) => {
	const { passing, failing, notRan } = stats;
	const statusColor =
		status === 'queued'
			? 'gray'
			: status === 'running'
			? 'yellow'
			: status === 'completed'
			? 'cyan'
			: 'red';

	return (
		<Card cursor="pointer">
			<Flex align="center" justify="space-between">
				<Flex
					align={['flex-start', 'flex-start', 'center', 'center']}
					flex="1"
					justify="space-between"
					maxW="2xs"
					direction={['column', 'column', 'row', 'row']}
				>
					<Box flex="1">
						<Badge
							colorScheme={statusColor}
							borderRadius="md"
							textTransform="lowercase"
							p={2}
							fontSize="sm"
						>
							{status}
						</Badge>
					</Box>
					<Text fontSize="sm" fontWeight={700} flex="1">
						Run #{runNumber}
					</Text>
					<Text fontSize="sm" fontWeight={300} flex="1" whiteSpace="nowrap">
						{date.toDateString()}
					</Text>
				</Flex>
				<Flex
					align="center"
					flex={['2', '2', '1', '1']}
					justify="space-between"
					maxW="2xs"
					ml={[3, 3, 0, 0]}
				>
					<Center>
						<CheckmarkIcon width={2} height={2} color="green.500" />
						<Text fontSize="sm" ml={2}>
							{passing || 0}
						</Text>
					</Center>
					<Center>
						<XmarkIcon width={2} height={2} color="red.500" />
						<Text fontSize="sm" ml={2}>
							{failing || 0}
						</Text>
					</Center>
					<Center>
						<MinusIcon width={2} height={2} color="gray.500" />
						<Text fontSize="sm" ml={2}>
							{notRan || 0}
						</Text>
					</Center>
					<Button size="sm" variant="ghost" colorScheme="gray">
						Details <ChevronRightIcon ml={1} />
					</Button>
				</Flex>
			</Flex>
		</Card>
	);
};

const TestRunsPage = () => {
	const { found, loading } = useValidateSelectedProject();
	const { project } = useContext(UserContext);

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
		tooltips: {
			callbacks: {
				label: (tooltipItem, data) => {
					const dataset = data.datasets[tooltipItem.datasetIndex];
					const currentValue = dataset.data[tooltipItem.index];
					return `${currentValue}%`;
				},
				title: (tooltipItem, data) => {
					return data.labels[tooltipItem[0].index];
				},
			},
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
					<Text fontStyle="italic">No tests have been run yet.</Text>
				)}
			</GridCard>
			<Stack spacing={6} overflowY="scroll">
				{project.release.items[0]?.testRuns?.items
					.map((testRun, index) => {
						const { status, createdAt } = testRun;
						return (
							<TestRunCard
								status={status}
								runNumber={index + 1}
								date={new Date(createdAt)}
								stats={_.countBy(
									testRun.userStories.items
										.map(story => story.testOutcome.items.map(outcome => outcome.status))
										.reduce((pre, cur) => pre.concat(cur))
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
