import React, { useContext, useMemo } from 'react';
import {
	Box,
	Heading,
	Button,
	Flex,
	Stack,
	Text,
	Link as ChakraLink,
	useColorModeValue,
	Tooltip,
	Alert,
	AlertDescription,
	AlertIcon,
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionButton,
	AccordionIcon,
	Code,
	Badge,
} from '@chakra-ui/react';
import { ChevronLeftIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
	CheckmarkIcon,
	XmarkIcon,
	MinusIcon,
	SortIcon,
	FilterIcon,
	CircleArrowsIcon,
	VideoIcon,
	CrosshairIcon,
	ShieldIcon,
	KeyIcon,
} from '@frontend/chakra-theme';
import { useRouter } from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import TestRunCard from '../../../components/molecules/test-run-card';
import Card from '../../../components/atoms/card';
import GridCard from '../../../components/molecules/grid-card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';
import { createSlug } from '../../../utils/createSlug';
import VideoPlayer from '../../../components/atoms/video-player';
import ValidatedBillingPlan from '../../../components/molecules/validated-billing-plan';
import {
	ScriptCommandListResponse,
	TestOutcomeListResponse,
} from '@frontend/meeshkan-types';
import { commandsToSteps } from 'apps/webapp/utils/transform-steps';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

const TestRun = () => {
	const { found, loading } = useValidateSelectedProject();
	const { project } = useContext(UserContext);
	const router = useRouter();
	const mixpanel = useAnalytics();

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

	const headingColor = useColorModeValue('gray.900', 'gray.200');
	const tooltipIconColor = useColorModeValue('gray.400', 'gray.500');
	const alertLinkColor = useColorModeValue('red.700', 'red.300');

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

	const testCasesRan: number = testRun.testOutcome.count;
	const outcomeOrder = [
		'failing',
		'passing',
		'queued',
		'in progress',
		'did not run',
	];
	const sortedTestOutcomes: TestOutcomeListResponse['items'] = testRun.testOutcome.items.sort(
		(a, b) => outcomeOrder.indexOf(a.status) - outcomeOrder.indexOf(b.status)
	);

	const testsNeedAuthentication: boolean = project?.userStories?.items.some(
		(story) => story.requiresAuthentication
	);
	const stepsInLogInStory: number =
		project?.configuration?.logInStory?.scriptCommands?.count;
	const hasLogInStory: boolean = !!project?.configuration?.logInStory;

	const hasAuthTokens: boolean =
		(project?.configuration?.authenticationTokens?.items?.length || 0) >= 1;

	return (
		<ValidatedBillingPlan>
			<Stack p={[4, 0, 0, 0]} w="100%" rounded="lg" spacing={6}>
				<Stack spacing={3}>
					<Link href={`/${slugifiedProjectName}/test-runs`} passHref>
						<a>
							<Heading
								d="flex"
								alignItems="center"
								fontSize="16px"
								fontWeight="400"
								color={headingColor}
								lineHeight="short"
								maxW="fit-content"
							>
								<ChevronLeftIcon w={4} h={4} color="gray.500" mr={3} />
								Test runs
							</Heading>
						</a>
					</Link>
					<TestRunCard
						id={testId as string}
						status={testRun?.status}
						runLink={testRun?.runLink}
						date={new Date(testRun?.createdAt)}
						stats={_.countBy(
							testRun?.testOutcome.items.map((outcome) => outcome.status)
						)}
					/>
				</Stack>
				<Box overflowY="scroll">
					<Flex w="100%" h="100%">
						<Stack spacing={3} flex="1" mr={6}>
							<Flex align="center" justify="space-between">
								<Heading
									as="h2"
									fontSize="14px"
									fontWeight="600"
									color={headingColor}
									lineHeight="short"
								>
									{testCasesRan} test case{testCasesRan !== 1 && 's'} ran{' '}
									<Tooltip
										label="A test case represents each of your individual user stories that are marked as expected. Click into a failing test for more details."
										placement="right-start"
									>
										<InfoOutlineIcon ml={2} color={tooltipIconColor} />
									</Tooltip>
								</Heading>
								<Box>
									<Button
										size="sm"
										variant="ghost"
										colorScheme="gray"
										fontWeight="400"
										mr={2}
										leftIcon={<SortIcon />}
										isDisabled
									>
										Sort
									</Button>
									<Button
										size="sm"
										variant="ghost"
										colorScheme="gray"
										fontWeight="400"
										leftIcon={<FilterIcon />}
										isDisabled
									>
										Filter
									</Button>
								</Box>
							</Flex>
							<Stack spacing={4}>
								{testsNeedAuthentication && !hasLogInStory && !hasAuthTokens ? (
									<Alert status="error" p={3} mt={3} flex="1">
										<AlertIcon />
										<AlertDescription>
											At least one of your tests requires authentication.{' '}
											<Link
												href={`/${slugifiedProjectName}/settings#authentication`}
												passHref
											>
												<ChakraLink
													color={alertLinkColor}
													textDecor="underline"
												>
													Authentication settings
												</ChakraLink>
											</Link>
										</AlertDescription>
									</Alert>
								) : null}
								<Accordion defaultIndex={[0]} allowMultiple>
									{sortedTestOutcomes.map((outcome) => {
										const testCase = outcome?.userStory;
										const status = outcome?.status;

										const requiresAuthentication: boolean =
											testCase?.requiresAuthentication;

										const outcomeCommands: ScriptCommandListResponse['items'] =
											testCase?.scriptCommands?.items;

										const contextualErrorStepIndex: number =
											requiresAuthentication && hasLogInStory
												? outcome?.errorStepIndex - stepsInLogInStory
												: outcome?.errorStepIndex;
										const errorInLogIn: boolean =
											contextualErrorStepIndex > 0 &&
												!isNaN(contextualErrorStepIndex)
												? false
												: true;

										const outcomeDetails = commandsToSteps(outcomeCommands)[
											contextualErrorStepIndex
										];

										const outcomeError = (
											outcomeCommand: string,
											outcomeTag?: string
										) => {
											let errorMessage;
											if (outcomeCommand == 'auth') {
												errorMessage = `This test failed while the fake user was logging in.`;
											} else if (outcomeCommand == 'open') {
												errorMessage = `The page your test trys to open, doesn't exist.`;
											} else if (outcomeCommand == 'setViewportSize') {
												errorMessage = `This test case has an unsupported screen size.`;
											} else {
												errorMessage = `${outcomeTag} doesn't exist. Did your app's structure change since this test case was created?`;
											}
											return errorMessage;
										};

										const isFailing = status === 'failing';
										const icon =
											status === 'passing' ? (
												<CheckmarkIcon
													w={3}
													h={3}
													color="green.500"
													aria-label="Passing"
												/>
											) : status === 'failing' ? (
												<XmarkIcon
													w={3}
													h={3}
													color="red.500"
													title="Failing"
												/>
											) : status === 'did not run' ? (
												<MinusIcon
													w={3}
													h={3}
													color="gray.500"
													title="Didn't run"
												/>
											) : status === 'queued' || 'in progress' ? (
												<CircleArrowsIcon
													w={3}
													h={3}
													color="amber.500"
													title="Queued / In progress"
												/>
											) : null;

										const cardOverrideProps: { bg?: string; py?: number } = {};
										if (!isFailing) {
											cardOverrideProps.bg = 'transparent';
											cardOverrideProps.py = 2;
										}
										const accordionItemBackground = useColorModeValue(
											'white',
											'gray.900'
										);
										const iconColor = useColorModeValue('gray.300', 'gray.600');

										return (
											<>
												<AccordionItem
													key={outcome?.id}
													mb={4}
													border="none"
													borderRadius="lg"
													isDisabled={!isFailing}
													bg={accordionItemBackground}
													{...cardOverrideProps}
												>
													<AccordionButton
														_hover={{
															backgroundColor: 'none',
														}}
														_focus={{
															outline: 'none',
														}}
														display="flex"
														align="center"
														justify="space-between"
														borderRadius="lg"
														p={4}
														justifyContent="space-between"
													>
														<Flex align="center">
															<Tooltip
																label={status}
																placement="bottom-start"
																textTransform="capitalize"
															>
																{icon}
															</Tooltip>
															<Link
																href={`/${slugifiedProjectName}/test-cases/${testCase.id}`}
																passHref
															>
																<ChakraLink fontSize="15px" ml={4}>
																	{testCase?.title}
																</ChakraLink>
															</Link>
															{isFailing && (
																<Code
																	display="flex"
																	alignItems="center"
																	maxW="fit-content"
																	fontSize="md"
																	ml={4}
																	mr={2}
																	textTransform="capitalize"
																	lineHeight="normal"
																	borderRadius="md"
																	fontWeight="700"
																	px={2}
																	py={1}
																	colorScheme="gray"
																>
																	{testCase?.created[0] === 'user' ? (
																		<VideoIcon mr={3} />
																	) : testCase?.created[0] === 'manual' ? (
																		<CrosshairIcon mr={3} />
																	) : null}
																	{testCase?.created}
																</Code>
															)}

															{isFailing && requiresAuthentication ? (
																<Tooltip
																	label="Requires authentication"
																	placement="right"
																>
																	<Badge
																		colorScheme="amber"
																		fontWeight="700"
																		fontSize="md"
																		borderRadius="md"
																		p={2}
																	>
																		<ShieldIcon />
																	</Badge>
																</Tooltip>
															) : null}
															{isFailing &&
																project?.configuration?.logInStory?.id ===
																testCase?.id ? (
																<Tooltip
																	label="This is the path your users take to sign in."
																	placement="right"
																>
																	<Badge
																		colorScheme="amber"
																		fontWeight="700"
																		fontSize="md"
																		borderRadius="md"
																		p={2}
																	>
																		<KeyIcon />
																	</Badge>
																</Tooltip>
															) : null}
														</Flex>
														<AccordionIcon color={iconColor} />
													</AccordionButton>

													<AccordionPanel py={4}>
														{isFailing && (
															<>
																{outcome?.video && (
																	<VideoPlayer
																		src={outcome?.video.downloadUrl}
																		onStart={() =>
																			mixpanel.track(
																				'Test outcome video play started'
																			)
																		}
																		onEnded={() =>
																			mixpanel.track(
																				'Test outcome video play finished'
																			)
																		}
																	/>
																)}
																<Flex mt={4}>
																	<Flex
																		justify="center"
																		align="center"
																		borderRadius="full"
																		h={6}
																		w={6}
																		border="1px solid"
																		borderColor="gray.500"
																		fontWeight="500"
																		fontSize="sm"
																		mr={4}
																	>
																		{requiresAuthentication && hasLogInStory
																			? outcome?.errorStepIndex +
																			1 -
																			stepsInLogInStory
																			: outcome?.errorStepIndex + 1}
																	</Flex>
																	<Box w="full">
																		<Text>{outcomeDetails?.text}</Text>
																		<Alert
																			status="error"
																			p={3}
																			mt={errorInLogIn ? 0 : 3}
																			flex="1"
																		>
																			<AlertIcon />
																			<AlertDescription>
																				{outcomeError(
																					errorInLogIn
																						? 'auth'
																						: outcomeDetails?.command,
																					outcomeDetails?.tagName
																				)}
																			</AlertDescription>
																		</Alert>
																	</Box>
																</Flex>
															</>
														)}
													</AccordionPanel>
												</AccordionItem>
											</>
										);
									})}
								</Accordion>
							</Stack>
						</Stack>
						<GridCard title="Technical information">
							<Stack spacing={5}>
								<Box>
									<Heading
										as="h3"
										fontSize="15px"
										fontWeight="600"
										lineHeight="short"
									>
										Test length
									</Heading>
									<Text fontSize="15px">
										{testRun?.testLength.substring(3, 5) +
											` mins, ` +
											testRun?.testLength.substring(6, 8) +
											` sec ` || '-'}
									</Text>
								</Box>
								<Box>
									<Heading
										as="h3"
										fontSize="15px"
										fontWeight="600"
										lineHeight="short"
									>
										Web browser
									</Heading>
									<Text fontSize="15px">Chromium 86.0.4240.0</Text>
								</Box>
								<Box>
									<Heading
										as="h3"
										fontSize="15px"
										fontWeight="600"
										lineHeight="short"
									>
										Operating system
									</Heading>
									<Text fontSize="15px">AWS Linux 2018.03</Text>
								</Box>
								<Box>
									<Heading
										as="h3"
										fontSize="15px"
										fontWeight="600"
										lineHeight="short"
									>
										Language
									</Heading>
									<Text fontSize="15px">English</Text>
								</Box>
							</Stack>
						</GridCard>
					</Flex>
				</Box>
			</Stack>
		</ValidatedBillingPlan>
	);
};

export default TestRun;
