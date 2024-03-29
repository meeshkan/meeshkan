import React, { useContext, useMemo, useState } from 'react';
import Card from '../../../components/atoms/card';
import {
	Text,
	useColorModeValue,
	Link as ChakraLink,
	SimpleGrid,
	GridItem,
	Spacer,
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
import { DetailsForm } from '../../../components/molecules/user-stories/details-form';
import { StepForm } from '../../../components/molecules/user-stories/step-form';

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
	const [selectedStep, setSelectedStep] = useState<Number | null>(null);
	const { userStoryId } = router.query;

	const backLinkColor = useColorModeValue('gray.900', 'gray.200');

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

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
		mutate,
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
		data?.userStory?.scriptCommands?.items;

	return (
		<ValidatedBillingPlan>
			<SimpleGrid columns={3} spacing={8} w="full">
				<GridItem colSpan={2} overflowY="auto">
					<Link href={`/${slugifiedProjectName}/test-cases`} passHref>
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
							Back to test cases
						</ChakraLink>
					</Link>

					<UserStoryVideo
						video={data.userStory?.video?.downloadUrl}
						startEventId={data?.userStory?.startEventId}
						endEventId={data?.userStory?.endEventId}
						userStoryId={data?.userStory?.id}
					/>

					<Spacer h={6} />

					<StepList
						userStoryId={data?.userStory?.id}
						steps={steps}
						mutateUserStory={mutate}
						selectedStep={selectedStep}
						setSelectedStep={setSelectedStep}
						requiresAuthentication={data?.userStory?.requiresAuthentication}
					/>
				</GridItem>

				<GridItem as={GridCard} h="100%" maxH="none" colSpan={1}>
					{typeof selectedStep == 'number' ? (
						<>
							<StepForm
								mutateUserStory={mutate}
								setSelectedStep={setSelectedStep}
								userStory={data?.userStory}
								selectedStep={selectedStep}
							/>
						</>
					) : (
						<DetailsForm userStory={data?.userStory} />
					)}
				</GridItem>
			</SimpleGrid>
		</ValidatedBillingPlan>
	);
};

export default UserStoryPage;

export { getServerSideProps } from '../../../components/molecules/chakra';
