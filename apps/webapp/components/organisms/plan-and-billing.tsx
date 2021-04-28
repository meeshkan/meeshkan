import React, { useState, useContext, useEffect } from 'react';
import {
	Button,
	Text,
	Box,
	Stack,
	LightMode,
	ListIcon,
	ListItem,
	List,
	Flex,
	useColorModeValue,
	Code,
	ModalContent,
	ModalOverlay,
	Modal,
	useDisclosure,
	ModalCloseButton,
	ModalHeader,
	Link,
} from '@chakra-ui/react';
import { UserContext } from '../../utils/user';
import { getStripe, Plans } from '../../utils/stripe-client';
import { CheckSquareIcon } from '@frontend/chakra-theme';
import SegmentedControl from '../molecules/segmented-control';
import { show as showIntercom } from '../../utils/intercom';
import { mutate } from 'swr';

const PlanAndBillingCard = () => {
	const user = useContext(UserContext);

	// Represents billing interval — 0=monthly, 1=yearly
	const [toggleIndex, setToggleIndex] = useState(0);
	const [checkoutSessionLoading, setCheckoutSessionLoading] = useState(false);
	const [subscriptionLoading, setSubscriptionLoading] = useState(false);
	const [portalSessionLoading, setPortalSessionLoading] = useState(false);
	const [plan, setPlan] = useState({
		name: user?.project?.configuration?.plan,
		billingInterval: user?.project?.configuration.billingInterval,
		subscriptionStartedDate:
			user?.project?.configuration?.subscriptionStartedDate,
		subscriptionStatus: user?.project?.configuration?.subscriptionStatus,
	});
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		setPlan({
			name: user?.project?.configuration?.plan,
			billingInterval: user?.project?.configuration.billingInterval,
			subscriptionStartedDate:
				user?.project?.configuration?.subscriptionStartedDate,
			subscriptionStatus: user?.project?.configuration?.subscriptionStatus,
		});
	}, [user]);

	const { free, feedback, business } = Plans;

	const postData = async ({ url = '', data = {} }) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify(data),
		});

		// @ts-expect-error
		if (res.error) {
			throw new Error('Post request failed.');
		}

		return res.json();
	};

	// Handle the case where payment is needed
	const handleCheckout = async (price: string) => {
		setCheckoutSessionLoading(true);

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
		setCheckoutSessionLoading(false);
	};

	// Handle the case where a subscription with out payment is being created
	const handleSubscription = async (price: string, trial: boolean) => {
		setSubscriptionLoading(true);
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
		await mutate('/api/session');
		setCheckoutSessionLoading(false);
	};

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
		if (error) return alert(error.message);
		window.location.assign(url);
		setPortalSessionLoading(false);
	};

	const iconBlue = useColorModeValue('blue.500', 'blue.300');
	const codeBg = useColorModeValue('blue.50', 'gray.800');
	const borderGray = useColorModeValue('gray.100', 'gray.800');
	const secondaryText = useColorModeValue('gray.500', 'gray.400');
	const tertiaryText = useColorModeValue('gray.300', 'gray.700');
	const subtleButtonBorderColor = useColorModeValue('gray.200', 'gray.700');

	if (plan.name) {
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
									plan.subscriptionStatus == 'cancelled'
										? 'red'
										: plan.subscriptionStatus == 'active'
										? 'cyan'
										: plan.subscriptionStatus == 'trialing'
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
							{plan.name == 'Free'
								? free[
										plan.billingInterval == 'yearly'
											? 'yearlyPrice'
											: 'monthlyPrice'
								  ]
								: plan.name == 'Feedback'
								? feedback[
										plan.billingInterval == 'yearly'
											? 'yearlyPrice'
											: 'monthlyPrice'
								  ]
								: plan.name == 'Business'
								? business[
										plan.billingInterval == 'yearly'
											? 'yearlyPrice'
											: 'monthlyPrice'
								  ]
								: 'NaN'}
						</Text>
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
					<Flex direction="column" align="center" w="full">
						<Code
							variant="outline"
							background={codeBg}
							h="20px"
							borderRadius="md"
							py={2}
							px={4}
							colorScheme="blue"
							maxW="fit-content"
							mb="-10px"
							zIndex="1"
							fontWeight="700"
						>
							Most popular
						</Code>
						<Box
							p={4}
							w="full"
							borderRadius="lg"
							border="1px solid"
							borderColor={iconBlue}
							boxShadow="0px 8px 24px 0px rgba(149,157,165,0.2)"
						>
							<Flex justify="space-between" mb={4}>
								<Text fontSize="24px" fontWeight="800">
									Feedback
								</Text>
								<Flex>
									<Text
										fontWeight="800"
										fontSize="24px"
										mr={4}
										textDecor="line-through"
										color={tertiaryText}
									>
										{toggleIndex === 0
											? feedback.monthlyPrice
											: feedback.yearlyPrice}
									</Text>
									<Text fontWeight="800" fontSize="24px">
										{toggleIndex === 0
											? feedback.discountedMonthly
											: feedback.discountedYearly}
									</Text>
								</Flex>
							</Flex>
							<Text textAlign="center" color="gray.500" mb={8}>
								{feedback.description}
							</Text>

							<List
								spacing={2}
								sx={{ WebkitColumns: '2', MozColumns: '2', columns: 2 }}
							>
								{feedback.features.map((feature) => (
									<ListItem lineHeight="1.2" fontSize="14px" key={feature}>
										<ListIcon as={CheckSquareIcon} color={iconBlue} />
										{feature}
									</ListItem>
								))}
							</List>
							<Flex direction="column" justify="center" align="center" mt={8}>
								<LightMode>
									<Button
										w="full"
										isLoading={subscriptionLoading}
										loadingText="Creating subscription"
										isDisabled={portalSessionLoading || checkoutSessionLoading}
										onClick={() => {
											handleSubscription(
												toggleIndex === 0
													? feedback.monthlyPriceId
													: feedback.yearlyPriceId,
												true
											);
											onOpen();
										}}
									>
										Choose the Feedback plan
									</Button>
								</LightMode>
							</Flex>
						</Box>
					</Flex>
					<LightMode>
						<Modal
							onClose={onClose}
							isOpen={isOpen}
							isCentered
							motionPreset="slideInBottom"
							size="7xl"
							scrollBehavior="inside"
						>
							<ModalOverlay />
							<ModalContent p={4}>
								<ModalHeader color="gray.700">
									Schedule your first feedback call!
								</ModalHeader>
								<ModalCloseButton color="gray.500" />
								<Box
									h="95vh"
									w="full"
									as="iframe"
									src={`https://savvycal.com/meeshkan/customer-advisory-board?display_name=${user?.firstName}+${user?.lastName}&email=${user?.email}`}
								/>
							</ModalContent>
						</Modal>
					</LightMode>

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
										{toggleIndex === 0
											? business.monthlyPrice
											: business.yearlyPrice}
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
							isLoading={checkoutSessionLoading}
							isDisabled={portalSessionLoading || subscriptionLoading}
							onClick={() =>
								handleCheckout(
									toggleIndex === 0
										? business.monthlyPriceId
										: business.yearlyPriceId
								)
							}
						>
							Choose the Business plan
						</Button>
					</Box>
				</Stack>
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
						isLoading={subscriptionLoading}
						isDisabled={portalSessionLoading || checkoutSessionLoading}
						onClick={() =>
							handleSubscription(
								toggleIndex === 0 ? free.monthlyPriceId : free.yearlyPriceId,
								false
							)
						}
					>
						Subscribe to updates
					</Button>
				</Stack>
			</>
		);
	}
};

export default PlanAndBillingCard;
