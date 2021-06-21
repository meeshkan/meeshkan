import React, { useContext, useMemo, useEffect } from 'react';
import Card from '../../../components/atoms/card';
import {
	Text,
	useColorModeValue,
	Link as ChakraLink,
	Stack,
	SimpleGrid,
	GridItem,
	Spacer,
	Divider,
	Heading,
} from '@chakra-ui/react';
import { UserContext } from '../../../utils/user';
import { ScriptCommandListResponse, UserStory } from '@frontend/meeshkan-types';
import { eightBaseClient } from '../../../utils/graphql';
import { USER_STORY } from '../../../graphql/user-story';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import LoadingScreen from '../../../components/organisms/loading-screen';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import { StepList } from '../../../components/molecules/side-step-list';
import ValidatedBillingPlan from '../../../components/molecules/validated-billing-plan';
import NotFoundError from '../../404';
import { createSlug } from '../../../utils/createSlug';
import Link from 'next/link';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { UserStoryVideo } from '../../../components/molecules/user-stories/video';
import GridCard from '../../../components/molecules/grid-card';
import { DetailsForm } from 'apps/webapp/components/molecules/user-stories/details-form';

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

	const stepNumberColor = useColorModeValue('cyan.500', 'cyan.300');
	const backLinkColor = useColorModeValue('gray.900', 'gray.200');

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

	const { userStoryId } = router.query;

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

	const steps: ScriptCommandListResponse['items'] =
		data.userStory.scriptCommands.items;

	return (
		<ValidatedBillingPlan>
			<SimpleGrid columns={3} spacing={8} w="full">
				<GridItem colSpan={2} overflowY="auto">
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
							Back to user stories
						</ChakraLink>
					</Link>

					<UserStoryVideo
						video={data.userStory?.video?.downloadUrl}
						startEventId={data?.userStory?.startEventId}
						endEventId={data?.userStory?.endEventId}
						userStoryId={data?.userStory?.id}
					/>

					<Spacer h={6} />

					<StepList steps={steps} />
				</GridItem>

				<GridItem
					as={GridCard}
					title="User story details"
					h="100%"
					maxH="none"
					colSpan={1}
				>
					<DetailsForm userStory={data?.userStory} />
					<Stack mt={8}>
						<Heading
							as="h2"
							d="flex"
							alignItems="center"
							fontSize="lg"
							fontWeight="800"
							lineHeight="short"
						>
							Recent activity
						</Heading>
						<Divider mt={1} mb={4} />
					</Stack>
				</GridItem>
			</SimpleGrid>
		</ValidatedBillingPlan>
	);
};

export default UserStoryPage;

export { getServerSideProps } from '../../../components/molecules/chakra';
