import React, { useContext } from 'react';
import Card from '../../../components/atoms/card';
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
} from '@chakra-ui/react';
import { UserContext } from '../../../utils/user';
import { eightBaseClient } from '../../../utils/graphql';
import {
	USER_STORY,
	UPDATE_EXPECTED_TEST,
	DELETE_REJECTED_RECORDING,
	UPDATE_STORY_TITLE,
} from '../../../graphql/user-story';
import useSWR from 'swr';
import {
	CrosshairIcon,
	VideoIcon,
	CheckmarkIcon,
	XmarkIcon,
} from '@frontend/chakra-theme';
import { useRouter } from 'next/router';
import LoadingScreen from '../../../components/organisms/loading-screen';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import { StepList } from '../../../components/molecules/side-step-list';
import Video from '../../../components/atoms/video';
import NotFoundError from '../../404';
import { createSlug } from '../../../utils/createSlug';

type UserStoryProps = {
	cookies: string | undefined;
};

const UserStory = (props: UserStoryProps) => {
	const { project, idToken } = useContext(UserContext);
	const {
		found: foundProject,
		loading: validatingProject,
	} = useValidateSelectedProject();
	const router = useRouter();
	const toast = useToast();

	const slugifiedProjectName = createSlug(project.name);
	const currentPath = router.asPath;
	const userStoryId = currentPath.substr(currentPath.length - 25);
	const date = new Date().toISOString().replace('Z', '') + '+00:00';

	const client = eightBaseClient(idToken);

	// Initial data fetch
	const fetcher = (query) =>
		client.request(query, {
			projectId: project.id,
			userStoryId: userStoryId,
		});

	const { data, error, isValidating: validatingQuery } = useSWR(
		USER_STORY,
		fetcher
	);

	// Functions that call mutations for updating the user stories
	const updateTitle = (newTitle: string) => {
		const request = client.request(UPDATE_STORY_TITLE, {
			userStoryId: userStoryId,
			newTitle: newTitle,
		});
		return request;
	};

	const updateExpectedTest = (testCreatedDate: string) => {
		const request = client.request(UPDATE_EXPECTED_TEST, {
			userStoryId: userStoryId,
			testCreatedDate: testCreatedDate,
		});
		return request;
	};

	const deleteRejectedRecording = () => {
		const request = client.request(DELETE_REJECTED_RECORDING, {
			userStoryId: userStoryId,
		});
		return request;
	};

	if (validatingQuery || validatingProject || !data) {
		return <LoadingScreen as={Card} />;
	}

	if (!foundProject) {
		return <NotFoundError />;
	}

	if (error) {
		return <Text color="red.500">{error}</Text>;
	}

	return (
		<Flex
			as={Card}
			justify="space-between"
			direction="column"
			h="100%"
			w="100%"
			p={8}
		>
			<Box flex="1" overflow="auto">
				<Flex align="baseline" justify="space-between" mb={8}>
					<Flex align="baseline">
						<Editable
							defaultValue={data.userStory.title}
							// Callback invoked when user confirms value with `enter` key or by blurring input.
							onSubmit={(e) => updateTitle(e)}
							fontSize="xl"
							fontWeight={900}
							mr={4}
						>
							<EditablePreview />
							<EditableInput />
						</Editable>
						<Badge
							fontWeight={700}
							fontSize="md"
							mr={2}
							textTransform="capitalize"
						>
							{data.userStory.created[0] === 'user' ? (
								<VideoIcon mr={2} />
							) : (
								<CrosshairIcon mr={2} />
							)}
							{data.userStory.created[0]}
						</Badge>
						{data.userStory.isExpected ? (
							<Badge
								colorScheme="cyan"
								fontWeight={700}
								fontSize="md"
								textTransform="capitalize"
							>
								Expected behavior
							</Badge>
						) : (
							<Badge
								colorScheme="red"
								fontWeight={700}
								fontSize="md"
								textTransform="capitalize"
							>
								Buggy behavior
							</Badge>
						)}
					</Flex>
					<Select
						defaultValue={data.userStory.significance}
						size="sm"
						borderRadius="md"
						w="fit-content"
					>
						<option value="low">Low priority</option>
						<option value="medium">Medium priority</option>
						<option value="high">High priority</option>
					</Select>
				</Flex>

				<Box>
					{data.userStory.recording.items[0].video && (
						<Box maxW="500px">
							<Video
								url={data.userStory.recording.items[0].video.downloadUrl}
								title="User story replay recording"
							/>
						</Box>
					)}

					<StepList
						steps={
							JSON.parse(data.userStory.recording.items[0].sideScript).tests[0]
								.commands
						}
					/>
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
						<CheckmarkIcon color={useColorModeValue('cyan.500', 'cyan.300')} />
					</Flex>
				</Box>
			</Box>

			{data.userStory.isTestCase === true ? null : (
				<Flex justify="center" align="center" w="100%">
					<Button
						colorScheme={data.userStory.isExpected ? 'cyan' : 'gray'}
						variant="subtle"
						leftIcon={<CheckmarkIcon />}
						onClick={() => {
							updateExpectedTest(date);
							toast({
								position: 'bottom-right',
								render: () => (
									<Box
										color="white"
										p={4}
										bg="blue.500"
										borderRadius="md"
										fontSize="md"
									>
										Success. The User story has been marked as a test case!
									</Box>
								),
								duration: 5000,
								isClosable: true,
							});
							router.push(`/${slugifiedProjectName}/user-stories`);
						}}
						mr={4}
					>
						Expected
					</Button>
					<Button
						colorScheme={data.userStory.isExpected ? 'gray' : 'red'}
						variant="subtle"
						leftIcon={<XmarkIcon />}
						onClick={() => {
							deleteRejectedRecording;
							toast({
								position: 'bottom-right',
								render: () => (
									<Box
										color="white"
										p={4}
										bg="blue.500"
										borderRadius="md"
										fontSize="md"
									>
										Rejected. The User story has been deleted!
									</Box>
								),
								duration: 5000,
								isClosable: true,
							});
							router.push(`/${slugifiedProjectName}/user-stories`);
						}}
					>
						Reject
					</Button>
				</Flex>
			)}
		</Flex>
	);
};

export default UserStory;

export { getServerSideProps } from '../../../components/molecules/chakra';
