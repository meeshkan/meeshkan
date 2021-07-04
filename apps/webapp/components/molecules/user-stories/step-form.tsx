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
} from '@chakra-ui/react';
import { ScriptCommand, UserStory } from '@frontend/meeshkan-types';
import { UserContext } from '../../../utils/user';
import { useToaster } from '../../../hooks/use-toaster';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { SaveIcon, TrashIcon } from '@frontend/chakra-theme';
import { useForm } from 'react-hook-form';
import { updateStep } from 'apps/webapp/utils/user-story-helpers';

type DetailsFormProps = {
	userStory: UserStory;
	selectedStep: number;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
};

const Label = ({
	text,
	short,
}: { text: string; short?: boolean } & FormLabelProps) => {
	const formLabelColor = useColorModeValue('gray.500', 'gray.400');

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
		</FormLabel>
	);
};

export const StepForm = ({
	userStory,
	selectedStep,
	setSelectedStep,
}: DetailsFormProps) => {
	const { idToken } = useContext(UserContext);
	const toaster = useToaster();
	const groupBorderColor = useColorModeValue('gray.100', 'gray.800');
	const { register, handleSubmit } = useForm<ScriptCommand>();

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
	}, [selectedStep]);

	const onSubmit = async (formData: ScriptCommand): Promise<void> => {
		console.log(commandID, formData);
		updateStep(commandID, formData, idToken)
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

				<Stack as="form" id="step-form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
					<FormControl>
						<Label text="Command" />
						<Select
							name="command"
							defaultValue={command}
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

					{scriptCommand?.command === 'set viewport size' && (
						<FormControl>
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
										name="xCoordinate"
										defaultValue={xCoordinate}
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
										defaultValue={yCoordinate}
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
										name="scrollTop"
										defaultValue={scrollTop}
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
									<Label text="Left" short />
									<NumberInput
										name="scrollLeft"
										defaultValue={scrollLeft}
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
					variant="subtle"
					leftIcon={<SaveIcon />}
				>
					Save changes
				</Button>
				<Button
					colorScheme="red"
					variant="subtle"
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
