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
	status: 'queued' | 'running' | 'completed' | 'run error';
	runNumber: number;
	date: Date;
	stats: {
		passing: number;
		failing: number;
		notRan: number;
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
		<Card>
			<Flex align="center" justify="space-between" w="100%">
				<Flex align="center" flex="1" justify="space-between" maxW="2xs">
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
				<Flex align="center" flex="1" justify="space-between" maxW="2xs">
					<Center>
						<CheckmarkIcon width={2} height={2} color="green.500" />
						<Text fontSize="sm" ml={2}>
							{passing}
						</Text>
					</Center>
					<Center>
						<XmarkIcon width={2} height={2} color="red.500" />
						<Text fontSize="sm" ml={2}>
							{failing}
						</Text>
					</Center>
					<Center>
						<MinusIcon width={2} height={2} color="gray.500" />
						<Text fontSize="sm" ml={2}>
							{notRan}
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

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return (
		<Flex direction="column" w="100%">
			<GridCard title="Latest case status" flex="1" mb={6}>
				{doughnutDataValues.length > 0 ? (
					<Doughnut data={doughnutData} options={doughnutOptions} height={30} />
				) : (
					<Text fontStyle="italic">No tests have been run yet.</Text>
				)}
			</GridCard>
			<Stack p={[6, 0, 0, 0]} w="100%" spacing={6}>
				<TestRunCard
					status="queued"
					runNumber={4}
					date={new Date()}
					stats={{
						passing: 0,
						failing: 0,
						notRan: 0,
					}}
				/>
				<TestRunCard
					status="running"
					runNumber={3}
					date={new Date()}
					stats={{
						passing: 0,
						failing: 0,
						notRan: 0,
					}}
				/>
				<TestRunCard
					status="completed"
					runNumber={2}
					date={new Date()}
					stats={{
						passing: 60,
						failing: 9,
						notRan: 6,
					}}
				/>
				<TestRunCard
					status="run error"
					runNumber={1}
					date={new Date()}
					stats={{
						passing: 0,
						failing: 0,
						notRan: 0,
					}}
				/>
			</Stack>
		</Flex>
	);
};

export default TestRunsPage;
