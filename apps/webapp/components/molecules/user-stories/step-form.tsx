import React, { useContext } from 'react';
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
} from '@chakra-ui/react';
import { UserStory } from '@frontend/meeshkan-types';
import { UserContext } from '../../../utils/user';
import { useToaster } from '../../../hooks/use-toaster';

type DetailsFormProps = {
	userStory: UserStory;
	selectedStep: number;
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
			minW={short ? 'fit-content' : '96px'}
		>
			{text}
		</FormLabel>
	);
};

export const StepForm = ({ userStory, selectedStep }: DetailsFormProps) => {
	const { project, idToken } = useContext(UserContext);
	const toaster = useToaster();
	const groupBorderColor = useColorModeValue('gray.100', 'gray.800');

	const scriptCommand = userStory.scriptCommands.items.find(
		(scriptCommand) => scriptCommand.sIndex === selectedStep
	);

	return (
		<Stack spacing={6}>
			<Flex align="center">
				<Label text="Command" />
				<Select
					value={scriptCommand?.command}
					size="sm"
					borderRadius="md"
					fontFamily="mono"
					isDisabled={selectedStep === 0 && scriptCommand?.command === 'open'}
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
			</Flex>
			<Flex align="center">
				<Label text="Xpath" />
				<Input
					value={scriptCommand?.xpath}
					size="sm"
					borderRadius="md"
					fontFamily="mono"
				/>
			</Flex>
			<Flex align="center">
				<Label text="selector" />
				<Input
					value={scriptCommand?.selector}
					size="sm"
					borderRadius="md"
					fontFamily="mono"
				/>
			</Flex>

			<Box>
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
							defaultValue={scriptCommand?.xCoordinate}
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
							defaultValue={scriptCommand?.yCoordinate}
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
			</Box>

			<Box>
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
							defaultValue={scriptCommand?.scrollTop}
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
							defaultValue={scriptCommand?.scrollLeft}
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
			</Box>

			<Flex align="center">
				<Label text="Value" />
				<Input
					fontFamily="mono"
					defaultValue={scriptCommand?.value}
					size="sm"
					borderRadius="md"
				/>
			</Flex>
			<Flex align="center">
				<Label text="Document url" />
				<Input
					fontFamily="mono"
					defaultValue={scriptCommand?.documentURL}
					size="sm"
					borderRadius="md"
				/>
			</Flex>

			<Flex align="center">
				<Checkbox defaultIsChecked isReadOnly>
					<Label text="Required step" />
				</Checkbox>
			</Flex>

			<Spacer size={6} />

			<Button size="sm" colorScheme="red" variant="subtle">
				Delete step
			</Button>
		</Stack>
	);
};
