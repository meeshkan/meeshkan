import React, { useContext, useMemo, useState, useEffect } from 'react';
import Card from '../../../components/atoms/card';
import { mutate } from 'swr';
import {
	Text,
	Flex,
	Badge,
	Box,
	useColorModeValue,
	Button,
	Select,
	Link as ChakraLink,
	Stack,
	Tooltip,
	Textarea,
	FormControl,
	FormLabel,
	AspectRatio,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	IconButton,
	useClipboard,
	Code,
	Input,
	InputGroup,
	InputLeftElement,
	Checkbox,
	MenuDivider,
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { UserContext } from '../../../utils/user';
import {
	SeleniumGroup,
	SeleniumGroupListResponse,
	UserStory,
} from '@frontend/meeshkan-types';
import { eightBaseClient } from '../../../utils/graphql';
import {
	USER_STORY,
	UPDATE_EXPECTED_TEST,
	DELETE_REJECTED_RECORDING,
	UPDATE_STORY_TITLE,
	UPDATE_STORY_DESCRIPTION,
	UPDATE_STORY_SIGNIFICANCE,
	UPDATE_REQUIRES_AUTHENTICATION,
} from '../../../graphql/user-story';
import useSWR from 'swr';
import {
	CrosshairIcon,
	VideoIcon,
	CheckmarkIcon,
	XmarkIcon,
	ShieldIcon,
	KeyIcon,
	DownloadIcon,
	TrashIcon,
	MoreIcon,
	CopyIcon,
	PencilIcon,
} from '@frontend/chakra-theme';
import { useRouter } from 'next/router';
import LoadingScreen from '../../../components/organisms/loading-screen';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import { StepList } from '../../../components/molecules/side-step-list';
import ValidatedBillingPlan from '../../../components/molecules/validated-billing-plan';
import NotFoundError from '../../404';
import { createSlug } from '../../../utils/createSlug';
import Link from 'next/link';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import VideoPlayer from '../../../components/atoms/video-player';
import { eightBaseToPptr } from '@frontend/downloadable-script';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
import { useToaster } from '../../../hooks/use-toaster';

type UserStoryProps = {
	cookies: string | undefined;
};

const UserStoryPage = (props: UserStoryProps) => {
	const { project, setProject, idToken } = useContext(UserContext);
	const toaster = useToaster();
	const mixpanel = useAnalytics();
	const {
		found: foundProject,
		loading: validatingProject,
	} = useValidateSelectedProject();
	const router = useRouter();
	const { hasCopied, onCopy: handleCopy } = useClipboard(window.location.href);
	const [loading, setLoading] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [creatingTestCase, setCreatingTestCase] = useState(false);

	const stepNumberColor = useColorModeValue('cyan.500', 'cyan.300');
	const backLinkColor = useColorModeValue('gray.900', 'gray.200');
	const buttonsBackgroundColor = useColorModeValue('white', 'gray.900');
	const formLabelColor = useColorModeValue('gray.500', 'gray.400');
	const aspectRatioBorderColor = useColorModeValue('gray.300', 'gray.700');

	useEffect(() => {
		if (hasCopied) {
			toaster({
				status: 'success',
				title: 'User story link copied!',
				description:
					'The URL of this user story has been copied to your clipboard.',
			});
		}
	}, [hasCopied, toaster]);

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

	const { userStoryId } = router.query;
	const date = new Date().toISOString().replace('Z', '') + '+00:00';

	const client = eightBaseClient(idToken);

	// Initial data fetch
	const fetcher = (query: string) =>
		client.request(query, {
			projectId: project?.id,
			userStoryId: userStoryId,
		});

	type UserStoryResponse = {
		userStory: UserStory;
	};

	const {
		data,
		error,
		isValidating: validatingQuery,
	} = useSWR<UserStoryResponse>(USER_STORY, fetcher);

	// Functions that call mutations for updating the user stories
	const updateTitle = (newTitle: string) => {
		const request = client.request(UPDATE_STORY_TITLE, {
			userStoryId: userStoryId,
			newTitle: newTitle,
		});
		return request;
	};

	const updateDescription = (newDescription: string) => {
		client.request(UPDATE_STORY_DESCRIPTION, {
			userStoryId: userStoryId,
			newDescription: newDescription,
		});
	};

	const updateSignificance = (newSignificance: string) => {
		const request = client.request(UPDATE_STORY_SIGNIFICANCE, {
			userStoryId: userStoryId,
			newSignificance: newSignificance,
		});
		return request;
	};

	const updateExpectedTest = async (testCreatedDate: string) => {
		return client.request(UPDATE_EXPECTED_TEST, {
			userStoryId: userStoryId,
			testCreatedDate: testCreatedDate,
		});
	};

	const updateRequiresAuthentication = async (isAuthenticated: boolean) => {
		const response = await client.request(UPDATE_REQUIRES_AUTHENTICATION, {
			userStoryId: userStoryId,
			isAuthenticated,
		});

		const updatedUserStories = [...response.userStoryUpdateByFilter.items];

		updatedUserStories.find(userStory => userStory.id === userStoryId).isAuthenticated = isAuthenticated;

		setProject({
			...project,
			userStories: { ...project.userStories, items: updatedUserStories }
		});
	};

	const onCreateTestCase = async () => {
		if (creatingTestCase) {
			return;
		}

		setCreatingTestCase(true);
		mixpanel.track('Create a test case');
		const toasterId = 'creatingTestCase';
		toaster({
			status: 'info',
			title: 'Creating test case...',
			id: toasterId,
		});

		await updateExpectedTest(date);
		await mutate('/api/session');
		toaster.close(toasterId);
		toaster({
			status: 'success',
			title: 'A test case was created!',
			description:
				'The user story has been marked as a test case. It can now be found in the test cases tab.',
		});

		router.push(`/${slugifiedProjectName}/user-stories`);
		setCreatingTestCase(false);
	};

	const deleteRejectedRecording = () => {
		return client.request(DELETE_REJECTED_RECORDING, {
			userStoryId: userStoryId,
		});
	};

	const onDelete = async () => {
		if (deleting) {
			return;
		}

		setDeleting(true);
		mixpanel.track('Delete a user story');
		const toasterId = 'deleting';
		toaster({
			status: 'info',
			title: 'Deleting this user story...',
			id: toasterId,
		});

		await deleteRejectedRecording();
		await mutate('/api/session');
		toaster.close(toasterId);
		toaster({
			status: 'success',
			title: 'A recording has been rejected.',
			description:
				'Rejecting a recording will delete the series of steps as a user story.',
		});

		router.push(`/${slugifiedProjectName}/user-stories`);
		setDeleting(false);
	};

	const generateVideo = (
		startEventID: string,
		endEventID: string,
		recordingID: string
	) => {
		setLoading(true);

		fetch(
			'https://sfcyq4tmok.execute-api.eu-west-1.amazonaws.com/staging/make-video',
			{
				method: 'POST',
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					startEventID,
					endEventID,
					recordingID,
				}),
			}
		).then(() => setTimeout(() => setLoading(false), 30000));
	};

	if (
		(validatingQuery && (!data || data?.userStory?.id !== userStoryId)) ||
		validatingProject
	) {
		return <LoadingScreen as={Card} />;
	}

	if (!foundProject || data?.userStory === null) {
		return <NotFoundError />;
	}

	if (error) {
		return <Text color="red.500">{error}</Text>;
	}

	const steps: SeleniumGroupListResponse['items'] = [];
	JSON.parse(
		data.userStory.recording.seleniumScriptJson
	)?.groups?.groupItems.forEach((item: SeleniumGroup) => {
		steps.push(item);
	});

	const handleDownload = () => {
		try {
			const pptrScript = eightBaseToPptr(
				JSON.parse(data?.userStory?.recording?.seleniumScriptJson),
				{
					headless: true,
				},
				project?.configuration?.authenticationTokens?.items,
				project?.configuration?.stagingURL
			);

			const blob = new Blob([pptrScript], {
				type: 'text/javascript;charset=utf-8',
			});
			saveAs(blob, `${createSlug(data?.userStory?.title)}.js`);
		} catch (err) {
			toaster({
				status: 'error',
				title: 'Your test case could not be generated.',
				description: 'Please try again in a few seconds.',
			});
		}
		mixpanel.track('Puppeteer script downloaded');
	};

	return (
		<ValidatedBillingPlan>
			<Stack p={[4, 0, 0, 0]} w="100%">
				<Link href={`/${slugifiedProjectName}/user-stories`} passHref>
					<ChakraLink
						d="flex"
						alignItems="center"
						fontSize="16px"
						fontWeight="400"
						color={backLinkColor}
						lineHeight="short"
						mb={3}
						maxW="fit-content"
					>
						<ChevronLeftIcon w={4} h={4} color="gray.500" mr={3} />
						User stories
					</ChakraLink>
				</Link>

				<Card mb={4}>
					<Flex
						direction={['column', 'column', 'row']}
						align="center"
						justify="space-between"
					>
						<Flex align="center" direction={['column', 'row']} mb={[4, 4, 0]}>
							<InputGroup size="sm" w="300px">
								<InputLeftElement
									pointerEvents="none"
									children={<PencilIcon />}
								/>
								<Input
									pl={6}
									borderRadius="md"
									defaultValue={data.userStory.title}
									// Callback invoked when user confirms value with `enter` key or by blurring input.
									onBlur={(e) => updateTitle(e.target.value)}
									lineHeight="tall"
									fontSize="base"
									fontWeight="700"
									mr={4}
									mb={[2, 0, 0]}
								/>
							</InputGroup>
							<Code
								display="flex"
								alignItems="center"
								maxW="fit-content"
								fontSize="md"
								mr={2}
								textTransform="capitalize"
								lineHeight="normal"
								borderRadius="md"
								fontWeight="700"
								px={2}
								py={1}
								colorScheme="gray"
							>
								{data.userStory.created[0] === 'user' ? (
									<VideoIcon mr={3} />
								) : data.userStory.created[0] === 'manual' ? (
									<CrosshairIcon mr={3} />
								) : null}
								{data.userStory.created}
							</Code>
							{data.userStory.isTestCase === true ? null : data.userStory
								.isExpected ? (
								<Code
									colorScheme="cyan"
									fontWeight="700"
									fontSize="md"
									lineHeight="normal"
									textTransform="capitalize"
									borderRadius="md"
									whiteSpace="nowrap"
									px={2}
									py={1}
									mr={2}
									my={[2, 0, 0, 0]}
								>
									Expected behavior
								</Code>
							) : (
								<Code
									colorScheme="red"
									fontWeight="700"
									fontSize="md"
									textTransform="capitalize"
									borderRadius="md"
									px={2}
									py={1}
									mr={2}
								>
									Buggy behavior
								</Code>
							)}
							{data.userStory.configuration !== null &&
								data.userStory.configuration.logInFlow.id === userStoryId ? (
								<Tooltip label="This is the 'Log in flow'" placement="right">
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
							{data.userStory.isAuthenticated ? (
								<Tooltip label="Requires authentication" placement="right">
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
						</Flex>
						<Flex>
							<Select
								variant="filled"
								defaultValue={data.userStory.significance}
								size="sm"
								fontFamily="mono"
								borderRadius="md"
								w="fit-content"
								textOverflow="ellipsis"
								overflow="hidden"
								whiteSpace="nowrap"
								onChange={(e) => updateSignificance(e.target.value)}
								mx={4}
							>
								<option value="low">Low significance</option>
								<option value="medium">Medium significance</option>
								<option value="high">High significance</option>
							</Select>
							<Menu closeOnSelect={false}>
								<Tooltip label="More" placement="bottom" hasArrow>
									<MenuButton
										as={IconButton}
										icon={<MoreIcon />}
										size="sm"
										colorScheme="gray"
									/>
								</Tooltip>
								<MenuList>
									<MenuItem onClick={() => handleDownload()}>
										<DownloadIcon mr={3} />
										Download Puppeteer script
									</MenuItem>
									<MenuItem onClick={() => handleCopy()}>
										<CopyIcon mr={3} />
										Copy link
									</MenuItem>
									<MenuItem>
										<Checkbox onChange={() => { updateRequiresAuthentication(!data?.userStory?.isAuthenticated) }} defaultChecked={data?.userStory?.isAuthenticated}>Requires authentication</Checkbox>
									</MenuItem>
									<MenuDivider />
									<MenuItem
										isDisabled={deleting}
										onClick={onDelete}
									>
										<TrashIcon mr={3} />
										Delete
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</Flex>
				</Card>

				<Box flex="1" overflowY="auto">
					<Flex
						flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
						justifyContent="space-between"
						w="100%"
					>
						<Box
							borderRadius="lg"
							my={[6, 6, 0, 0]}
							mr={4}
							wordBreak="break-all"
						>
							<StepList steps={steps} />
							<Flex
								justify="center"
								align="center"
								borderRadius="full"
								h={6}
								w={6}
								border="1px solid"
								borderColor={stepNumberColor}
								backgroundColor="transparentCyan.200"
								ml={[8, 4]}
							>
								<CheckmarkIcon color={stepNumberColor} />
							</Flex>
						</Box>
						<Box minW="md">
							{data.userStory?.recording?.video ? (
								<VideoPlayer
									src={data.userStory.recording.video.downloadUrl}
									onStart={() =>
										mixpanel.track('User story video play started')
									}
									onEnded={() =>
										mixpanel.track('User story video play finished')
									}
								/>
							) : (
								<AspectRatio
									ratio={16 / 9}
									display="flex"
									justifyContent="center"
									alignItems="center"
									border="1px solid"
									borderRadius="lg"
									borderColor={aspectRatioBorderColor}
								>
									<>
										<Button
											colorScheme="gray"
											isLoading={loading}
											loadingText="Generating video"
											onClick={() => {
												generateVideo(
													data.userStory.recording.startEventId,
													data.userStory.recording.endEventId,
													data.userStory.recording.id
												);
											}}
										>
											Generate Video
										</Button>
										{loading ? (
											<Text textAlign="center" mt={8}>
												A video should be generated in 15-30 seconds.
											</Text>
										) : null}
									</>
								</AspectRatio>
							)}

							<FormControl mt={8}>
								<FormLabel mb={2} color={formLabelColor}>
									What should you expect?
								</FormLabel>
								<Textarea
									defaultValue={data.userStory.description}
									name="description"
									type="text"
									placeholder="Use this field to communicate what this test should do."
									resize="vertical"
									size="sm"
									borderRadius="md"
									onBlur={(e) => {
										updateDescription(e.target.value);
									}}
								/>
							</FormControl>
							<Flex
								mt={8}
								justify="space-between"
								align="center"
								p={2}
								borderRadius="lg"
								backgroundColor={buttonsBackgroundColor}
							>
								{data.userStory.isTestCase === true ? (
									<>
										<Button
											colorScheme="blue"
											variant="subtle"
											leftIcon={<CopyIcon />}
											onClick={() => handleCopy()}
											mr={4}
										>
											Copy share link
										</Button>
										<Button
											colorScheme="gray"
											leftIcon={<DownloadIcon />}
											onClick={() => handleDownload()}
										>
											Download script
										</Button>
									</>
								) : (
									<>
										<Button
											id="create-test-case"
											colorScheme={data.userStory.isExpected ? 'cyan' : 'gray'}
											variant="subtle"
											leftIcon={<CheckmarkIcon />}
											onClick={onCreateTestCase}
											isLoading={creatingTestCase}
											mr={4}
										>
											Create test case
										</Button>
										<Button
											id="delete-recording"
											colorScheme={data.userStory.isExpected ? 'gray' : 'red'}
											variant="subtle"
											leftIcon={<XmarkIcon />}
											isLoading={deleting}
											onClick={onDelete}
										>
											Delete recording
										</Button>
									</>
								)}
							</Flex>
						</Box>
					</Flex>
				</Box>
			</Stack>
		</ValidatedBillingPlan>
	);
};

export default UserStoryPage;

export { getServerSideProps } from '../../../components/molecules/chakra';
