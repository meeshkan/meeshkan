import React from "react"
import SEO from "../components/molecules/seo"
import {
	Heading,
	Button,
	Text,
	Flex,
	Code,
	Box,
	Link as ChakraLink,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Grid,
	Stack,
	DarkMode,
	useColorModeValue,
} from "@chakra-ui/core"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { graphql, useStaticQuery, Link } from "gatsby"
import { SingleSection } from "../components/organisms/singleSection"
import { useMixpanel } from "gatsby-plugin-mixpanel"
import { DoubleSection } from "../components/organisms/doubleSection"
import Img from "gatsby-image"
import Layout from "../components/templates/layout"
import GenerateTests from "../components/organisms/home/generateTests"
import PrioritizeTests from "../components/organisms/home/prioritizeTests"
import HowDoesMeeshkanWork from "../components/organisms/home/meeshkanWorks"
import Callout from "../components/organisms/callout"

const IndexPage = () => {
	const data = useStaticQuery(
		graphql`
			query {
				stack: file(relativePath: { eq: "stack.png" }) {
					childImageSharp {
						fluid(maxWidth: 1000, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				video: file(relativePath: { eq: "video.png" }) {
					childImageSharp {
						fluid(maxWidth: 300, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				map: file(relativePath: { eq: "dependencyMap.png" }) {
					childImageSharp {
						fluid(maxWidth: 400, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				quality: file(relativePath: { eq: "authQuality.png" }) {
					childImageSharp {
						fluid(maxWidth: 400, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				authSpec: file(relativePath: { eq: "authSpec.png" }) {
					childImageSharp {
						fluid(maxWidth: 1000, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				continuous: file(relativePath: { eq: "continuousTests.png" }) {
					childImageSharp {
						fluid(maxWidth: 1000, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				premium: file(relativePath: { eq: "premiumTest.png" }) {
					childImageSharp {
						fluid(maxWidth: 1000, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`
	)

	const [showImage, setShowImage] = React.useState(
		data.stack.childImageSharp.fluid
	)
	const mixpanel = useMixpanel()

	return (
		<Layout>
			<SEO
				pageTitle="QA testing for GraphQL and REST APIs"
				pageDescription="Meeshkan is an automated testing workflow for your product's GraphQL and REST APIs and it's dependencies."
				pageUrl="https://meeshkan.com/"
			/>
			<SingleSection>
				<Flex
					justify="center"
					mb={3}
					mt={12}
					backgroundColor="gray.900"
					p={2}
					maxW="fit-content"
					mx="auto"
					borderRadius="md"
					color="white"
				>
					<DarkMode>
						<Code
							colorScheme="cyan"
							rounded="sm"
							padding="0px 4px"
							minH="auto"
							mr={4}
							d="flex"
							alignItems="center"
							fontWeight={700}
						>
							Read our report <ArrowForwardIcon ml={2} />
						</Code>
					</DarkMode>
					<ChakraLink as={Link} to="/blog/thinking-about-qa/" mr={4}>
						When to start thinking about QA.
					</ChakraLink>
				</Flex>
				<Heading
					as="h1"
					textStyle="h1"
					mb={6}
					textAlign={["left", "left", "center"]}
				>
					Dynamically generated QA for your product's GraphQL and REST APIs
				</Heading>
				<Text
					textAlign={["left", "left", "center"]}
					fontSize={["md", "lg", "xl"]}
					lineHeight="short"
					mb={6}
				>
					The faster teams move, the harder it gets to write and maintain tests.
					Meeshkan fixes that by on-commit executing thousands of tests on your
					GraphQL/REST API's to keep up with your development team's velocity.
					Using your schema and a touch of NLP, we test critical flows,
					guaranteed to give you confidence in your app. Every commit.
				</Text>
				<Stack
					spacing={[0, 0, 4]}
					direction="row"
					justify="center"
					flexWrap="wrap"
				>
					<Button
						as={ChakraLink}
						// @ts-ignore
						href="https://app.meeshkan.com"
						aria-label="Create a free Meeshkan account."
						mb={[4, 4, 0]}
						onClick={() => {
							mixpanel.track("Clicked a button", {
								to: "https://app.meeshkan.com",
								from: "https://meeshkan.com",
								c2a: "Create a free account - top",
							})
						}}
						w={["100%", "100%", "auto"]}
					>
						Create a free account
					</Button>
					<Button
						as={Link}
						// @ts-ignore
						to="/test-graphql/"
						aria-label="Link to the test graphql page"
						onClick={() => {
							mixpanel.track("Clicked a button", {
								to: "https://meeshkan.com/test-graphql",
								from: "https://meeshkan.com",
								c2a: "Mini GraphQL tester",
							})
						}}
						w={["100%", "100%", "auto"]}
						colorScheme="gray"
					>
						Try the demo
					</Button>
				</Stack>
				{/* <Box maxW="750px" mx="auto">
          <Card>
            <Flex
              justify={["center", "space-between"]}
              align="center"
              display={["block", "block", "flex"]}
            >
              <Box textAlign={["center", "center", "right"]} mr={[0, 0, 8]}>
                <Heading
                  as="h3"
                  fontSize="2xl"
                  fontWeight={900}
                  letterSpacing="wide"
                  mb={4}
                >
                  Watch this demo
                </Heading>
                <Text
                  fontWeight={500}
                  lineHeight="tall"
                  color="gray.700"
                  fontSize="lg"
                >
                  Let's explore how Meeshkan can help you squash killer bugs in
                  your backend services.
                </Text>
              </Box>
              <Box cursor="pointer" onClick={onOpen} mt={[4, 4, 0]}>
                <Img
                  fluid={data.video.childImageSharp.fluid}
                  style={{ width: 240, borderRadius: 2, margin: "0 auto" }}
                  alt="A screen grab from the demo video that pops up when you click it."
                />
              </Box>
              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent backgroundColor="transparent">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/ndMYYxP_Gzs?autoplay=1&cc_load_policy=1"
                    style={{ borderRadius: 2 }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; allowfullscreen"
                  ></iframe>
                </ModalContent>
              </Modal>
            </Flex>
          </Card>
        </Box> */}
			</SingleSection>

			<DoubleSection
				heading="Prioritize your development efforts with filtered bug reports"
				text="Meeshkan prioritizes and sorts bugs so that your engineers know what to tackle first, what to put in the backlog, and what to ignore. Code coverage metrics aren't meaningful without the quality context of what's covered."
			>
				<PrioritizeTests />
			</DoubleSection>

			<DoubleSection
				reverse={true}
				heading="Keeping up with an ever-evolving API is a full-time job"
				text="Someone makes a change to your GraphQL schema, the existing tests become outdated and now you're stuck rewriting your tests. We know because we've been there. Meeshkan uses GraphQL introspection to dynamically generate tests based on your schema."
			>
				<GenerateTests />
			</DoubleSection>

			<SingleSection
				heading="Automate QA testing for GraphQL and REST APIs"
				text="By combining schema introspection, property-based testing, and Natural Language Processing, Meeshkan gives you the confidence that your product's GraphQL or REST APIs are working as expected."
			>
				<Flex justify="center">
					<Button
						as={ChakraLink}
						// @ts-ignore
						href="https://app.meeshkan.com"
						aria-label="Create a free Meeshkan account."
						onClick={() => {
							mixpanel.track("Clicked a button", {
								to: "https://app.meeshkan.com",
								from: "https://meeshkan.com",
								c2a: "Create a free account - bottom",
							})
						}}
						w={["100%", "100%", "auto"]}
					>
						Test your project
					</Button>
				</Flex>
			</SingleSection>

			<SingleSection>
				<Grid
					templateColumns={[
						"reapeat(auto-fill, 1fr)",
						"reapeat(auto-fill, 1fr)",
						"33% 66%",
					]}
					gap={8}
				>
					<Box>
						<Heading as="h2" textStyle="h2" mb={6}>
							Key Features
						</Heading>
						<Accordion allowToggle defaultIndex={[0]}>
							<AccordionItem
								border="none"
								onClick={() => setShowImage(data.stack.childImageSharp.fluid)}
							>
								<AccordionButton
									p={4}
									rounded="md"
									fontSize="md"
									fontWeight={600}
									_expanded={{
										color: useColorModeValue("gray.900", "white"),
										bg: useColorModeValue("gray.50", "gray.800"),
										fontWeight: 900,
										roundedBottom: 0,
									}}
									_hover={{
										bg: useColorModeValue("gray.100", "gray.700"),
									}}
								>
									<Box flex="1" textAlign="left">
										REST Compatible
									</Box>
									<AccordionIcon color="gray.300" />
								</AccordionButton>
								<AccordionPanel
									pb={4}
									bg={useColorModeValue("gray.50", "gray.800")}
									roundedBottom="md"
									lineHeight="1.4"
								>
									Meeshkan also works for your REST APIs by generating tests
									with an OpenAPI specification and a little NLP. If you don't
									have an OpenAPI spec, we'll point you to the resources to
									create one.
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem
								border="none"
								onClick={() =>
									setShowImage(data.continuous.childImageSharp.fluid)
								}
							>
								<AccordionButton
									p={4}
									rounded="md"
									fontSize="md"
									fontWeight={600}
									_expanded={{
										color: useColorModeValue("gray.900", "white"),
										bg: useColorModeValue("gray.50", "gray.800"),
										fontWeight: 900,
										roundedBottom: 0,
									}}
									_hover={{
										bg: useColorModeValue("gray.100", "gray.700"),
									}}
								>
									<Box flex="1" textAlign="left">
										Continuous testing
									</Box>
									<AccordionIcon color="gray.300" />
								</AccordionButton>
								<AccordionPanel
									pb={4}
									bg={useColorModeValue("gray.50", "gray.800")}
									roundedBottom="md"
									lineHeight="1.4"
								>
									Every time you push a commit to GitHub, Meeshkan runs tests to
									check for breaking changes. If something does fail, our GitHub
									integration will notify you and details will be available in
									the Meeshkan webapp.
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem
								border="none"
								onClick={() => setShowImage(data.premium.childImageSharp.fluid)}
							>
								<AccordionButton
									p={4}
									rounded="md"
									fontSize="md"
									fontWeight={600}
									_expanded={{
										color: useColorModeValue("gray.900", "white"),
										bg: useColorModeValue("gray.50", "gray.800"),
										fontWeight: 900,
										roundedBottom: 0,
									}}
									_hover={{
										bg: useColorModeValue("gray.100", "gray.700"),
									}}
								>
									<Box flex="1" textAlign="left">
										Premium audits
									</Box>
									<AccordionIcon color="gray.300" />
								</AccordionButton>
								<AccordionPanel
									pb={4}
									bg={useColorModeValue("gray.50", "gray.800")}
									roundedBottom="md"
									lineHeight="1.4"
								>
									If you're on a Pro plan or higher, Meeshkan provides weekly
									audit reports through the webapp. These audits include a full
									catalog of the bugs found, the failing request, and suggested
									fixes - all sorted by priority.
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem
								border="none"
								onClick={() =>
									setShowImage(data.authSpec.childImageSharp.fluid)
								}
							>
								<AccordionButton
									p={4}
									rounded="md"
									fontSize="md"
									fontWeight={600}
									_expanded={{
										color: useColorModeValue("gray.900", "white"),
										bg: useColorModeValue("gray.50", "gray.800"),
										fontWeight: 900,
										roundedBottom: 0,
									}}
									_hover={{
										bg: useColorModeValue("gray.100", "gray.700"),
									}}
								>
									<Box flex="1" textAlign="left">
										Auth flows
									</Box>
									<AccordionIcon color="gray.300" />
								</AccordionButton>
								<AccordionPanel
									pb={4}
									bg={useColorModeValue("gray.50", "gray.800")}
									roundedBottom="md"
									lineHeight="1.4"
								>
									Our Business plan gives you access to a breakdown of an auth
									flow specification for your API. This enables you to visualize
									and control who has access to certain queries and test those
									endpoints accordingly.
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Box>
					<Box minW="300px" bg="gray.50" borderRadius="md">
						<Img
							fluid={showImage}
							alt="Meeshkan is framework agnostic testing. Showing logos of backend technologies supported such as python, django, elixir, scala, graphql, REST, node.js, ruby on rails, java and more."
						/>
					</Box>
				</Grid>
			</SingleSection>

			<HowDoesMeeshkanWork />

			<Callout heading="How can Meeshkan's automated GraphQL testing save your organization hours of bug fixing?" />
		</Layout>
	)
}

export default IndexPage
