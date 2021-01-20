import { useContext, useMemo } from 'react';
import {
	Box,
	Heading,
	Button,
	Flex,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
	CheckmarkIcon,
	XmarkIcon,
	MinusIcon,
	SortIcon,
	FilterIcon,
} from '@frontend/chakra-theme';
import { useRouter } from 'next/router';
import Link from 'next/link'
import _ from 'lodash';
import theme from '@frontend/chakra-theme';
import TestRunCard from '../../../components/molecules/test-run-card'
import Card from '../../../components/atoms/card';
import GridCard from '../../../components/molecules/grid-card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';
import { createSlug } from '../../../utils/createSlug';

const TestRun = () => {
	const { found, loading } = useValidateSelectedProject();
	const { project } = useContext(UserContext);
	const router = useRouter();

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	const { testId } = router.query;
	const testRun = _.find(
		project?.release.items[0]?.testRuns?.items,
		(item) => item.id === testId 
	);

	if (!found || !testRun) {
		return <NotFoundError />;
	}

	const testCasesRan = testRun.testOutcome.count;
	const outcomeOrder = ['failing', 'passing', 'queued', 'did not run'];
	const sortedTestOutcomes = testRun.testOutcome.items
		.sort((a, b) => outcomeOrder.indexOf(a.status) - outcomeOrder.indexOf(b.status));

	return (
		<Stack p={[4, 0, 0, 0]} w="100%" rounded="lg" spacing={6}>
			<Stack spacing={3}>
				<Link href={`/${slugifiedProjectName}/test-runs`} passHref>
					<a>
						<Heading
							d="flex"
							alignItems="center"
							fontSize="16px"
							fontWeight={400}
							color={useColorModeValue('gray.900', 'gray.200')}
							lineHeight="short"
						>
							<ChevronLeftIcon w={4} h={4} color="gray.500" mr={3} />
							Test runs
						</Heading>
					</a>
				</Link>
				<TestRunCard
					id={testId as string}
					status={testRun?.status}
					date={new Date(testRun?.createdAt)}
					stats={_.countBy(
						testRun?.testOutcome.items
							.map(outcome => outcome.status)
					)}
				/>
			</Stack>
			<Flex w="100%" h="100%" align="stretch">
				<Stack spacing={3} flex="1" mr={6}>
					<Flex align="center" justify="space-between">
						<Heading
							as="h2"
							fontSize="14px"
							fontWeight={600}
							color={useColorModeValue('gray.900', 'gray.200')}
							lineHeight="short"
						>
							{testCasesRan} test case{testCasesRan > 1 && 's'} ran
						</Heading>
						<Box>
							<Button
								size="sm"
								variant="ghost"
								colorScheme="gray"
								fontWeight={400}
								mr={2}
								leftIcon={<SortIcon />}
							>
								Sort
							</Button>
							<Button
								size="sm"
								variant="ghost"
								colorScheme="gray"
								fontWeight={400}
								leftIcon={<FilterIcon />}
							>
								Filter
							</Button>
						</Box>
					</Flex>
					<Stack spacing={4} overflowY="scroll">
						{sortedTestOutcomes
							.map(outcome => {
								const testCase = outcome?.userStory;
								const status = outcome?.status;
								const isFailing = status === 'failing';
								const icon = status === 'passing' ?
									<CheckmarkIcon w={3} h={3} color="green.500" /> :
									status === 'failing' ?
										<XmarkIcon w={3} h={3} color="red.500" /> :
										<MinusIcon w={3} h={3} color="gray.500" />;

								let cardOverrideProps: { bg?: string } = {};
								if (!isFailing) {
									cardOverrideProps.bg = 'transparent';
								}

								return (
									<Card
										as={Flex}
										align="center"
										justify="space-between"
										{...cardOverrideProps}
									>
										<Flex align="center">
											{icon}
											<Text fontSize="15px" ml={4}>{testCase?.title}</Text>
										</Flex>
										{isFailing && (
											<ChevronDownIcon w={5} h={5} color="gray.500" />
										)}
									</Card>
								)
							})
						}
					</Stack>
				</Stack>
				<GridCard title="Technical information">
					<Stack spacing={5}>
						<Box>
							<Heading as="h3" fontSize="15px" fontWeight={600} lineHeight="short">
								Test length
							</Heading>
							<Text fontSize="15px">
								{testRun?.testLength || '-'}
							</Text>
						</Box>
						<Box>
							<Heading as="h3" fontSize="15px" fontWeight={600} lineHeight="short">
								Web browser
							</Heading>
							<Text fontSize="15px">
								Chrome 86.0.4240.198
							</Text>
						</Box>
						<Box>
							<Heading as="h3" fontSize="15px" fontWeight={600} lineHeight="short">
								Operating system
							</Heading>
							<Text fontSize="15px">
								Macintosh 10.15.7
							</Text>
						</Box>
						<Box>
							<Heading as="h3" fontSize="15px" fontWeight={600} lineHeight="short">
								Language
							</Heading>
							<Text fontSize="15px">English</Text>
						</Box>
					</Stack>
				</GridCard>
			</Flex>
		</Stack>
	);
};

export default TestRun;
