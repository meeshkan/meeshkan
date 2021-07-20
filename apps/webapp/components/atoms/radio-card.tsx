import React from 'react';
import {
	Box,
	Flex,
	Text,
	HStack,
	RadioProps,
	useRadio,
	useRadioGroup,
	useColorModeValue,
} from '@chakra-ui/react';
import { ChromeLogoIcon, MeeshkanIcon } from '@frontend/chakra-theme';
import { transparentize } from '@chakra-ui/theme-tools';

const RadioCard = (props: RadioProps) => {
	const { getInputProps, getCheckboxProps } = useRadio(props);
	const input = getInputProps();
	const checkbox = getCheckboxProps();
	const transparentBlue = transparentize('blue.200', 0.12);
	const blueAccent = useColorModeValue('blue.600', 'blue.400');

	// console.log(props);

	return (
		<Box as="label" w="full">
			<input {...input} />
			<Flex
				{...checkbox}
				direction="column"
				align="center"
				justify="space-between"
				cursor="pointer"
				borderWidth="2px"
				borderRadius="md"
				boxShadow="sm"
				_checked={{
					bg: transparentBlue,
					color: blueAccent,
					borderColor: blueAccent,
				}}
				p={4}
				h="150px"
				w="full"
			>
				{props.children}
				<Box
					boxSize={5}
					border="2px solid"
					borderRadius="full"
					d="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Box
						boxSize={3}
						border="none"
						borderRadius="full"
						backgroundColor={props.isChecked ? blueAccent : 'transparent'}
					/>
				</Box>
			</Flex>
		</Box>
	);
};

type RadioGroupProps = {
	options: string[];
	setRadio: (value: undefined) => void;
};

export const RadioGroup = ({ options, setRadio }: RadioGroupProps) => {
	const headingColor = useColorModeValue('gray.900', 'white');

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'radioGroup',
		defaultValue: options[0],
		onChange: setRadio,
	});

	const group = getRootProps();

	return (
		<HStack spacing={8} {...group}>
			{options.map((value: string) => {
				// @ts-ignore
				const radio = getRadioProps({ value });
				return (
					<RadioCard key={value} {...radio}>
						<>
							{value === 'Manually' ? (
								<ChromeLogoIcon mb={4} boxSize={8} />
							) : value === 'Automatically' ? (
								<MeeshkanIcon mb={4} boxSize={8} color="red.500" />
							) : value === 'Both' ? (
								<Flex align="center" mb={4}>
									<ChromeLogoIcon boxSize={8} />
									<Text>+</Text>
									<MeeshkanIcon boxSize={8} color="red.500" />
								</Flex>
							) : null}
							<Text fontSize="xl" fontWeight="800" color={headingColor}>
								{value}
							</Text>
						</>
					</RadioCard>
				);
			})}
		</HStack>
	);
};
