import React from "react"
import { SimpleGrid, Box, Code, Heading, Text } from "@chakra-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { SingleSection } from "../singleSection"

const HowDoesMeeshkanWork = () => {
	const data = useStaticQuery(
		graphql`
			query {
				authorize: file(relativePath: { eq: "githubAuthorize.png" }) {
					childImageSharp {
						fluid(maxWidth: 400, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				test: file(relativePath: { eq: "testLog.png" }) {
					childImageSharp {
						fluid(maxWidth: 400, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				vulnerability: file(relativePath: { eq: "vulnerability.png" }) {
					childImageSharp {
						fluid(maxWidth: 400, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`
	)
	return (
		<>
			<SingleSection heading="Test automation for your GraphQL app">
				<SimpleGrid columns={[1, 1, 3]} gridGap={8} flexWrap="wrap">
					<Box>
						<Img
							fluid={data.authorize.childImageSharp.fluid}
							alt="A screenshot of authorizing Meeshkan with Github"
						/>
						<Code
							colorScheme="cyan"
							fontSize="14px"
							fontWeight={600}
							rounded="sm"
							padding="0px 4px"
							minH="auto"
							mb={2}
							mt={4}
						>
							Step 1
						</Code>
						<Heading as="h4" textStyle="h4" mb={4}>
							Choose a repository
						</Heading>
						<Text fontSize={["md", "md", "lg"]} lineHeight="tall">
							Authorize Meeshkan on GitHub, choose a repository to test, and set
							up your base configuration. That’s all you need to do to get
							started. Test runs will be triggered on every commit!
						</Text>
					</Box>
					<Box>
						<Img
							fluid={data.test.childImageSharp.fluid}
							alt="An illustration of the test log using pieces of the Meeshkan web app."
						/>
						<Code
							colorScheme="cyan"
							fontSize="14px"
							fontWeight={600}
							rounded="sm"
							padding="0px 4px"
							minH="auto"
							mb={2}
							mt={4}
						>
							Step 2
						</Code>
						<Heading as="h4" textStyle="h4" mb={4}>
							Continuous testing with every commit
						</Heading>
						<Text fontSize={["md", "md", "lg"]} lineHeight="tall">
							Meeshkan naturally fits into your existing workflow by testing as
							you push commits to GitHub. Imagine Netlify, but for automated
							testing.
						</Text>
					</Box>
					<Box>
						<Img
							fluid={data.vulnerability.childImageSharp.fluid}
							alt="An illustration of a bug found using pieces of the Meeshkan web app."
						/>
						<Code
							colorScheme="cyan"
							fontSize="14px"
							fontWeight={600}
							rounded="sm"
							padding="0px 4px"
							minH="auto"
							mb={2}
							mt={4}
						>
							Step 3
						</Code>
						<Heading as="h4" textStyle="h4" mb={4}>
							Fix vulnerabilities in your app
						</Heading>
						<Text fontSize={["md", "md", "lg"]} lineHeight="tall">
							When tests fail, your configuration can block a branch from
							merging, direct a developer to the point of failure, and see the
							highlight the highest priority bugs to tackle first.
						</Text>
					</Box>
				</SimpleGrid>
			</SingleSection>
		</>
	)
}

export default HowDoesMeeshkanWork
