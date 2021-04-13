import React, { useState, useContext } from 'react';
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
	FormControl,
	Input,
	Tooltip,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
} from '@chakra-ui/react';
import GridCard from '../molecules/grid-card';
import { UserContext } from '../../utils/user';
import { Plans } from '../../utils/stripe';
import { getStripe } from '../../utils/stripe-client';
import { CheckSquareIcon } from '@frontend/chakra-theme';
import SegmentedControl from '../molecules/segmented-control';

const PlanAndBillingCard = () => {
	const [billingInterval, setBillingInterval] = useState('month');
	const [priceIdLoading, setPriceIdLoading] = useState(false);
	const user = useContext(UserContext);

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

	const handleCheckout = async (price: string) => {
		setPriceIdLoading(true);

		try {
			const { sessionId } = await postData({
				url: '/api/stripe/checkout-session',
				data: {
					price,
					projectName: user?.project?.name,
					projectId: user?.project?.id,
					idToken: user?.idToken,
					email: user?.email,
				},
			});
			await console.log({ sessionId });

			const stripe = await getStripe();
			await stripe.redirectToCheckout({ sessionId });
		} catch (error) {
			return alert(error.message);
		} finally {
			setPriceIdLoading(false);
		}
	};

	const [toggleIndex, setToggleIndex] = useState(0);

	const iconBlue = useColorModeValue('blue.500', 'blue.300');
	const codeBg = useColorModeValue('blue.50', 'gray.800');
	const borderGray = useColorModeValue('gray.100', 'gray.800');
	const tertiaryText = useColorModeValue('gray.300', 'gray.700');
	const { free, feedback, business } = Plans;

	return (
		<GridCard
			anchor
			title="Plan and Billing"
			subtitle="Information about the plan you're on and Billing powered by Stripe."
		>
			<Flex justify="center" align="center" mb={6}>
				<Text mr={4} fontWeight="600">
					Billing
				</Text>
				<SegmentedControl
					values={['Monthly', 'Yearly -20%']}
					selectedIndex={toggleIndex}
					setSelectedIndex={setToggleIndex}
				/>
			</Flex>
			<Stack direction="row" w="full" spacing={8}>
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
							sx={{ '-webkit-columns': '2', '-moz-columns': '2', columns: 2 }}
						>
							{feedback.features.map((feature) => (
								<ListItem lineHeight="1.2" fontSize="14px">
									<ListIcon as={CheckSquareIcon} color={iconBlue} />
									{feature}
								</ListItem>
							))}
						</List>
						<Flex direction="column" justify="center" align="center" mt={8}>
							<Popover trigger="hover" placement="top">
								<LightMode>
									<PopoverTrigger>
										<Button
											w="full"
											isLoading={priceIdLoading}
											loadingText="Loading stripe"
											onClick={() =>
												handleCheckout(
													toggleIndex === 0
														? feedback.monthlyPriceId
														: feedback.yearlyPriceId
												)
											}
										>
											Choose the Feedback plan
										</Button>
									</PopoverTrigger>
								</LightMode>
								<PopoverContent p={3}>
									<PopoverArrow />
									<Flex as="span" align="center">
										Use code{' '}
										<Code
											ml={2}
											px={2}
											py={1}
											borderRadius="md"
											variant="outline"
											fontSize="inherit"
											colorScheme="red"
										>
											Feedback100
										</Code>
									</Flex>
									<PopoverCloseButton mt="3px" />
								</PopoverContent>
							</Popover>
						</Flex>
					</Box>
				</Flex>
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
							sx={{ '-webkit-columns': '2', '-moz-columns': '2', columns: 2 }}
						>
							{business.features.map((feature) => (
								<ListItem lineHeight="1.2" fontSize="14px">
									<ListIcon as={CheckSquareIcon} color={iconBlue} />
									{feature}
								</ListItem>
							))}
						</List>
					</Box>
					<Flex justify="center">
						<Button
							variant="subtle"
							mt={8}
							w="full"
							loadingText="Loading stripe"
							isLoading={priceIdLoading}
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
					</Flex>
				</Box>
			</Stack>
			<Stack
				w="full"
				direction="row"
				align="center"
				justifyContent="space-between"
				p={4}
				mt={8}
				borderRadius="lg"
				border="1px solid"
				borderColor={borderGray}
			>
				<Flex align="baseline">
					<Text fontSize="24px" fontWeight="800" mr={4}>
						Free
					</Text>
					<Text color="gray.500">{free.description}</Text>
				</Flex>
				<Flex
					w="full"
					as="form"
					maxW="600px"
					mx={['none', 'none', 'auto']}
					border="1px solid"
					borderColor={useColorModeValue('gray.300', 'gray.700')}
					borderRadius="xl"
					p={2}
					transition="all 0.2s"
					_hover={{ borderColor: useColorModeValue('gray.400', 'gray.600') }}
					_focusWithin={{
						borderColor: useColorModeValue('blue.400', 'blue.600'),
					}}
					direction={['column', 'column', 'row']}
				>
					<FormControl isRequired>
						<Input
							type="email"
							name="email"
							id="email"
							defaultValue={user?.email}
							placeholder="shipit@meeshkan.com"
							_placeholder={{
								color: useColorModeValue('gray.500', 'gray.400'),
							}}
							mr={4}
							border="none"
							_focus={{}}
							mb={[4, 4, 0]}
						/>
					</FormControl>
					<Button minW="fit-content" type="submit" variant="subtle">
						Subscribe to updates
					</Button>
				</Flex>
			</Stack>
		</GridCard>
	);
};

export default PlanAndBillingCard;
