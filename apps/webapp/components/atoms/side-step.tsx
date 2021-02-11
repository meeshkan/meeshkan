import React from 'react';
import {
	Box,
	Flex,
	Text,
	List,
	ListItem,
	useColorModeValue,
} from '@chakra-ui/react';

type StoryStepProps = {
	stepNumber: number;
	stepName: string;
	subSteps?: Array<string>;
};

export const SideStep = ({
	stepNumber,
	stepName,
	subSteps,
}: StoryStepProps) => {
	return (
		<Box
			px={8}
			pt={stepNumber === 1 ? 4 : 0}
			borderRadius="md"
			_hover={{
				backgroundColor: useColorModeValue('gray.100', 'gray.800'),
			}}
		>
			{stepNumber === 1 ? null : (
				<Box borderLeft="1px solid" borderColor="gray.300" h={4} ml="11.5px" />
			)}
			<Flex>
				<Flex
					justify="center"
					align="center"
					borderRadius="full"
					h={6}
					w={6}
					border="1px solid"
					borderColor="gray.500"
					fontWeight="500"
					mr={4}
				>
					{stepNumber}
				</Flex>
				<Text
					fontWeight="700"
					lineHeight="1"
					color={
						stepName.startsWith('Untitled')
							? useColorModeValue('gray.400', 'gray.500')
							: 'inherit'
					}
				>
					{stepName}
				</Text>
			</Flex>

			<List
				styleType="disc"
				stylePosition="inside"
				pl={6}
				pb={4}
				spacing={2}
				ml="11.5px"
				borderLeft="1px solid"
				borderColor="gray.300"
			>
				{subSteps &&
					subSteps.map((step, index) => (
						<ListItem key={index} lineHeight="1.6">
							{step}
						</ListItem>
					))}
			</List>
		</Box>
	);
};
