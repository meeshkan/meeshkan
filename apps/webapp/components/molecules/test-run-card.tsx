import {
	Flex,
	Center,
	Box,
	Text,
	Button,
	Badge,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	CheckmarkIcon,
	XmarkIcon,
	MinusIcon,
} from '@frontend/chakra-theme'
import { useRouter } from 'next/router';
import Card from '../atoms/card';
import { TestRun } from '../../utils/user';

type TestRunCardProps = {
	status: TestRun['status'];
	runNumber: number;
	date: Date;
	stats: {
		passing?: number;
		failing?: number;
		notRan?: number;
	};
};

const TestRunCard = ({ id, status, runNumber, date, stats }: TestRunCardProps) => {
	const router = useRouter();
	const isIndividualTestRunPage = router.pathname.endsWith('[testId]');

	const { passing, failing, notRan } = stats;
	const statusColor =
		status === 'queued'
			? 'gray'
			: status === 'running'
			? 'yellow'
			: status === 'completed'
			? 'cyan'
			: 'red';

	const cardProps = {
		cursor: isIndividualTestRunPage ? undefined : 'pointer',
		onClick: isIndividualTestRunPage ?
			undefined :
			() => router.push(`${router.asPath}/${id}`)
	};

	return (
		<Card {...cardProps}>
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
					maxW={isIndividualTestRunPage ? '3xs' : '2xs'}
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
					{!isIndividualTestRunPage && (
						<Button size="sm" variant="ghost" colorScheme="gray">
							Details <ChevronRightIcon ml={1} />
						</Button>
					)}
				</Flex>
			</Flex>
		</Card>
	);
};

export default TestRunCard;
