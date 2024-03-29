import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';
import { SideStep } from '../atoms/side-step';
import {
	ScriptCommandListResponse,
	UserStories_ScriptCommandCreateInput,
} from '@frontend/meeshkan-types';
import { commandsToSteps } from '../../utils/transform-steps';
import {
	Box,
	Flex,
	useColorModeValue,
	Text,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Heading,
	Divider,
	ModalBody,
	Button,
	LightMode,
	ModalFooter,
	FormControl,
	Select,
	FormLabelProps,
	FormLabel,
	Input,
	Stack,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Checkbox,
	Tooltip,
	Textarea,
	List,
} from '@chakra-ui/react';
import { UserContext } from '../../utils/user';
import { createSlug } from '../../utils/createSlug';
import Link from 'next/link';
import { KeyIcon } from '@frontend/chakra-theme';
import { InfoOutlineIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { UserStory } from '@frontend/meeshkan-types';
import { createStep } from '../../utils/user-story-helpers';
import { mutateCallback } from 'swr/dist/types';
import { usePositionReorder } from '../../hooks/use-position-reorder';

type UserStoryResponse = {
	userStory: UserStory;
};

type MutateUserStory = (
	data?:
		| UserStoryResponse
		| Promise<UserStoryResponse>
		| mutateCallback<UserStoryResponse>,
	shouldRevalidate?: boolean
) => Promise<UserStoryResponse | undefined>;

type StepListProps = {
	steps: ScriptCommandListResponse['items'];
	selectedStep: Number;
	mutateUserStory: MutateUserStory;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
	requiresAuthentication: boolean;
	userStoryId: string;
};

const Label = ({
	text,
	short,
	tooltip,
	optional = false,
}: {
	text: string;
	short?: boolean;
	tooltip?: string;
	optional?: boolean;
} & FormLabelProps) => {
	const formLabelColor = useColorModeValue('gray.500', 'gray.400');
	const tooltipIconColor = useColorModeValue('gray.400', 'gray.500');

	return (
		<FormLabel
			mb={2}
			htmlFor="title"
			textTransform="uppercase"
			color={formLabelColor}
			fontSize="10px"
			minW={short ? 'fit-content' : '80px'}
			lineHeight="1.4"
		>
			{text}
			{tooltip && (
				<Tooltip label={tooltip} placement="bottom-start">
					<InfoOutlineIcon ml={2} lineHeight="short" color={tooltipIconColor} />
				</Tooltip>
			)}
			{optional && (
				<Box
					as="span"
					fontStyle="italic"
					ml={2}
					textTransform="lowercase"
					color={tooltipIconColor}
				>
					optional
				</Box>
			)}
		</FormLabel>
	);
};

type AddStepProps = {
	userStoryId: string;
	steps: ScriptCommandListResponse['items'];
	mutateUserStory: MutateUserStory;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
};

const AddStep = ({
	steps,
	userStoryId,
	mutateUserStory,
	setSelectedStep,
}: AddStepProps) => {
	const { idToken } = useContext(UserContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [saving, setSaving] = useState(false);
	const {
		register,
		handleSubmit,
	} = useForm<UserStories_ScriptCommandCreateInput>();
	const [command, setCommand] = useState('click');

	const borderColor = useColorModeValue('gray.300', 'gray.700');
	const modalBackground = useColorModeValue('white', 'gray.800');
	const modalHeaderColor = useColorModeValue('gray.900', 'white');
	const groupBorderColor = useColorModeValue('gray.100', 'gray.800');
	const cardBackground = useColorModeValue('white', 'gray.900');

	const onSubmit = async (
		formData: UserStories_ScriptCommandCreateInput
	): Promise<void> => {
		setSaving(true);
		const userStory = await createStep(
			userStoryId,
			{
				...formData,
				sIndex: steps.length,
			},
			idToken
		);
		mutateUserStory({ userStory });
		setSelectedStep(null);
		setSaving(false);
		onClose();
	};

	return (
		<>
			<Flex
				cursor="pointer"
				align="center"
				onClick={onOpen}
				sx={{
					':hover #add-step': {
						backgroundColor: cardBackground,
						boxShadow: 'sm',
						borderColor: 'transparent',
					},
				}}
			>
				<Flex
					justify="center"
					align="center"
					borderRadius="full"
					h={6}
					w={6}
					minW={6}
					fontSize="sm"
					mt={2}
					mr={4}
					id="add-step"
				>
					<PlusSquareIcon boxSize={3} />
				</Flex>
				<Box
					d="flex"
					p={3}
					borderRadius="lg"
					w="full"
					border="1px dashed"
					borderColor={borderColor}
					id="add-step"
				>
					<Text
						flex="1"
						fontWeight="400"
						lineHeight="1.4"
						fontSize="md"
						wordBreak="break-all"
					>
						Add a new step
					</Text>
				</Box>
			</Flex>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				motionPreset="slideInBottom"
				size="2xl"
				scrollBehavior="inside"
			>
				<ModalOverlay />
				<ModalContent
					backgroundColor={modalBackground}
					borderRadius="lg"
					as="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<ModalHeader px={6} pt={4}>
						<Heading
							fontSize="xl"
							mb={2}
							as="h3"
							lineHeight="tall"
							color={modalHeaderColor}
						>
							Add a new step
						</Heading>
						{/* <Text fontWeight="400" fontSize="md">
							Subtitle will go here once I take the time to write one up.
						</Text> */}
					</ModalHeader>
					<Divider />
					<ModalCloseButton mt={2} />
					<ModalBody as={Stack} spacing={4} p={6}>
						<FormControl isRequired>
							<Label
								text="Command"
								tooltip="What action will this step be doing?"
							/>
							<Select
								name="command"
								value={command}
								onChange={(event) => setCommand(event.target.value)}
								ref={register}
								size="sm"
								borderRadius="md"
								fontFamily="mono"
							>
								<optgroup label="Events">
									<option>open</option>
									<option>set viewport size</option>
									<option>click</option>
									<option>type</option>
									<option>drag and drop</option>
									<option>scroll</option>
									<option>execute javascript</option>
									<option>mouse over</option>
									<option disabled>api request</option>
								</optgroup>
								<optgroup label="Assertions"></optgroup>
							</Select>
						</FormControl>
						{(command === 'click' ||
							command === 'type' ||
							command === 'mouse over' ||
							command === 'drag and drop') && (
							<FormControl isRequired>
								<Label
									text="Xpath"
									tooltip="We recommend using the full xpath rather than the short as it's more specific."
								/>
								<Input
									name="xpath"
									ref={register}
									size="sm"
									borderRadius="md"
									fontFamily="mono"
									placeholder="/html/body/div[1]/div/nav/div/div[2]/div/div[2]/a[2]"
								/>
							</FormControl>
						)}

						{(command === 'click' ||
							command === 'type' ||
							command === 'mouse over') && (
							<FormControl>
								<Label text="selector" optional />
								<Input
									name="selector"
									ref={register}
									size="sm"
									borderRadius="md"
									fontFamily="mono"
									placeholder=".css-94mt2v:nth-child(2)"
								/>
							</FormControl>
						)}

						{(command === 'click' || command === 'mouse over') && (
							<FormControl>
								<Label
									text="Inner content"
									tooltip="What text does this item have in it? This will be used for context when reading through your steps."
									optional
								/>
								<Input
									name="innerText"
									ref={register}
									size="sm"
									borderRadius="md"
									fontFamily="mono"
									placeholder="Click me"
								/>
							</FormControl>
						)}

						{(command === 'set viewport size' ||
							command === 'mouse over' ||
							command === 'drag and drop') && (
							<FormControl isRequired>
								<Box mb="-8px" ml={3}>
									<Label
										text={
											command === 'set viewport size' ? 'Size' : 'Coordinates'
										}
									/>
								</Box>
								<Flex
									borderLeft="1px solid"
									borderRight="1px solid"
									borderBottom="1px solid"
									borderColor={groupBorderColor}
									borderRadius="md"
									p={4}
								>
									<Flex align="center" mr={4}>
										<Label text="X" short />
										<NumberInput
											name="xCoordinate"
											ref={register}
											size="sm"
											borderRadius="md"
											fontFamily="mono"
										>
											<NumberInputField borderRadius="md" />
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</Flex>

									<Flex align="center">
										<Label text="Y" short />
										<NumberInput
											name="yCoordinate"
											ref={register}
											size="sm"
											borderRadius="md"
											fontFamily="mono"
										>
											<NumberInputField borderRadius="md" />
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</Flex>
								</Flex>
							</FormControl>
						)}

						{command === 'scroll' && (
							<FormControl isRequired>
								<Box mb="-8px" ml={3}>
									<Label text="Scroll" short />
								</Box>
								<Flex
									borderLeft="1px solid"
									borderRight="1px solid"
									borderBottom="1px solid"
									borderColor={groupBorderColor}
									borderRadius="md"
									p={4}
								>
									<Flex align="center" mr={4}>
										<Label
											text="Top"
											short
											tooltip="How far from the top should be scrolled?"
										/>
										<NumberInput
											name="scrollTop"
											ref={register}
											size="sm"
											borderRadius="md"
											fontFamily="mono"
										>
											<NumberInputField borderRadius="md" />
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</Flex>

									<Flex align="center">
										<Label
											text="Left"
											short
											tooltip="How far from the left should be scrolled?"
										/>
										<NumberInput
											name="scrollLeft"
											ref={register}
											size="sm"
											borderRadius="md"
											fontFamily="mono"
										>
											<NumberInputField borderRadius="md" />
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</Flex>
								</Flex>
							</FormControl>
						)}

						{(command === 'open' || command === 'type') && (
							<FormControl isRequired>
								<Label
									text={command === 'open' ? 'URL' : 'Value'}
									tooltip={command === 'type' ? 'What is typed?' : null}
								/>
								<Input
									fontFamily="mono"
									name="value"
									ref={register}
									size="sm"
									borderRadius="md"
									placeholder={
										command === 'open'
											? 'https://example.com'
											: command === 'type'
											? 'contact@meeshkan.com'
											: null
									}
								/>
							</FormControl>
						)}

						{command === 'drag and drop' && (
							<>
								<FormControl isRequired>
									<Label
										text="Destination xpath"
										tooltip="What is the structure when the element is dropped"
									/>
									<Input
										name="destinationXpath"
										ref={register}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
										placeholder="/html/body/div[1]/div/nav/div/div[2]/div/div[2]/a[2]"
									/>
								</FormControl>

								<FormControl isRequired>
									<Box mb="-8px" ml={3}>
										<Label text="Destination coordinates" />
									</Box>
									<Flex
										borderLeft="1px solid"
										borderRight="1px solid"
										borderBottom="1px solid"
										borderColor={groupBorderColor}
										borderRadius="md"
										p={4}
									>
										<Flex align="center" mr={4}>
											<Label text="X" short />
											<NumberInput
												name="xCoordinate"
												ref={register}
												size="sm"
												borderRadius="md"
												fontFamily="mono"
											>
												<NumberInputField borderRadius="md" />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
										</Flex>

										<Flex align="center">
											<Label text="Y" short />
											<NumberInput
												name="yCoordinate"
												ref={register}
												size="sm"
												borderRadius="md"
												fontFamily="mono"
											>
												<NumberInputField borderRadius="md" />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
										</Flex>
									</Flex>
								</FormControl>
							</>
						)}

						{command === 'execute javascript' && (
							<FormControl isRequired>
								<Label
									text="JavaScript"
									tooltip="Any valid JavaScript saved in this field will be executed during a test run."
								/>
								<Textarea
									fontFamily="mono"
									name="value"
									ref={register}
									size="sm"
									borderRadius="md"
									placeholder="MeeshkanError('The text did not match as expected')"
								/>
							</FormControl>
						)}

						{(command === 'click' ||
							command === 'type' ||
							command === 'mouse over') && (
							<FormControl>
								<Label
									text="Page"
									tooltip="Which page does this happen on?"
									optional
								/>
								<Input
									fontFamily="mono"
									name="documentURL"
									ref={register}
									size="sm"
									borderRadius="md"
									placeholder="https://example.com/page-2"
								/>
							</FormControl>
						)}

						<FormControl>
							<Checkbox defaultIsChecked isDisabled>
								<Label
									text="Required step"
									tooltip="Does this step need to pass for the test to continue?"
								/>
							</Checkbox>
						</FormControl>
					</ModalBody>

					<ModalFooter px={6} pb={6} mt={8}>
						<Button colorScheme="gray" mr={6} onClick={onClose}>
							cancel
						</Button>
						<LightMode>
							<Button
								colorScheme="blue"
								type="submit"
								isLoading={saving}
								loadingText="Saving step"
							>
								Add step
							</Button>
						</LightMode>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export const StepList = ({
	steps,
	userStoryId,
	selectedStep,
	mutateUserStory,
	setSelectedStep,
	requiresAuthentication,
}: StepListProps) => {
	const formattedSteps = commandsToSteps(steps);
	const { project } = useContext(UserContext);
	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);
	const { order, updatePosition, updateOrder, setOrder } = usePositionReorder(
		formattedSteps
	);
	if (order.length !== formattedSteps.length) {
		// invoke the hook on add/remove
		setOrder(formattedSteps);
	}
	const secondaryCardColor = useColorModeValue('gray.200', 'gray.700');

	return (
		<>
			{requiresAuthentication ? (
				project?.configuration?.logInStory ? (
					<Link
						href={`/${slugifiedProjectName}/test-cases/${project?.configuration?.logInStory?.id}`}
					>
						<a>
							<Flex
								align="center"
								justify="center"
								fontSize="sm"
								backgroundColor={secondaryCardColor}
								borderRadius="md"
								p={3}
								mb={4}
							>
								{' '}
								<KeyIcon mr={3} />
								Log in flow
							</Flex>
						</a>
					</Link>
				) : (
					<Link href={`/${slugifiedProjectName}/settings`}>
						<a>
							<Flex
								align="center"
								justify="center"
								fontSize="sm"
								border="1px dashed"
								borderColor="gray.400"
								borderRadius="md"
								p={3}
							>
								A log in flow is needed
							</Flex>
						</a>
					</Link>
				)
			) : null}

			<List>
				{order.map((step, index) => (
					<SideStep
						key={step.sIndex}
						setOrder={setOrder}
						order={order}
						userStoryId={userStoryId}
						stepName={step.text}
						stepNumber={step.sIndex + 1}
						scriptCommand={step.scriptCommand}
						selectedStep={selectedStep}
						setSelectedStep={setSelectedStep}
						updateOrder={updateOrder}
						updatePosition={updatePosition}
						index={index}
					/>
				))}
				<AddStep
					mutateUserStory={mutateUserStory}
					steps={steps}
					userStoryId={userStoryId}
					setSelectedStep={setSelectedStep}
				/>
			</List>
			<Flex
				align="center"
				justify="center"
				fontSize="sm"
				backgroundColor={secondaryCardColor}
				borderRadius="md"
				mt={4}
				p={3}
			>
				End of test
			</Flex>
		</>
	);
};
