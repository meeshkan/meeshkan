import React from "react"
import { Box, Flex, Text, List, ListItem } from "@chakra-ui/react"

type StoryStepProps = {
	stepNumber: number
	stepName: string
	subSteps?: Array<string>
}

export const StoryStep = ({
	stepNumber,
	stepName,
	subSteps,
}: StoryStepProps) => {
	return (
		<Box px={8} pt={stepNumber === 1 ? 4 : 0} borderRadius="md">
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
					fontWeight={500}
					mr={4}
				>
					{stepNumber}
				</Flex>
				<Text fontWeight={700} lineHeight="1">
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
	)
}
