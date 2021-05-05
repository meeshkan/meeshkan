import React, { useState, useContext, useEffect } from 'react';
import { Text, Stack, Flex } from '@chakra-ui/react';
import { UserContext } from '../../utils/user';
import { IUser } from '@frontend/meeshkan-types';
import { getStripe, postData } from '../../utils/stripe-client';
import SegmentedControl from '../molecules/segmented-control';
import { eightBaseClient } from '../../utils/graphql';
import { PLAN_UPDATE } from '../../graphql/project';
import {
	BusinessCard,
	CurrentPlanCard,
	FeedbackCard,
	FreeCard,
} from '../molecules/pricing';
import { PlanType } from '@frontend/meeshkan-types';

const PlanAndBillingCard = () => {
	const user = useContext(UserContext);
	const client = eightBaseClient(user?.idToken);

	// Represents billing interval — 0=monthly, 1=yearly
	const [toggleIndex, setToggleIndex] = useState(0);
	const [checkoutSessionLoading, setCheckoutSessionLoading] = useState(false);
	const [subscriptionLoading, setSubscriptionLoading] = useState(false);

	const [plan, setPlan] = useState<PlanType>({
		name: user?.project?.configuration?.plan,
		billingInterval: user?.project?.configuration?.billingInterval,
		subscriptionStartedDate:
			user?.project?.configuration?.subscriptionStartedDate,
		subscriptionStatus: user?.project?.configuration?.subscriptionStatus,
	});

	useEffect(() => {
		setPlan({
			name: user?.project?.configuration?.plan,
			billingInterval: user?.project?.configuration?.billingInterval,
			subscriptionStartedDate:
				user?.project?.configuration?.subscriptionStartedDate,
			subscriptionStatus: user?.project?.configuration?.subscriptionStatus,
		});
	}, [user?.project]);

	// Handle the case where payment is needed
	const handleCheckout = async (price: string, chosenPlan: PlanType) => {
		await setCheckoutSessionLoading(true);

		try {
			const { sessionId } = await postData({
				url: '/api/stripe/checkout-session',
				data: {
					price,
					projectName: user?.project?.name,
					projectID: user?.project?.id,
					idToken: user?.idToken,
					email: user?.email,
				},
			});

			const stripe = await getStripe();
			await stripe.redirectToCheckout({ sessionId });
		} catch (error) {
			throw new Error(error.message);
		}

		// For speed, mutate 8base instantly. The Stripe webhook will update this if it's incorrect.
		await client.request(PLAN_UPDATE, {
			projectID: user?.project?.id,
			plan: chosenPlan?.name,
			billingInterval: chosenPlan?.billingInterval,
			subscriptionStatus: chosenPlan?.subscriptionStatus,
		});

		const updatedProject = user?.project;
		updatedProject.configuration = {
			...user?.project?.configuration,
			stripeCustomerID: null,
			plan: chosenPlan?.name,
			billingInterval: chosenPlan?.billingInterval,
			subscriptionStatus: chosenPlan?.subscriptionStatus,
			subscriptionStartedDate: new Date(),
		};

		await user?.mutate({ ...user, project: updatedProject } as IUser, false);
		setCheckoutSessionLoading(false);
	};

	// Handle the case where a subscription with out payment is being created
	const handleSubscription = async (
		price: string,
		trial: boolean,
		chosenPlan: PlanType
	) => {
		await postData({
			url: '/api/stripe/create-subscription',
			data: {
				price,
				projectName: user?.project?.name,
				projectID: user?.project?.id,
				idToken: user?.idToken,
				email: user?.email,
				trial,
			},
		});

		// For speed, mutate 8base instantly. The Stripe webhook will update this if it's incorrect.
		await client.request(PLAN_UPDATE, {
			projectID: user?.project?.id,
			plan: chosenPlan?.name,
			billingInterval: chosenPlan?.billingInterval,
			subscriptionStatus: chosenPlan?.subscriptionStatus,
		});
	};

	if (plan.name) {
		return <CurrentPlanCard plan={plan} />;
	} else {
		return (
			<>
				<Flex justify="center" align="center" mb={6}>
					<Text mr={4} fontWeight="600">
						Billed
					</Text>
					<SegmentedControl
						values={['Monthly', 'Yearly -20%']}
						selectedIndex={toggleIndex}
						setSelectedIndex={setToggleIndex}
					/>
				</Flex>
				<Stack direction={['column', 'column', 'row']} w="full" spacing={8}>
					<FeedbackCard
						handleSubscription={handleSubscription}
						toggleIndex={toggleIndex}
						loading={checkoutSessionLoading && subscriptionLoading}
						setSubscriptionLoading={setSubscriptionLoading}
					/>
					<BusinessCard
						handleCheckout={handleCheckout}
						toggleIndex={toggleIndex}
						loading={checkoutSessionLoading && subscriptionLoading}
					/>
				</Stack>
				<FreeCard
					handleSubscription={handleSubscription}
					toggleIndex={toggleIndex}
					loading={checkoutSessionLoading && subscriptionLoading}
					setSubscriptionLoading={setSubscriptionLoading}
				/>
			</>
		);
	}
};

export default PlanAndBillingCard;
