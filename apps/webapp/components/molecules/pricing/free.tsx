import React from 'react';
import { Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Plans } from '../../../utils/stripe-client';
import { PlanType } from '@frontend/meeshkan-types';

type FreeProps = {
	loading: boolean;
	toggleIndex: number;
	handleSubscription: (
		price: string,
		trial: boolean,
		chosenPlan: PlanType
	) => Promise<void>;
};

export const FreeCard = ({
	loading,
	toggleIndex,
	handleSubscription,
}: FreeProps) => {
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
				onClick={() =>
					handleSubscription(
						toggleIndex === 0 ? free.monthlyPriceId : free.yearlyPriceId,
						false,
						{
							name: 'Free',
							billingInterval: toggleIndex === 0 ? 'monthly' : 'yearly',
							subscriptionStatus: 'active',
							subscriptionStartedDate: new Date(),
						}
					)
				}
			>
				Subscribe to updates
			</Button>
		</Stack>
	);
};
