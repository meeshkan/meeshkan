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
} from '@chakra-ui/react';
import { UserContext } from 'apps/webapp/utils/user';
import { eightBaseClient } from 'apps/webapp/utils/graphql';
import { USER_STORY } from '../../../graphql/user-stories/[userStoryId]';
import useSWR from 'swr';
import {
	CrosshairIcon,
	VideoIcon,
	CheckmarkIcon,
	XmarkIcon,
} from '@frontend/chakra-theme';
import LoadingScreen from 'apps/webapp/components/organisms/loading-screen';
import { StepList } from '../../../components/molecules/side-step-list';
import { useRouter } from 'next/router';
import Video from 'apps/webapp/components/atoms/video';

type UserStoryProps = {
	cookies: string | undefined;
};

const userStorySteps = [
	{
		stepName: 'Load `/home` path',
		subSteps: ['Navigate to `/dashboard`'],
	},
	{
		stepName: 'Load `/home` path',
		subSteps: ['Select `div.calendar-create-collect`', 'Click button'],
	},
	{
		stepName: 'Request collection',
		subSteps: [
			'Focus `input.ant-calendar-picker-input`',
			'Type date (0-25 days from today)',
			'Click button to submit form',
		],
	},
];

const UserStory = (props: UserStoryProps) => {
	const { project, idToken } = useContext(UserContext);
	const router = useRouter();

	var currentPath = router.asPath;
	var userStoryId = currentPath.substr(currentPath.length - 25);

	const client = eightBaseClient(idToken);
	const fetcher = (query) =>
		client.request(query, {
			projectId: project.id,
			userStoryId: userStoryId,
		});
	const { data, error, isValidating } = useSWR(USER_STORY, fetcher);

	if (isValidating || !data) {
		return <LoadingScreen as={Card} />;
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
							onSubmit={() => null}
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
							{data.userStory.created[0] == 'user' ? (
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

				{/* <StepList steps={userStorySteps} /> */}
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
						onClick={() => null}
						mr={4}
					>
						Expected
					</Button>
					<Button
						colorScheme={data.userStory.isExpected ? 'gray' : 'red'}
						variant="subtle"
						leftIcon={<XmarkIcon />}
						onClick={() => null}
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
