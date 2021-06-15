import React, { useContext, useState } from 'react';
import {
	Flex,
	Stack,
	Text,
	Box,
	List,
	ListItem,
	useColorModeValue,
	Alert,
	AlertIcon,
	AlertDescription,
	useColorMode,
	Button,
	useDisclosure,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	FormControl,
	Checkbox,
	Input,
	Heading,
	FormLabel,
	Divider,
	LightMode,
	Tooltip,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import _ from 'lodash';
import theme, {
	EmptyDoughnutIcon,
	FilterIcon,
	SortIcon,
} from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import TestRunCard from '../../../components/molecules/test-run-card';
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import ValidatedBillingPlan from '../../../components/molecules/validated-billing-plan';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';
import { capitalize } from '../../../utils/capitalize';
import { useToaster } from '../../../hooks/use-toaster';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { eightBaseClient } from '../../../utils/graphql';
import { UPDATE_STAGING_URL, TOGGLE_TEST_RUNS } from '../../../graphql/project';
import { mutate } from 'swr';

const doughnutDefaultDataValues = [80, 8, 12];
const doughnutBackgroundColors = [
	theme.colors.blue[500],
	theme.colors.blue[700],
	theme.colors.blue[300],
];

const doughnutData = {
	labels: ['Passing', "Didn't run", 'Failing'],
	datasets: [
		{
			data: doughnutDefaultDataValues,
			backgroundColor: doughnutBackgroundColors,
			borderColor: theme.colors.transparent,
		},
	],
};

const TestRunsPage = () => {
	const { found, loading } = useValidateSelectedProject();
	const user = useContext(UserContext);
	const { idToken, project, setProject } = user;
	const { colorMode } = useColorMode();
	const [testTriggering, setTestTriggering] = useState(false);
	const toaster = useToaster();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { register, handleSubmit } = useForm();

	const client = eightBaseClient(idToken);

	const testRuns = project?.release.items[0]?.testRuns?.items;
	const sortedTestRuns = testRuns?.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	const completedTestRuns =
		sortedTestRuns?.filter((testRun) => testRun.status === 'completed') || [];

	const latestTestRun =
		completedTestRuns.length > 0 ? completedTestRuns[0] : null;

	const latestTestRunStats =
		latestTestRun &&
		_.countBy(
			latestTestRun.testOutcome.items
				.map((outcome) => capitalize(outcome.status))
				.reduce((pre, cur) => pre.concat(cur), []) || []
		);

	const validTestRunStatus = ['Passing', 'Failing', 'Did not run'];
	Object.keys(latestTestRunStats || {}).forEach(
		(key) => validTestRunStatus.includes(key) || delete latestTestRunStats[key]
	);

	const doughnutDataValues = Object.values(latestTestRunStats || {});
	const totalTestRunOutcomes = doughnutDataValues.reduce((a, b) => a + b, 0);
	doughnutData.datasets[0].data = doughnutDataValues;
	const doughnutDataLabels = Object.keys(latestTestRunStats || {});
	doughnutData.labels = doughnutDataLabels;

	const doughnutOptions = {
		legend: {
			display: false,
		},
		responsive: false,
		maintainAspectRatio: false,
	};

	type StagingURLInputs = {
		stagingURL: string;
		saveToProject: boolean;
	};

	const activateTestRuns = async () => {
		const response = await client.request(TOGGLE_TEST_RUNS, {
			projectId: project?.id,
			toggle: true,
		});

		const updatedTestRunnerToggle =
			response.projectUpdate.configuration.activeTestRuns;
		setProject({
			...project,
			configuration: {
				...project.configuration,
				activeTestRuns: updatedTestRunnerToggle,
			},
		});
	};

	const triggerTestRun = async (stagingURL: string) => {
		try {
			if (project && !project.configuration.activeTestRuns) {
				await activateTestRuns();
			}

			const response = await fetch(
				process.env.NEXT_PUBLIC_TEST_TRIGGER_ENDPOINT ||
					'https://t9ky8625ne.execute-api.eu-west-1.amazonaws.com/staging/test-trigger',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						clientId: project?.id,
						url: stagingURL,
						clientSecret: project?.configuration?.clientSecret,
					}),
				}
			);

			await toaster({
				title: 'Test run triggered',
				description: 'The run should show up shortly.',
				status: 'success',
			});
		} catch (error) {
			console.error(error.message);
			toaster({
				title: 'Test run failed to trigger',
				description: 'Try again shortly.',
				status: 'error',
			});
		}
	};

	const handleTriggerTestRun = async () => {
		setTestTriggering(true);
		if (project?.configuration?.stagingURL) {
			await triggerTestRun(project?.configuration?.stagingURL);
			setTimeout(() => setTestTriggering(false), 2000);
		} else {
			onOpen();
		}
	};

	const handleStagingURLForm = async (
		formData: StagingURLInputs
	): Promise<void> => {
		setTestTriggering(true);
		if (formData.saveToProject) {
			await client.request(UPDATE_STAGING_URL, {
				projectID: project?.id,
				stagingURL: formData.stagingURL,
			});
			await mutate('/api/session');
		}
		triggerTestRun(formData.stagingURL);
		onClose();
		setTestTriggering(false);
	};

	const borderColor = useColorModeValue('gray.300', 'gray.600');
	const backgroundColor = useColorModeValue('gray.200', 'gray.700');
	const emptyDoughnutColor = useColorModeValue('gray.100', 'gray.800');
	const tooltipIconColor = useColorModeValue('gray.400', 'gray.500');
	const modalHeaderColor = useColorModeValue('gray.900', 'white');

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return (
		<ValidatedBillingPlan>
			<Flex direction="column" w="100%" p={[6, 0, 0, 0]}>
				<Alert status="warning" mb={4} p={3} flex="none">
					<AlertIcon />
					<AlertDescription>
						Test runs are experimental at this time.
					</AlertDescription>
				</Alert>
				<Box overflowY="auto">
					<GridCard
						title="Latest complete test case status"
						subtitle="This is the breakdown of tests from the newest test run. Click on individual test runs below for further details."
						mb={12}
						flex="0 0 auto"
					>
						{doughnutDataValues.length > 0 ? (
							<Flex
								justify="center"
								align="center"
								direction={['column', 'column', 'row', 'row']}
							>
								<Doughnut
									data={doughnutData}
									options={doughnutOptions}
									height={150}
									width={125}
								/>
								<Stack
									as={List}
									direction={['column', 'row']}
									spacing={[4, 8]}
									ml={[0, 0, 16]}
									mt={[8, 0]}
								>
									{doughnutDataLabels.map((label, index) => {
										return (
											<ListItem
												key={label}
												d="flex"
												flexDirection="column"
												alignItems="center"
											>
												<Text fontSize="40px" fontWeight="700">
													{Math.round(
														(latestTestRunStats[label] / totalTestRunOutcomes) *
															100
													)}
													%
												</Text>
												<Flex align="center">
													<Box
														borderRadius="md"
														bg={doughnutBackgroundColors[index]}
														w={4}
														h={4}
													/>
													<Text ml={3}>{label}</Text>
												</Flex>
											</ListItem>
										);
									})}
								</Stack>
							</Flex>
						) : (
							<Flex w="100%" align="center">
								<EmptyDoughnutIcon
									h="128px"
									w="128px"
									color={emptyDoughnutColor}
									mr={6}
								/>
								<Text fontStyle="italic">
									There are no test cases with 'passing', 'failing', or 'did not
									run' status in the latest test run.
								</Text>
							</Flex>
						)}
					</GridCard>
					<Flex justify="flex-end" mb={3}>
						<Button
							isDisabled
							size="sm"
							variant="ghost"
							sx={{
								mixBlendMode: colorMode === 'light' ? 'multiply' : 'normal',
							}}
							colorScheme="gray"
							fontWeight="400"
							mr={2}
							leftIcon={<SortIcon />}
						>
							Sort
						</Button>
						<Button
							isDisabled
							size="sm"
							variant="ghost"
							colorScheme="gray"
							sx={{
								mixBlendMode: colorMode === 'light' ? 'multiply' : 'normal',
							}}
							fontWeight="400"
							mr={4}
							leftIcon={<FilterIcon />}
						>
							Filter
						</Button>
						<LightMode>
							<Button
								id="trigger-test-run"
								isLoading={testTriggering}
								loadingText="Starting test run"
								size="sm"
								onClick={handleTriggerTestRun}
							>
								Trigger test run
							</Button>
						</LightMode>
					</Flex>

					<Modal
						isOpen={isOpen}
						onClose={onClose}
						isCentered
						motionPreset="scale"
						size="xl"
						scrollBehavior="inside"
					>
						<ModalOverlay />
						<ModalContent
							borderRadius="lg"
							as="form"
							onSubmit={handleSubmit(handleStagingURLForm)}
						>
							<ModalHeader px={6} pt={4}>
								<Heading
									fontSize="xl"
									mb={2}
									as="h3"
									lineHeight="tall"
									color={modalHeaderColor}
								>
									Provide a staging URL
								</Heading>
								<Text fontWeight="400" fontSize="md">
									To trigger a test run, let us know the staging environment we
									should run against.
								</Text>
							</ModalHeader>
							<Divider />
							<ModalCloseButton mt={2} />
							<ModalBody px={6} pb={4} pt={8}>
								<FormControl isRequired>
									<FormLabel>
										Staging URL
										<Tooltip
											label="This is the URL that Meeshkan will run tests against."
											placement="right-start"
										>
											<InfoOutlineIcon
												ml={2}
												lineHeight="short"
												color={tooltipIconColor}
											/>
										</Tooltip>
									</FormLabel>
									<Input
										name="stagingURL"
										type="url"
										placeholder="https://staging.acme-industries.com"
										pattern="^http(s)?:\/\/.+$"
										ref={register({
											required: true,
										})}
									/>
								</FormControl>
								<FormControl>
									<Checkbox
										name="saveToProject"
										defaultChecked
										mt={6}
										ref={register}
									>
										Save this as my project's staging URL
									</Checkbox>
								</FormControl>
							</ModalBody>

							<ModalFooter px={6} pb={6} mt={8}>
								<Button
									colorScheme="gray"
									mr={6}
									isLoading={testTriggering}
									onClick={onClose}
								>
									cancel
								</Button>
								<LightMode>
									<Button
										colorScheme="blue"
										type="submit"
										isLoading={testTriggering}
									>
										Trigger test run
									</Button>
								</LightMode>
							</ModalFooter>
						</ModalContent>
					</Modal>

					{sortedTestRuns.length > 0 ? (
						<Stack spacing={6}>
							{sortedTestRuns.map((testRun, index) => {
								const { id, status, createdAt } = testRun;
								return (
									<TestRunCard
										id={id}
										key={id}
										status={status}
										runNumber={testRuns.length - index}
										date={new Date(createdAt)}
										stats={_.countBy(
											testRun.testOutcome.items.map((outcome) => outcome.status)
										)}
									/>
								);
							})}
						</Stack>
					) : (
						<Stack spacing={6}>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								opacity="0.9"
								border="1px dashed"
								borderColor={borderColor}
								borderRadius="lg"
								h="64px"
								backgroundColor={backgroundColor}
							>
								<Text fontStyle="italic" fontSize="md">
									Test runs will show up here.
								</Text>
							</Box>
							<Box
								opacity="0.6"
								border="1px dashed"
								borderColor={borderColor}
								borderRadius="lg"
								h="64px"
								backgroundColor={backgroundColor}
							/>
							<Box
								opacity="0.3"
								border="1px dashed"
								borderColor={borderColor}
								borderRadius="lg"
								h="64px"
								backgroundColor={backgroundColor}
							/>
						</Stack>
					)}
				</Box>
			</Flex>
		</ValidatedBillingPlan>
	);
};

export default TestRunsPage;
