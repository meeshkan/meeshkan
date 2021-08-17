import React, { useContext, useState } from 'react';
import {
	Box,
	Button,
	Code,
	Flex,
	Link,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { PlanType } from '@frontend/meeshkan-types';
import { Plans, postData } from '../../../utils/stripe-client';
import { show as showIntercom } from '../../../utils/intercom';
import { UserContext } from '../../../utils/user';

type CurrentPlanProps = {
	plan: PlanType;
};

export const CurrentPlanCard = ({ plan }: CurrentPlanProps) => {
	const user = useContext(UserContext);

	const { free, feedback, business } = Plans;
	const [portalSessionLoading, setPortalSessionLoading] = useState(false);

	// Handle the case where a subscription exists already — manage in Stripe's portal
	const redirectToCustomerPortal = async () => {
		setPortalSessionLoading(true);
		const { url, error } = await postData({
			url: '/api/stripe/portal-link',
			data: {
				projectName: user?.project?.name,
				projectID: user?.project?.id,
				idToken: user?.idToken,
				email: user?.email,
			},
		});
		if (error) {
			return alert(error.message);
		}
		window?.location.assign(url);
		setPortalSessionLoading(false);
	};

	const secondaryText = useColorModeValue('gray.500', 'gray.400');
	const subtleButtonBorderColor = useColorModeValue('gray.200', 'gray.700');
	const iconBlue = useColorModeValue('blue.500', 'blue.300');
	return (
		<Box>
			<Text fontSize="sm" color={secondaryText} mb={2}>
				Current plan
			</Text>

			<Flex justify="space-between" mb={4}>
				<Box>
					<Text fontWeight="800" fontSize="24px" mb={2}>
						{plan.name}
					</Text>
					<Flex align="center">
						<Text mr={3}>Billing</Text>
						<Code mr={2} p={2} borderRadius="md" fontWeight="700">
							{plan.billingInterval}
						</Code>
						<Code
							colorScheme={
								plan.subscriptionStatus === 'cancelled'
									? 'red'
									: plan.subscriptionStatus === 'active'
									? 'cyan'
									: plan.subscriptionStatus === 'trialing'
									? 'blue'
									: 'gray'
							}
							p={2}
							borderRadius="md"
							fontWeight="700"
						>
							{plan.subscriptionStatus}
						</Code>
					</Flex>
				</Box>

				<Box textAlign="end">
					<Text fontWeight="800" fontSize="24px" mb={2}>
						{plan.name === 'Free'
							? free[
									plan.billingInterval === 'yearly'
										? 'yearlyPrice'
										: 'monthlyPrice'
							  ]
							: plan.name === 'Feedback'
							? feedback[
									plan.billingInterval === 'yearly'
										? 'yearlyPrice'
										: 'monthlyPrice'
							  ]
							: plan.name === 'Business'
							? business[
									plan.billingInterval === 'yearly'
										? 'yearlyPrice'
										: 'monthlyPrice'
							  ]
							: null}
					</Text>
					{plan.name !== 'Demo' && (
						<Button
							colorScheme="gray"
							variant="subtle"
							border="1px solid"
							borderColor={subtleButtonBorderColor}
							loadingText="Loading stripe"
							isLoading={portalSessionLoading}
							onClick={redirectToCustomerPortal}
						>
							Manage
						</Button>
					)}
				</Box>
			</Flex>

			<Text>
				For questions about billing, please{' '}
				<Link onClick={showIntercom} fontStyle="italic" color={iconBlue}>
					start a chat
				</Link>
				.
			</Text>
		</Box>
	);
};
