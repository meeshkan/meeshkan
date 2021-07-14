import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { FormLabel } from '@chakra-ui/form-control';
import { Stack, Flex } from '@chakra-ui/layout';
import {
	Input,
	Select,
	Button,
	useColorModeValue,
	NumberInput,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInputField,
	NumberInputStepper,
	Box,
	FormLabelProps,
	Checkbox,
	FormControl,
	Heading,
	Divider,
	Textarea,
	Tooltip,
} from '@chakra-ui/react';
import { ScriptCommand, UserStory } from '@frontend/meeshkan-types';
import { UserContext } from '../../../utils/user';
import { ChevronLeftIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { SaveIcon, TrashIcon } from '@frontend/chakra-theme';
import { useForm } from 'react-hook-form';
import {
	deleteSingleCommand,
	updateManySteps,
	updateStep,
} from '../../../utils/user-story-helpers';
import { mutateCallback } from 'swr/dist/types';

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

type DetailsFormProps = {
	userStory: UserStory;
	selectedStep: number;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
	mutateUserStory: MutateUserStory;
};

const Label = ({
	text,
	short,
	tooltip,
}: { text: string; short?: boolean; tooltip?: string } & FormLabelProps) => {
	const formLabelColor = useColorModeValue('gray.500', 'gray.400');
	const tooltipIconColor = useColorModeValue('gray.400', 'gray.500');

	return (
		<FormLabel
			mb={0}
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
		</FormLabel>
	);
};

export const StepForm = ({
	userStory,
	mutateUserStory,
	selectedStep,
	setSelectedStep,
}: DetailsFormProps) => {
	const { idToken } = useContext(UserContext);
	const groupBorderColor = useColorModeValue('gray.100', 'gray.800');
	const { register, handleSubmit } = useForm<ScriptCommand>();
	const [saving, setSaving] = useState(false);

	const scriptCommand = userStory.scriptCommands.items.find(
		(scriptCommand) => scriptCommand.sIndex === selectedStep
	);

	// Command field valeus
	const [commandID, setCommandID] = useState<string | null>(scriptCommand?.id);
	const [command, setCommand] = useState<string | null>(scriptCommand?.command);
	const [xpath, setXpath] = useState<string | null>(scriptCommand?.xpath);
	const [selector, setSelector] = useState<string | null>(
		scriptCommand?.selector
	);
	const [xCoordinate, setXCoordinate] = useState<number | null>(
		scriptCommand?.xCoordinate
	);
	const [yCoordinate, setYCoordinate] = useState<number | null>(
		scriptCommand?.yCoordinate
	);
	const [scrollTop, setScrollTop] = useState<number | null>(
		scriptCommand?.scrollTop
	);
	const [scrollLeft, setScrollLeft] = useState<number | null>(
		scriptCommand?.scrollLeft
	);
	const [value, setValue] = useState<string | null>(scriptCommand?.value);
	const [documentURL, setDocumentURL] = useState<string | null>(
		scriptCommand?.documentURL
	);
	const [destinationXpath, setDestinationXpath] = useState<string | null>(
		scriptCommand?.destinationXpath
	);
	const [destinationXCoordinate, setDestinationXCoordinate] = useState<
		number | null
	>(scriptCommand?.destinationXCoordinate);
	const [destinationYCoordinate, setDestinationYCoordinate] = useState<
		number | null
	>(scriptCommand?.destinationYCoordinate);

	// Keep the values up to date when selecting a new step
	useEffect(() => {
		setCommandID(scriptCommand?.id);
		setCommand(scriptCommand?.command);
		setXpath(scriptCommand?.xpath);
		setSelector(scriptCommand?.selector);
		setXCoordinate(scriptCommand?.xCoordinate || 0);
		setYCoordinate(scriptCommand?.yCoordinate || 0);
		setScrollTop(scriptCommand?.scrollTop || 0);
		setScrollLeft(scriptCommand?.scrollLeft || 0);
		setValue(scriptCommand?.value);
		setDocumentURL(scriptCommand?.documentURL);
		setDestinationXpath(scriptCommand?.destinationXpath);
		setDestinationXCoordinate(scriptCommand?.destinationXCoordinate || 0);
		setDestinationYCoordinate(scriptCommand?.destinationYCoordinate || 0);
	}, [selectedStep, userStory, mutateUserStory]);

	const onSubmit = async (formData: ScriptCommand) => {
		await setSaving(true);
		await updateStep(
			commandID,
			{
				command: formData?.command,
				xpath: formData?.xpath,
				selector: formData?.selector,
				xCoordinate:
					typeof formData?.xCoordinate === 'string'
						? parseInt(formData.xCoordinate)
						: formData?.xCoordinate,
				yCoordinate:
					typeof formData?.yCoordinate === 'string'
						? parseInt(formData.yCoordinate)
						: formData?.yCoordinate,
				documentURL: formData?.documentURL,
				value: formData?.value,
				scrollTop:
					typeof formData?.scrollTop === 'string'
						? parseInt(formData.scrollTop)
						: formData?.scrollTop,
				scrollLeft:
					typeof formData?.scrollLeft === 'string'
						? parseInt(formData.scrollLeft)
						: formData?.scrollLeft,
				destinationXpath: formData?.destinationXpath,
				destinationXCoordinate:
					typeof formData?.destinationXCoordinate === 'string'
						? parseInt(formData.destinationXCoordinate)
						: formData?.destinationXCoordinate,
				destinationYCoordinate:
					typeof formData?.destinationYCoordinate === 'string'
						? parseInt(formData?.destinationYCoordinate)
						: formData?.destinationYCoordinate,
				innerText: formData?.innerText,
			},
			idToken
		);
		await setSaving(false);
	};

	const onDelete = async () => {
		await deleteSingleCommand(commandID, idToken);
		await updateManySteps(
			userStory.id,
			userStory?.scriptCommands?.items
				.filter((item) => item.sIndex !== selectedStep)
				.map((item) => ({
					filter: { id: item?.id || 'no-id-found' },
					data: {
						sIndex:
							item?.sIndex !== null
								? item.sIndex > selectedStep
									? item.sIndex - 1
									: item.sIndex
								: null,
					},
				})) || [],
			idToken
		);
		mutateUserStory({
			userStory: {
				...userStory,
				scriptCommands: {
					groups: userStory?.scriptCommands?.groups,
					count: userStory?.scriptCommands?.count
						? userStory.scriptCommands.count - 1
						: null,
					items: userStory?.scriptCommands?.items
						.filter((item) => item.sIndex !== selectedStep)
						.map((item) => ({
							...item,
							sIndex:
								item?.sIndex !== null
									? item.sIndex > selectedStep
										? item.sIndex - 1
										: item.sIndex
									: null,
						})),
				},
			},
		});
		setSelectedStep(null);
	};

	return (
		<Stack justify="space-between" h="100%">
			<Box>
				<Flex align="center">
					<ChevronLeftIcon
						cursor="pointer"
						mr={3}
						onClick={() => setSelectedStep(null)}
					/>
					<Heading
						as="h2"
						d="flex"
						alignItems="center"
						fontSize="lg"
						fontWeight="800"
						lineHeight="short"
					>
						{`Step #${selectedStep + 1} details`}
					</Heading>
				</Flex>
				<Divider mt={1} mb={4} />

				<Stack
					as="form"
					id="step-form"
					onSubmit={handleSubmit(onSubmit)}
					spacing={6}
				>
					<FormControl>
						<Label text="Command" />
						<Select
							name="command"
							value={command}
							onChange={(e) => setCommand(e.target.value)}
							ref={register}
							size="sm"
							borderRadius="md"
							fontFamily="mono"
							isDisabled={
								(selectedStep === 0 && scriptCommand?.command === 'open') ||
								(selectedStep === 1 &&
									scriptCommand?.command === 'set viewport size')
							}
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

					{scriptCommand?.command !== 'open' &&
						scriptCommand?.command !== 'set viewport size' &&
						scriptCommand?.command !== 'scroll' &&
						scriptCommand?.command !== 'execute javascript' && (
							<>
								<FormControl>
									<Label text="Xpath" />
									<Input
										name="xpath"
										defaultValue={xpath}
										ref={register}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
									/>
								</FormControl>
								<FormControl>
									<Label text="selector" />
									<Input
										name="selector"
										defaultValue={selector}
										ref={register}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
									/>
								</FormControl>
							</>
						)}

					{(scriptCommand?.command === 'set viewport size' ||
						scriptCommand?.command === 'drag and drop') && (
						<FormControl isRequired>
							<Box mb="-8px" ml={3}>
								<Label text="Coordinates" />
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
										defaultValue={xCoordinate}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
										inputMode="numeric"
									>
										<NumberInputField
											type="number"
											borderRadius="md"
											name="xCoordinate"
											ref={register}
										/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Flex>

								<Flex align="center">
									<Label text="Y" short />
									<NumberInput
										defaultValue={yCoordinate}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
										inputMode="numeric"
									>
										<NumberInputField
											type="number"
											borderRadius="md"
											name="yCoordinate"
											ref={register}
										/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Flex>
							</Flex>
						</FormControl>
					)}

					{scriptCommand?.command === 'scroll' && (
						<FormControl>
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
									<Label text="Top" short />
									<NumberInput
										defaultValue={scrollTop}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
										inputMode="numeric"
									>
										<NumberInputField
											borderRadius="md"
											name="scrollTop"
											ref={register}
										/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Flex>

								<Flex align="center">
									<Label text="Left" short />
									<NumberInput
										defaultValue={scrollLeft}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
										inputMode="numeric"
									>
										<NumberInputField
											borderRadius="md"
											name="scrollLeft"
											ref={register}
										/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Flex>
							</Flex>
						</FormControl>
					)}

					{/* Value is only specified for open, and type events */}
					{(scriptCommand?.command === 'open' ||
						scriptCommand?.command === 'type') && (
						<FormControl>
							<Label text="Value" />
							<Input
								fontFamily="mono"
								name="value"
								defaultValue={value}
								ref={register}
								size="sm"
								borderRadius="md"
							/>
						</FormControl>
					)}

					{scriptCommand?.command === 'drag and drop' && (
						<>
							<FormControl>
								<Label
									text="Destination xpath"
									tooltip="What is the structure when the element is dropped"
								/>
								<Input
									name="destinationXpath"
									defaultValue={destinationXpath}
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
											defaultValue={destinationXCoordinate}
											size="sm"
											borderRadius="md"
											fontFamily="mono"
											inputMode="numeric"
										>
											<NumberInputField
												borderRadius="md"
												name="destinationXCoordinate"
												ref={register}
											/>
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</Flex>

									<Flex align="center">
										<Label text="Y" short />
										<NumberInput
											size="sm"
											borderRadius="md"
											fontFamily="mono"
											defaultValue={destinationYCoordinate}
											inputMode="numeric"
										>
											<NumberInputField
												name="destinationYCoordinate"
												ref={register}
												borderRadius="md"
											/>
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

					{scriptCommand?.command === 'type' ||
					scriptCommand?.command === 'click' ||
					scriptCommand?.command === 'scroll' ||
					scriptCommand?.command === 'drag and drop' ||
					scriptCommand?.command === 'mouse over' ? (
						<FormControl>
							<Label text="Page" />
							<Input
								fontFamily="mono"
								name="documentURL"
								defaultValue={documentURL}
								ref={register}
								size="sm"
								borderRadius="md"
							/>
						</FormControl>
					) : null}

					{scriptCommand?.command === 'execute javascript' && (
						<FormControl isRequired>
							<Label
								text="JavaScript"
								tooltip="Any valid JavaScript saved in this field will be executed during a test run."
							/>
							<Textarea
								fontFamily="mono"
								name="value"
								defaultValue={value}
								ref={register}
								size="sm"
								borderRadius="md"
								placeholder="MeeshkanError('The text did not match as expected')"
							/>
						</FormControl>
					)}

					<FormControl>
						<Checkbox defaultIsChecked isDisabled>
							<Label text="Required step" />
						</Checkbox>
					</FormControl>
				</Stack>
			</Box>

			<Stack spacing={4}>
				<Button
					type="submit"
					form="step-form"
					colorScheme="blue"
					size="sm"
					leftIcon={<SaveIcon />}
					isLoading={saving}
					loadingText="Saving changes"
				>
					Save changes
				</Button>
				<Button
					colorScheme="red"
					onClick={onDelete}
					variant="subtle"
					size="sm"
					leftIcon={<TrashIcon />}
					isDisabled={
						(selectedStep === 0 && scriptCommand?.command === 'open') ||
						(selectedStep === 1 &&
							scriptCommand?.command === 'set viewport size')
					}
				>
					Delete step
				</Button>
			</Stack>
		</Stack>
	);
};
