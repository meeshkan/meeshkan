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
	Spacer,
	Box,
	FormLabelProps,
	Checkbox,
	FormControl,
	Heading,
	Divider,
} from '@chakra-ui/react';
import { UserStory } from '@frontend/meeshkan-types';
import { UserContext } from '../../../utils/user';
import { useToaster } from '../../../hooks/use-toaster';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { SaveIcon, TrashIcon } from '@frontend/chakra-theme';

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
	const { project, idToken } = useContext(UserContext);
	const toaster = useToaster();
	const groupBorderColor = useColorModeValue('gray.100', 'gray.800');

	const scriptCommand = userStory.scriptCommands.items.find(
		(scriptCommand) => scriptCommand.sIndex === selectedStep
	);

	// Command field valeus
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

				<Stack as="form" spacing={6}>
					<FormControl>
						<Label text="Command" />
						<Select
							value={command}
							onChange={(e) => setCommand(e.target.value)}
							size="sm"
							borderRadius="md"
							fontFamily="mono"
							isDisabled={
								selectedStep === 0 && scriptCommand?.command === 'open'
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
										value={xpath}
										onChange={(e) => setXpath(e.target.value)}
										size="sm"
										borderRadius="md"
										fontFamily="mono"
									/>
								</FormControl>
								<FormControl>
									<Label text="selector" />
									<Input
										value={selector}
										onChange={(e) => setSelector(e.target.value)}
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
										value={xCoordinate}
										onChange={(e) => setXCoordinate(parseInt(e))}
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
										value={yCoordinate}
										onChange={(e) => setYCoordinate(parseInt(e))}
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
										value={scrollTop}
										onChange={(e) => setScrollTop(parseInt(e))}
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
										value={scrollLeft}
										onChange={(e) => setScrollLeft(parseInt(e))}
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
								value={value}
								onChange={(e) => setValue(e.target.value)}
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
								value={documentURL}
								onChange={(e) => setDocumentURL(e.target.value)}
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
					size="sm"
					colorScheme="blue"
					variant="subtle"
					leftIcon={<SaveIcon />}
				>
					Save changes
				</Button>
				<Button
					size="sm"
					colorScheme="red"
					variant="subtle"
					leftIcon={<TrashIcon />}
				>
					Delete step
				</Button>
			</Stack>
		</Stack>
	);
};
