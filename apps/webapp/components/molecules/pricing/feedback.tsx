import React, { useContext } from 'react';
import {
	Box,
	Button,
	Code,
	Flex,
	LightMode,
	List,
	ListIcon,
	ListItem,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { CheckSquareIcon } from '@frontend/chakra-theme';
import { Plans } from '../../../utils/stripe-client';
import { UserContext } from '../../../utils/user';
import { IUser, PlanType } from '@frontend/meeshkan-types';

type FeedbackProps = {
	toggleIndex: number;
	loading: boolean;
	setSubscriptionLoading: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubscription: (
		price: string,
		trial: boolean,
		chosenPlan: PlanType
	) => Promise<void>;
};

export const FeedbackCard = ({
	toggleIndex,
	loading,
	setSubscriptionLoading,
	handleSubscription,
}: FeedbackProps) => {
	const user = useContext(UserContext);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { feedback } = Plans;

	const codeBg = useColorModeValue('blue.50', 'gray.800');
	const tertiaryText = useColorModeValue('gray.300', 'gray.700');
	const iconBlue = useColorModeValue('blue.500', 'blue.300');
	return (
		<>
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
								isLoading={loading}
								loadingText="Creating subscription"
								onClick={async () => {
									setSubscriptionLoading(true);
									handleSubscription(
										toggleIndex === 0
											? feedback.monthlyPriceId
											: feedback.yearlyPriceId,
										true,
										{
											name: 'Feedback',
											billingInterval: toggleIndex === 0 ? 'monthly' : 'yearly',
											subscriptionStatus: 'trialing',
											subscriptionStartedDate: new Date(),
										}
									);
									onOpen();
									setSubscriptionLoading(false);
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
					onClose={async () => {
						onClose();
						const updatedProject = user?.project;
						updatedProject.configuration = {
							...user?.project?.configuration,
							plan: 'Feedback',
							billingInterval: toggleIndex === 0 ? 'monthly' : 'yearly',
							subscriptionStatus: 'trialing',
							subscriptionStartedDate: new Date(),
						};

						await user?.mutate(
							{ ...user, project: updatedProject } as IUser,
							false
						);
					}}
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
		</>
	);
};
