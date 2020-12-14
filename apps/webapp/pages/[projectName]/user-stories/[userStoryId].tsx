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
} from '@chakra-ui/react';
import { UserContext } from 'apps/webapp/utils/user';
import { eightBaseClient } from 'apps/webapp/utils/graphql';
import { USER_STORY } from '../../../graphql/user-stories/[userStoryId]';
import useSWR from 'swr';
import { CrosshairIcon, VideoIcon } from '@frontend/chakra-theme';
import LoadingScreen from 'apps/webapp/components/organisms/loading-screen';

type UserStoryProps = {
	cookies: string | undefined;
};

const StoryStep = ({ stepNumber, stepName, subSteps }) => {
	return (
		<Box
			py={4}
			px={8}
			borderRadius="md"
			_hover={{
				backgroundColor: useColorModeValue('gray.100', 'gray.800'),
			}}
		>
			<Flex>
				<Flex
					justify="center"
					align="center"
					borderRadius="full"
					h={6}
					w={6}
					border="1px solid"
					borderColor="gray.500"
					fontWeight={500}
					mr={4}
				>
					{stepNumber}
				</Flex>
				<Text>{stepName}</Text>
			</Flex>
			{subSteps.map((step, index) => (
				<Text>{step}</Text>
			))}
		</Box>
	);
};

const UserStory = (props: UserStoryProps) => {
	const { project, idToken } = useContext(UserContext);

	const client = eightBaseClient(idToken);
	const fetcher = (query) =>
		client.request(query, {
			projectId: project.id,
			userStoryId: 'ckiel9ptl026907jl4n704t2k',
		});
	const { data, error, isValidating } = useSWR(USER_STORY, fetcher);

	if (isValidating || !data) {
		return <LoadingScreen as={Card} />;
	}

	return (
		<Card h="100%" w="100%" p={8}>
			<Flex align="baseline" mb={8}>
				<Editable
					defaultValue={data.userStory.title}
					fontSize="xl"
					fontWeight={900}
					mr={4}
				>
					<EditablePreview />
					<EditableInput />
				</Editable>
				<Badge fontWeight={700} fontSize="md" mr={2} textTransform="capitalize">
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

			<StoryStep
				stepNumber="1"
				stepName="Load `/home` path"
				subSteps={['Navigate to `/dashboard`']}
			/>
			<StoryStep
				stepNumber="2"
				stepName="Click on add new collection button"
				subSteps={['Select `div.calendar-create-collect`', 'Click button']}
			/>
			<StoryStep
				stepNumber="3"
				stepName="Request collection"
				subSteps={[
					'Focus `input.ant-calendar-picker-input`',
					'Type date (0-25 days from today)',
					'Click button to submit form',
				]}
			/>
		</Card>
	);
};

export default UserStory;

export { getServerSideProps } from '../../../components/molecules/chakra';
