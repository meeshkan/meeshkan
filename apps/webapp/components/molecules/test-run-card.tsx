import React from 'react';
import { Flex, Center, Box, Text, Button, Badge, Code } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	CheckmarkIcon,
	XmarkIcon,
	MinusIcon,
	CircleArrowsIcon,
	BitbucketIcon,
	GitHubIcon,
	GitLabIcon,
} from '@frontend/chakra-theme';
import { useRouter } from 'next/router';
import Card from '../atoms/card';
import { TestRun } from '@frontend/meeshkan-types';

type TestRunCardProps = {
	id?: string;
	status: TestRun['status'];
	runNumber?: number;
	runLink?: string;
	date: Date;
	stats: {
		passing?: number;
		failing?: number;
		'did not run'?: number;
		queued?: number;
		'in progress'?: number;
	};
};

const TestRunCard = ({
	id,
	status,
	runNumber,
	date,
	stats,
	runLink,
}: TestRunCardProps) => {
	const router = useRouter();
	const isIndividualTestRunPage = router.pathname.endsWith('[testId]');
	const triggerURL = runLink && new URL(runLink).host;

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
		onClick: isIndividualTestRunPage
			? undefined
			: () => router.push(`${router.asPath}/${id}`),
	};

	const formattedDate = date.toLocaleDateString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
		day: 'numeric',
		month: 'short',
	});

	return (
		<Card {...cardProps}>
			<Flex align="center" justify="space-between">
				<Flex
					align={['flex-start', 'flex-start', 'center', 'center']}
					flex="1"
					justify="space-between"
					maxW={runLink ? "sm" : "2xs"}
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

					{!isIndividualTestRunPage && (
						<Text fontSize="sm" fontWeight="700" flex="1">
							Run #{runNumber}
						</Text>
					)}

					<Flex align='center'>
						<Text fontSize="sm" fontWeight="300" flex="1" whiteSpace="nowrap">
							{formattedDate}
						</Text>
						{runLink && (
							<Text
								as="a"
								href={runLink}
								target='_blank'
								rel="noopener"
								fontFamily='mono'
								fontSize="sm"
								fontWeight="700"
								_hover={{ textDecoration: 'underline' }}
								lineHeight="base"
								flex="1"
								whiteSpace="nowrap"
								ml={10}
							>
								{triggerURL === 'bitbucket.org' ? (
									<BitbucketIcon mr={2} />
								) : triggerURL === 'github.com' ? (
									<GitHubIcon mr={2} />
								) : triggerURL === 'gitlab.com' ? (
									<GitLabIcon mr={2} />
								) : null}
								triggered
							</Text>
						)}
					</Flex>
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
							{stats.passing || 0}
						</Text>
					</Center>
					<Center>
						<XmarkIcon width={2} height={2} color="red.500" />
						<Text fontSize="sm" ml={2}>
							{stats.failing || 0}
						</Text>
					</Center>
					<Center>
						<CircleArrowsIcon width={2} height={2} color="yellow.500" />
						<Text fontSize="sm" ml={2}>
							{(stats.queued || 0) + (stats['in progress'] || 0)}
						</Text>
					</Center>
					<Center>
						<MinusIcon width={2} height={2} color="gray.500" />
						<Text fontSize="sm" ml={2}>
							{stats['did not run'] || 0}
						</Text>
					</Center>
					{!isIndividualTestRunPage && (
						<Button size="sm" variant="ghost" colorScheme="gray">
							Details <ChevronRightIcon ml={1} />
						</Button>
					)}
				</Flex>
			</Flex>
		</Card >
	);
};

export default TestRunCard;
