import React from "react"
import { Box, Heading, Flex, useColorModeValue } from "@chakra-ui/react"
import LeadForm from "../molecules/leadForm"

type CalloutProps = {
	heading: string
}

const Callout = ({ heading }: CalloutProps) => {
	return (
		<>
			<Flex
				maxW="1200px"
				mx="auto"
				justifyContent="center"
				gridColumn={["1", "1", "2"]}
				position="relative"
			>
				<Box
					as="section"
					w="100%"
					h="100%"
					bg={useColorModeValue("gray.100", "gray.900")}
					borderRadius="lg"
					mx="auto"
					maxW={1200}
					p={[4, 4, 8]}
					zIndex="1"
				>
					<Heading
						as="h2"
						textStyle="h2"
						id="callout"
						mb={6}
						textAlign="center"
					>
						{heading}
					</Heading>
					<LeadForm formName="callout" />
				</Box>
				<Box
					w="100%"
					h="100%"
					borderRadius="lg"
					background="conic-gradient(from 180deg at 50% 50%, #526EE0 0deg, #52E0C4 139.2deg, #DC1853 285.11deg, #526EE0 360deg)"
					filter="blur(150px)"
					position="absolute"
					top={0}
					left={0}
				/>
			</Flex>
		</>
	)
}

export default Callout
