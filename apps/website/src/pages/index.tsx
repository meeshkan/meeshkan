import React from "react"
import SEO from "../components/molecules/seo"
import { Link as GatsbyLink } from "gatsby"
import {
	Heading,
	Button,
	Text,
	Flex,
	Box,
	Grid,
	useColorModeValue,
	LightMode,
	Spacer,
	List,
	ListItem,
	ListIcon,
	SimpleGrid,
	Code,
	Badge,
	Avatar,
	Link,
} from "@chakra-ui/react"
import { SingleSection } from "../components/organisms/singleSection"
// import { useMixpanel } from "gatsby-plugin-mixpanel"
import { DoubleSection } from "../components/organisms/doubleSection"
import Layout from "../components/templates/layout"
import {
	ActivityIcon,
	CheckSquareIcon,
	CrosshairIcon,
	GitHubIcon,
	StoplightIcon,
	UserIcon,
	VideoIcon,
	WingLogo,
	ZapIcon,
} from "../../theme/icons"
import FeatureCard from "../components/molecules/featureCard"
import Callout from "../components/organisms/callout"
import { StoryStep } from "../components/molecules/sideStep"
import { MockDashboard } from "../components/organisms/home/mockDashboard"
import LeadForm from "../components/molecules/leadForm"
import { VimodjiLogo } from "../components/atoms/vimodjiLogo"

const IndexPage = () => {
	// const mixpanel = useMixpanel()

	return (
		<Layout>
			<SEO
				pageTitle="Automate pre-release QA with Machine Learning. UI Testing Tool"
				pageDescription="Always release confidently. Meeshkan uses real user flows from Production to automate testing for PMs and engineers, finding bugs before your users do."
				pageUrl="https://meeshkan.com/"
			/>
			<SingleSection>
				<Heading
					as="h1"
					textStyle="h1"
					mt={8}
					mb={6}
					textAlign={["left", "left", "center"]}
				>
					Stop{" "}
					<Box
						as="span"
						bgGradient={`linear(to-b, ${useColorModeValue(
							"cyan.300",
							"cyan.500"
						)}, ${useColorModeValue("gray.900", "white")})`}
						bgClip="text"
						fontStyle="italic"
					>
						guessing.
					</Box>
					<br />
					Test what matters. <br />
					Release with confidence.
				</Heading>
				<Text
					fontSize={["md", "lg", "xl"]}
					textAlign={["left", "left", "center"]}
					lineHeight="mid"
					maxW="800px"
					mx={["none", "none", "auto"]}
					color={useColorModeValue("gray.600", "gray.300")}
					mb={6}
				>
					Generate UI tests from the production behavior of your customers, and
					objectively validate quality and user experience before releasing
					changes into production.
				</Text>
				<LeadForm formName="Hero" />
			</SingleSection>

			<Spacer h={32} />

			<Box
				as="section"
				maxW="1200px"
				mx="auto"
				py={12}
				px={6}
				backgroundColor={useColorModeValue("gray.100", "gray.800")}
				borderRadius="lg"
				overflow="hidden"
			>
				<Grid
					templateColumns={[
						"repeat(auto-fill, 1fr)",
						"reapeat(auto-fill, 1fr)",
						"reapeat(auto-fill, 1fr)",
						"repeat(2, 1fr)",
					]}
					gap={16}
					gridAutoFlow="dense"
				>
					<Flex
						justifyContent="center"
						gridColumn={["1", "1", "2"]}
						position="relative"
						w="auto"
					>
						<Box
							w="100%"
							h="100%"
							borderRadius="lg"
							mr="-72px"
							background="conic-gradient(from 180deg at 50% 50%, #526EE0 0deg, #52E0C4 139.2deg, #DC1853 285.11deg, #526EE0 320deg)"
							filter="blur(150px)"
							position="absolute"
							top={0}
							left={0}
						/>
						<Box
							backgroundColor={useColorModeValue("white", "gray.900")}
							w="100%"
							h="100%"
							maxH="500px"
							borderRadius="lg"
							mr="-72px"
							zIndex="1"
							p={4}
							overflow="hidden"
						>
							<Flex align="baseline" pb={8}>
								<Text fontSize="lg" fontWeight={900} mr={4} whiteSpace="nowrap">
									User can schedule pickup
								</Text>
								<Badge
									fontWeight={700}
									fontSize="md"
									mr={2}
									textTransform="capitalize"
									borderRadius="md"
									py={1}
									px={2}
								>
									<VideoIcon mr={2} />
									User
								</Badge>
								<Badge
									colorScheme="cyan"
									fontWeight={700}
									fontSize="md"
									textTransform="capitalize"
									borderRadius="md"
									p={1}
								>
									Expected behavior
								</Badge>
							</Flex>

							<StoryStep
								stepName="Load `home` path"
								stepNumber={1}
								subSteps={["Navigate to `/{projectName}/dashboard`"]}
							/>
							<StoryStep
								stepName="Click on add new collection button"
								stepNumber={2}
								subSteps={[
									"Select `div.calendar-create-collect`",
									"Click Button with the innerText of `New Collection`",
								]}
							/>
							<StoryStep
								stepName="Request collection"
								stepNumber={3}
								subSteps={["Input date (0-25 days from today)", "Submit form"]}
							/>
							<StoryStep
								stepName="Successful submission"
								stepNumber={4}
								subSteps={["HTTP status code 200", "Return new collect query"]}
							/>
						</Box>
					</Flex>
					<Box maxWidth={["min-content", "100%"]}>
						<Heading
							as="h2"
							textStyle="h3"
							mb={6}
							fontSize={["xl", "2xl", "3xl"]}
							mr={[4, 8, 0]}
						>
							Focus on creating, not troubleshooting
						</Heading>
						<Text
							textAlign="left"
							fontSize={["md", "lg", "xl"]}
							lineHeight="tall"
							mb={4}
							mr={[4, 8, 0]}
						>
							No one tests better than a user. So let us make some for you. Join
							the first innovation in QA since 1991.
						</Text>

						<List spacing={4} mb={10} fontSize={["sm", "md", "lg"]}>
							<ListItem>
								<ListIcon
									color={useColorModeValue(`cyan.600`, `cyan.200`)}
									as={CheckSquareIcon}
									lineHeight="tall"
								/>
								Real User Flows to recreate in Staging
							</ListItem>
							<ListItem>
								<ListIcon
									color={useColorModeValue(`cyan.600`, `cyan.200`)}
									as={CheckSquareIcon}
									lineHeight="tall"
								/>
								Quantify your confidence to merge with an M-score
							</ListItem>
							<ListItem>
								<ListIcon
									color={useColorModeValue(`cyan.600`, `cyan.200`)}
									as={CheckSquareIcon}
									lineHeight="tall"
								/>
								Machine Learning enabled test runs
							</ListItem>
						</List>
						<LightMode>
							<Button as={GatsbyLink} to="/#callout">
								Start gathering insights
							</Button>
						</LightMode>
					</Box>
				</Grid>
			</Box>

			<Spacer h={32} />

			<SingleSection
				heading="Cut testing time by 80% and ship higher quality products"
				text="Make your whole userbase your QA team. Run comprehensive tests in minutes."
			>
				<SimpleGrid minChildWidth="250px" spacing={8}>
					<Box w="100%">
						<Code
							colorScheme="cyan"
							fontSize="14px"
							fontWeight={600}
							rounded="md"
							p={2}
							minH="auto"
							mb={2}
							mt={4}
						>
							Step 1
						</Code>
						<Heading as="h4" textStyle="h4" mb={4}>
							Record user behavior in production
						</Heading>
						<Text>
							Visualize precisely how your software is used, by tracking &amp;
							recording every user interaction in production.
						</Text>
					</Box>
					<Box w="100%">
						<Code
							colorScheme="cyan"
							fontSize="14px"
							fontWeight={600}
							rounded="md"
							p={2}
							minH="auto"
							mb={2}
							mt={4}
						>
							Step 2
						</Code>
						<Heading as="h4" textStyle="h4" mb={4}>
							Validate grouped user flows
						</Heading>
						<Text>
							Recordings are grouped to show you the most (and least) common
							ways your app is used. Simply verify the flows you want checked
							before merging.
						</Text>
					</Box>
					<Box w="100%">
						<Code
							colorScheme="cyan"
							fontSize="14px"
							fontWeight={600}
							rounded="md"
							p={2}
							minH="auto"
							mb={2}
							mt={4}
						>
							Step 3
						</Code>
						<Heading as="h4" textStyle="h4" mb={4}>
							Meeshkan creates fake users
						</Heading>
						<Text>
							We'll create "users" from your grouped flows, and they're keen to
							get testing! Daily, or per commit, they'll ensure that no core
							systems are down.
						</Text>
					</Box>
					<Box w="100%">
						<Code
							colorScheme="cyan"
							fontSize="14px"
							fontWeight={600}
							rounded="md"
							p={2}
							minH="auto"
							mb={2}
							mt={4}
						>
							Step 4
						</Code>

						<Heading as="h4" textStyle="h4" mb={4}>
							Merge confidently with the Dashboard
						</Heading>
						<Text>
							Get a full overview of your test coverage, with a Confidence Score
							that will tell you if you're ready to merge.
						</Text>
					</Box>
				</SimpleGrid>
			</SingleSection>

			<Spacer h={32} />

			<SingleSection
				heading="Don't just take our word for it!"
				text="See what people have to say about using Meeshkan."
			>
				<SimpleGrid minChildWidth="300px" spacing={8}>
					<Box
						p={4}
						borderRadius="lg"
						backgroundColor={useColorModeValue("gray.100", "gray.800")}
					>
						<Text fontStyle="italic" fontSize="lg">
							"Meeshkan relieves the constant stress of releasing. No more
							manually writing Cypress tests — my team can just focus on writing
							more productive code.”
						</Text>
						<Flex
							direction={["column", "column", "row"]}
							justify="space-between"
							align="center"
							mt={8}
						>
							<Flex align="center" mr={4}>
								<Avatar
									src="https://media.graphcms.com/sWTxkz1TQ76iV9GEga6l"
									size="sm"
									mr={4}
									borderRadius="md"
								/>
								<Text color="gray.500">
									Alexandre Briclot — Product Manager
								</Text>
							</Flex>
							<Link href="https://wing.eu" isExternal>
								<WingLogo w={32} />
							</Link>
						</Flex>
					</Box>
					<Box
						p={4}
						borderRadius="lg"
						backgroundColor={useColorModeValue("gray.100", "gray.800")}
					>
						<Text fontStyle="italic" fontSize="lg">
							"I don’t have to go through time-consuming, manual checklists or
							test writing anymore. With Meeshkan, UI tests are created and run
							automatically for me.”
						</Text>
						<Flex
							direction={["column", "column", "row"]}
							justify={["flex-start", "space-between"]}
							align="center"
							mt={8}
						>
							<Flex align="center" mr={4}>
								<Avatar
									src="https://media.graphcms.com/7H1zpANmQcinYDAXxZVb"
									size="sm"
									mr={4}
									borderRadius="md"
								/>
								<Text color="gray.500">Georgios Spanos — CTO</Text>
							</Flex>
							<Link href="https://vimodji.com/" isExternal>
								<VimodjiLogo />
							</Link>
						</Flex>
					</Box>
				</SimpleGrid>
			</SingleSection>

			<Spacer h={32} />

			<DoubleSection
				heading="Your users are your best testers"
				text="But when they find bugs, they stop being your users and become your competitor’s users. Classic internally run UI tests suck at finding the dealbreaker bugs - test like your real users, and ship with uncrossed fingers 🤞✌️"
			>
				<MockDashboard />
			</DoubleSection>

			<Spacer h={32} />

			<SingleSection
				heading="Release on-time, every time"
				text="Here are some of the other ways Meeshkan guarantees the smoothest release cycle you’ll ever experience."
			>
				<SimpleGrid spacing={8} columns={[1, 2, 3]} mt={12} fontWeight={500}>
					<FeatureCard>
						<ActivityIcon color="cyan.400" boxSize={6} />
						<Text>Health metrics dashboard</Text>
					</FeatureCard>
					<FeatureCard>
						<UserIcon color="cyan.400" boxSize={6} />
						<Text>User generated tests</Text>
					</FeatureCard>
					<FeatureCard>
						<ZapIcon color="cyan.400" boxSize={6} />
						<Text>ML grouped user flows</Text>
					</FeatureCard>
					<FeatureCard>
						<CrosshairIcon color="cyan.400" boxSize={6} />
						<Text>Pinpoint bug introductions</Text>
					</FeatureCard>
					<FeatureCard>
						<GitHubIcon color="cyan.400" boxSize={6} />
						<Text>GitHub checks integration</Text>
					</FeatureCard>
					<FeatureCard>
						<StoplightIcon color="cyan.400" boxSize={6} />
						<Text>Confidence score</Text>
					</FeatureCard>
				</SimpleGrid>
			</SingleSection>

			<Spacer h={32} />

			<Callout heading="Start using Meeshkan today to test in staging like your real users do in production" />

			<Spacer h={[32, 32, "24rem"]} />
		</Layout>
	)
}

export default IndexPage
