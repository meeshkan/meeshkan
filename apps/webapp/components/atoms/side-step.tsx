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
	subSteps?: [{ text: string; sIndex: number }];
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
			borderRadius="lg"
			_hover={{
				backgroundColor: useColorModeValue('white', 'gray.900'),
			}}
		>
			<Flex>
				<Box>
					{stepNumber === 1 ? null : (
						<Box
							borderLeft="1px solid"
							borderColor="gray.300"
							h={4}
							ml="11.5px"
						/>
					)}

					<Flex
						justify="center"
						align="center"
						borderRadius="full"
						h={6}
						w={6}
						border="1px solid"
						borderColor="gray.500"
						fontWeight="500"
						fontSize="sm"
						mr={4}
					>
						{stepNumber}
					</Flex>
					<Box
						borderLeft="1px solid"
						borderColor="gray.300"
						h="calc(100% - 24px)"
						ml="11.5px"
					/>
				</Box>
				<Text
					flex="1"
					fontWeight="500"
					lineHeight="1.4"
					fontSize="md"
					py={stepNumber === 1 ? null : 4}
					pb={stepNumber === 1 ? 4 : null}
				>
					{stepName}
				</Text>
			</Flex>
			{subSteps && (
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
					{subSteps.map((step) => (
						<ListItem key={step.sIndex} lineHeight="1.6">
							{step.text}
						</ListItem>
					))}
				</List>
			)}
		</Box>
	);
};
