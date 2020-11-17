import React from "react"
import {
	Box,
	Heading,
	Flex,
	Button,
	Link as ChakraLink,
	DarkMode,
} from "@chakra-ui/react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

type CalloutProps = {
	heading: string
}

const Callout = ({ heading }: CalloutProps) => {
	const data = useStaticQuery(
		graphql`
			query {
				testFailure: file(relativePath: { eq: "testFailureDark.png" }) {
					childImageSharp {
						fluid(quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`
	)
	return (
		<>
			<Box
				as="section"
				bg="gray.900"
				borderRadius="6px"
				my={16}
				mx="auto"
				maxW={1200}
				position="relative"
				px={8}
				py={8}
			>
				<Heading
					as="h2"
					textStyle="h3"
					color="white"
					mb={6}
					ml={[0, 0, 0, 440, 522]}
					textAlign={["center", "center", "center", "end"]}
				>
					{heading}
				</Heading>
				<Flex justify={["center", "center", "center", "flex-end"]}>
					<Button
						as={ChakraLink}
						target="_blank"
						rel="noopener noreferrer"
						href="https://meetings.hubspot.com/makenna/consultation-with-meeshkan"
						aria-label="Schedule a demo with the Meeshkan team."
					>
						Schedule a demo
					</Button>
				</Flex>
				<Box
					maxW="550px"
					pos="absolute"
					left={0}
					right={0}
					bottom={0}
					boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
					display={["none", "none", "none", "block"]}
					borderBottomLeftRadius="4px"
					overflow="hidden"
				>
					<Img
						fluid={data.testFailure.childImageSharp.fluid}
						alt="A screenshot of the test failure page in the Meeshkan website."
					/>
				</Box>
			</Box>
		</>
	)
}

export default Callout
