import React, { useContext } from 'react';
import { Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Plans } from '../../../utils/stripe-client';
import { IUser, PlanType } from '@frontend/meeshkan-types';
import { UserContext } from 'apps/webapp/utils/user';

type FreeProps = {
	toggleIndex: number;
	loading: boolean;
	setSubscriptionLoading: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubscription: (
		price: string,
		trial: boolean,
		chosenPlan: PlanType
	) => Promise<void>;
};

export const FreeCard = ({
	toggleIndex,
	loading,
	setSubscriptionLoading,
	handleSubscription,
}: FreeProps) => {
	const user = useContext(UserContext);

	const { free } = Plans;
	const borderGray = useColorModeValue('gray.100', 'gray.800');

	return (
		<Stack
			w="full"
			direction={['column', 'column', 'row']}
			align="center"
			justifyContent="space-between"
			p={4}
			mt={8}
			borderRadius="lg"
			border="1px solid"
			borderColor={borderGray}
		>
			<Flex align="baseline" direction={['column', 'row']}>
				<Text fontSize="24px" fontWeight="800" mr={4}>
					Free
				</Text>
				<Text color="gray.500">{free.description}</Text>
			</Flex>

			<Button
				minW="fit-content"
				type="submit"
				variant="subtle"
				loadingText="Creating subscription"
				isLoading={loading}
				onClick={async () => {
					setSubscriptionLoading(true);
					handleSubscription(
						toggleIndex === 0 ? free.monthlyPriceId : free.yearlyPriceId,
						false,
						{
							name: 'Free',
							billingInterval: toggleIndex === 0 ? 'monthly' : 'yearly',
							subscriptionStatus: 'active',
							subscriptionStartedDate: new Date(),
						}
					);
					const updatedProject = user?.project;
					updatedProject.configuration = {
						...user?.project?.configuration,
						plan: 'Free',
						billingInterval: toggleIndex === 0 ? 'monthly' : 'yearly',
						subscriptionStatus: 'active',
						subscriptionStartedDate: new Date(),
					};

					await user?.mutate(
						{ ...user, project: updatedProject } as IUser,
						false
					);
					setSubscriptionLoading(false);
				}}
			>
				Subscribe to updates
			</Button>
		</Stack>
	);
};
