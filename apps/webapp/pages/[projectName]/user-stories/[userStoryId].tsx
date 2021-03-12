import React, { useContext, useMemo, useState, useEffect } from 'react';
import Card from '../../../components/atoms/card';
import { mutate } from 'swr';
import {
	Text,
	Flex,
	Badge,
	Editable,
	EditablePreview,
	EditableInput,
	Box,
	useColorModeValue,
	Button,
	Select,
	useToast,
	Link as ChakraLink,
	Stack,
	Grid,
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
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { UserContext } from '../../../utils/user';
import { SeleniumGroupListResponse, UserStory } from '@frontend/meeshkan-types';
import { eightBaseClient } from '../../../utils/graphql';
import {
	USER_STORY,
	UPDATE_EXPECTED_TEST,
	DELETE_REJECTED_RECORDING,
	UPDATE_STORY_TITLE,
	UPDATE_STORY_DESCRIPTION,
	UPDATE_STORY_SIGNIFICANCE,
	WATCH_RECORDING_CHANGES,
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
} from '@frontend/chakra-theme';
import { useRouter } from 'next/router';
import LoadingScreen from '../../../components/organisms/loading-screen';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import { StepList } from '../../../components/molecules/side-step-list';
import NotFoundError from '../../404';
import { createSlug } from '../../../utils/createSlug';
import Link from 'next/link';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import VideoPlayer from '../../../components/atoms/video-player';
import { eightBaseToPptr } from '@frontend/downloadable-script';

type UserStoryProps = {
	cookies: string | undefined;
};

const UserStoryPage = (props: UserStoryProps) => {
	const { project, idToken } = useContext(UserContext);
	const {
		found: foundProject,
		loading: validatingProject,
	} = useValidateSelectedProject();
	const router = useRouter();
	const toast = useToast();
	const { hasCopied, onCopy: handleCopy } = useClipboard(window.location.href);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (hasCopied) {
			toast({
				position: 'bottom-right',
				title: 'User story link copied!',
				description:
					'The URL of this user story has been copied to your clipboard.',
				isClosable: true,
				status: 'success',
				variant: 'clean',
			});
		}
	}, [hasCopied]);

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

	const { userStoryId } = router.query;
	const date = new Date().toISOString().replace('Z', '') + '+00:00';

	const client = eightBaseClient(idToken);

	// Initial data fetch
	const fetcher = (query) =>
		client.request(query, {
			projectId: project?.id,
			userStoryId: userStoryId,
		});

	type UserStoryResponse = {
		userStory: UserStory;
	};

	const { data, error, isValidating: validatingQuery } = useSWR<
		UserStoryResponse
	>(USER_STORY, fetcher);

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
		const request = await client.request(UPDATE_EXPECTED_TEST, {
			userStoryId: userStoryId,
			testCreatedDate: testCreatedDate,
		});
		await mutate('/api/session');
		return request;
	};

	const deleteRejectedRecording = async () => {
		const request = client.request(DELETE_REJECTED_RECORDING, {
			userStoryId: userStoryId,
		});
		await mutate('/api/session');
		return request;
	};

	const generateVideo = (
		startEventID: string,
		endEventID: string,
		recordingID: string
	) => {
		setLoading(true);

		fetch(
			'https://ouiozc4d8a.execute-api.eu-west-1.amazonaws.com/main/make-video',
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

	if (validatingQuery || validatingProject || !data) {
		return <LoadingScreen as={Card} />;
	}

	if (!foundProject || data?.userStory === null) {
		return <NotFoundError />;
	}

	if (error) {
		return <Text color="red.500">{error}</Text>;
	}

	let steps: SeleniumGroupListResponse['items'] = [];
	// @ts-ignore **a graphql alias prevents this from appearing correct
	JSON.parse(
		data.userStory.recording.seleniumScriptJson
	)?.groups?.groupItems.forEach((item) => {
		steps.push(item);
	});

	const handleDownload = () => {
		try {
			const pptrScript = eightBaseToPptr(
				JSON.parse(data?.userStory?.recording?.seleniumScriptJson),
				{
					headless: false,
				}
			);

			const blob = new Blob([pptrScript], {
				type: 'text/javascript;charset=utf-8',
			});
			saveAs(blob, `${createSlug(data?.userStory?.title)}.js`);
		} catch (err) {
			toast({
				position: 'bottom-right',
				title: 'Your test case could not be generated.',
				description: 'Please try again in a few seconds.',
				isClosable: true,
				status: 'error',
				variant: 'clean',
			});
		}
	};

	return (
		<Stack w="100%" mb={8}>
			<Link href={`/${slugifiedProjectName}/user-stories`} passHref>
				<ChakraLink
					d="flex"
					alignItems="center"
					fontSize="16px"
					fontWeight="400"
					color={useColorModeValue('gray.900', 'gray.200')}
					lineHeight="short"
					mb={3}
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
						<Editable
							defaultValue={data.userStory.title}
							// Callback invoked when user confirms value with `enter` key or by blurring input.
							onSubmit={(e) => updateTitle(e)}
							fontSize="xl"
							fontWeight="900"
							mr={4}
						>
							<EditablePreview />
							<EditableInput />
						</Editable>
						<Badge
							fontWeight="700"
							fontSize="md"
							lineHeight="normal"
							mr={2}
							textTransform="capitalize"
							borderRadius="md"
							py={1}
							px={2}
						>
							{data.userStory.created[0] === 'user' ? (
								<VideoIcon mr={3} />
							) : data.userStory.created[0] === 'manual' ? (
								<CrosshairIcon mr={3} />
							) : null}
							{data.userStory.created[0]}
						</Badge>
						{data.userStory.isTestCase === true ? null : data.userStory
								.isExpected ? (
							<Badge
								colorScheme="cyan"
								fontWeight="700"
								fontSize="md"
								textTransform="capitalize"
								borderRadius="md"
								p={2}
								mr={2}
							>
								Expected behavior
							</Badge>
						) : (
							<Badge
								colorScheme="red"
								fontWeight="700"
								fontSize="md"
								textTransform="capitalize"
								borderRadius="md"
								p={2}
								mr={2}
							>
								Buggy behavior
							</Badge>
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
							<Tooltip label="Authenticated" placement="right">
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
							mr={4}
							defaultValue={data.userStory.significance}
							size="sm"
							borderRadius="md"
							w="fit-content"
							onChange={(e) => updateSignificance(e.target.value)}
						>
							<option value="low">Low significance</option>
							<option value="medium">Medium significance</option>
							<option value="high">High significance</option>
						</Select>
						<Menu>
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
								<MenuItem
									colorScheme="red"
									onClick={() => {
										deleteRejectedRecording();
										toast({
											position: 'bottom-right',
											title: 'The user story has been deleted.',
											description:
												'Rejecting a recording will delete the series of steps as a user story.',
											isClosable: true,
											status: 'success',
											variant: 'clean',
										});
										router.push(`/${slugifiedProjectName}/user-stories`);
									}}
								>
									<TrashIcon mr={3} />
									Delete
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>
			</Card>

			<Box flex="1">
				<Grid
					w="100%"
					templateColumns={[
						'repeat(auto-fill, 1fr)',
						'reapeat(auto-fill, 1fr)',
						'repeat(3, 1fr)',
					]}
					gridAutoFlow="dense"
					gap={8}
				>
					<Box gridColumnStart={[1, 1, 3]} gridColumnEnd={[2, 2, 3]}>
						{data.userStory?.recording?.video ? (
							<VideoPlayer>
								<source
									src={data.userStory.recording.video.downloadUrl}
									type="video/webm"
								/>
							</VideoPlayer>
						) : (
							<AspectRatio
								ratio={16 / 9}
								display="flex"
								justifyContent="center"
								alignItems="center"
								border="1px solid"
								borderRadius="lg"
								borderColor={useColorModeValue('gray.300', 'gray.700')}
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
							<FormLabel
								mb={2}
								color={useColorModeValue('gray.500', 'gray.400')}
							>
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
						{data.userStory.isTestCase === true ? null : (
							<Flex
								mt={8}
								justify="space-between"
								align="center"
								p={2}
								borderRadius="lg"
								backgroundColor={useColorModeValue('white', 'gray.900')}
							>
								<Button
									colorScheme={data.userStory.isExpected ? 'cyan' : 'gray'}
									variant="subtle"
									leftIcon={<CheckmarkIcon />}
									onClick={() => {
										updateExpectedTest(date);
										toast({
											position: 'bottom-right',
											title: 'A test case was created!',
											description:
												'The User story has been marked as a test case. It can now be found in the test cases tab.',
											isClosable: true,
											status: 'success',
											variant: 'clean',
										});
										router.push(`/${slugifiedProjectName}/user-stories`);
									}}
									mr={4}
								>
									Create test case
								</Button>
								<Button
									colorScheme={data.userStory.isExpected ? 'gray' : 'red'}
									variant="subtle"
									leftIcon={<XmarkIcon />}
									onClick={() => {
										deleteRejectedRecording();
										toast({
											position: 'bottom-right',
											title: 'A recording has been rejected.',
											description:
												'Rejecting a recording will delete the series of steps as a user story.',
											isClosable: true,
											status: 'success',
											variant: 'clean',
										});
										router.push(`/${slugifiedProjectName}/user-stories`);
									}}
								>
									Delete recording
								</Button>
							</Flex>
						)}
					</Box>

					<Box
						gridColumnStart={[1, 1, 1]}
						gridColumnEnd={[2, 2, 3]}
						maxH="75vh"
						overflow="auto"
						borderRadius="lg"
					>
						<StepList steps={steps} />
						<Flex
							justify="center"
							align="center"
							borderRadius="full"
							h={6}
							w={6}
							border="1px solid"
							borderColor={useColorModeValue('cyan.500', 'cyan.300')}
							backgroundColor="transparentCyan.200"
							ml={8}
						>
							<CheckmarkIcon
								color={useColorModeValue('cyan.500', 'cyan.300')}
							/>
						</Flex>
					</Box>
				</Grid>
			</Box>
		</Stack>
	);
};

export default UserStoryPage;

export { getServerSideProps } from '../../../components/molecules/chakra';
