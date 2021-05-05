import React from 'react';
import {
	Box,
	Button,
	Flex,
	List,
	ListIcon,
	ListItem,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { CheckSquareIcon } from '@frontend/chakra-theme';
import { Plans } from '../../../utils/stripe-client';
import { PlanType } from '@frontend/meeshkan-types';

type BusinessProps = {
	loading: boolean;
	toggleIndex: number;
	handleCheckout: (price: string, chosenPlan: PlanType) => Promise<void>;
};

export const BusinessCard = ({
	loading,
	toggleIndex,
	handleCheckout,
}: BusinessProps) => {
	const { business } = Plans;

	const iconBlue = useColorModeValue('blue.500', 'blue.300');
	return (
		<Box
			d="flex"
			flexDirection="column"
			justifyContent="space-between"
			p={4}
			w="full"
			borderRadius="lg"
			border="1px solid"
			borderColor="transparent"
			boxShadow="0px 8px 24px 0px rgba(149,157,165,0.2)"
		>
			<Box>
				<Flex justify="space-between" mb={4}>
					<Text fontSize="24px" fontWeight="800">
						Business
					</Text>
					<Flex>
						<Text fontWeight="800" fontSize="24px">
							{toggleIndex === 0 ? business.monthlyPrice : business.yearlyPrice}
						</Text>
					</Flex>
				</Flex>
				<Text textAlign="center" color="gray.500" mb={8}>
					{business.description}
				</Text>
				<List
					spacing={2}
					sx={{ WebkitColumns: '2', MozColumns: '2', columns: 2 }}
				>
					{business.features.map((feature) => (
						<ListItem lineHeight="1.2" fontSize="14px" key={feature}>
							<ListIcon as={CheckSquareIcon} color={iconBlue} />
							{feature}
						</ListItem>
					))}
				</List>
			</Box>
			<Button
				variant="subtle"
				mt={8}
				w="full"
				loadingText="Loading stripe"
				isLoading={loading}
				onClick={() =>
					handleCheckout(
						toggleIndex === 0
							? business.monthlyPriceId
							: business.yearlyPriceId,
						{
							name: 'Business',
							billingInterval: toggleIndex === 0 ? 'monthly' : 'yearly',
							subscriptionStatus: 'active',
							subscriptionStartedDate: new Date(),
						}
					)
				}
			>
				Choose the Business plan
			</Button>
		</Box>
	);
};
