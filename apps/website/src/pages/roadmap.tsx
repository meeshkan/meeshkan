import React from "react"
import {
	SimpleGrid,
	Text,
	Heading,
	Flex,
	Badge,
	Box,
	Code,
	Stack,
	List,
	ListItem,
	Button,
	FormControl,
	FormLabel,
	Input,
	useColorModeValue,
	CircularProgress,
	CircularProgressLabel,
	useColorMode,
} from "@chakra-ui/core"
import { SingleSection } from "../components/organisms/singleSection"
import Layout from "../components/templates/layout"
import { graphql, useStaticQuery } from "gatsby"
import SEO from "../components/molecules/seo"
import { UniversalLink } from "../components/atoms/UniversalLink"

type LinkProps = {
	url: string
	label: string
}

type MilestoneProps = {
	title: string
	description: string
	state: string
	scope?: number
	completedScope?: number
	link?: Array<LinkProps>
}

const Milestone = ({
	title,
	description = "",
	state,
	scope,
	completedScope,
	link,
}: MilestoneProps) => {
	const complete = Math.round(
		((completedScope != null ? completedScope : 0) /
			(scope != null ? scope : 0)) *
			100
	)

	return (
		<Box
			backgroundColor={useColorModeValue("white", "gray.900")}
			borderRadius="md"
			p={4}
			borderLeft="4px solid"
			borderLeftColor={
				state === "started"
					? "cyan.500"
					: state === "completed"
					? "red.500"
					: state === "planned"
					? "blue.500"
					: "gray.500"
			}
		>
			<Heading as="h3" textStyle="h3" mb={2}>
				{title}
			</Heading>
			<Stack isInline mb={4} spacing={4} alignItems="center">
				<Code
					colorScheme={
						state === "started"
							? "cyan"
							: state === "completed"
							? "red"
							: state === "planned"
							? "blue"
							: "gray"
					}
					color={
						state === "started"
							? useColorModeValue("cyan.600", "cyan.300")
							: state === "completed"
							? useColorModeValue("red.600", "red.300")
							: state === "planned"
							? useColorModeValue("blue.600", "blue.300")
							: useColorModeValue("gray.600", "gray.300")
					}
					fontWeight={700}
					h="max-content"
				>
					{state === "started"
						? "In progress"
						: state === "completed"
						? "Completed"
						: state === "planned"
						? "Planned"
						: "Backlog"}
				</Code>
				{complete >= 1 && state !== "completed" ? (
					<Flex align="center">
						<CircularProgress
							value={complete}
							color="cyan.500"
							trackColor={useColorModeValue("cyan.100", "cyan.900")}
							size="20px"
							thickness="16px"
							mr={2}
						/>
						<Text>{complete + "%"}</Text>
					</Flex>
				) : null}
			</Stack>
			<Text mb={4}>{description}</Text>
			{link.length > 1 ? (
				<>
					<Heading as="h4" textStyle="h4" mb={2}>
						Resources:
					</Heading>
					<List styleType="disc">
						{link.map((link, index) => (
							<ListItem key={index}>
								<UniversalLink to={link.url} color="blue.500">
									{link.label}
								</UniversalLink>
							</ListItem>
						))}
					</List>
				</>
			) : null}
		</Box>
	)
}

const Roadmap = () => {
	const { linear } = useStaticQuery(
		graphql`
			query LINEAR_PROJECTS {
				linear {
					team(id: "e8fdda78-0d24-4610-8a79-da08cf64afb6") {
						projects {
							nodes {
								name
								description
								state
								targetDate
								scopeHistory
								completedScopeHistory
								links {
									nodes {
										label
										url
									}
								}
							}
						}
					}
				}
			}
		`
	)

	// (Q1) starts on January 1 to March 3
	// (Q2) goes through April 4 to June 6
	// (Q3) is from July 7 to September 9
	// (Q4) is from October 10 to December 12

	const Q4_2020 = linear.team.projects.nodes.filter((project) =>
		project.targetDate !== null
			? project.targetDate.startsWith("2020-10") ||
			  project.targetDate.startsWith("2020-11") ||
			  project.targetDate.startsWith("2020-12")
			: null
	)
	const Q1_2021 = linear.team.projects.nodes.filter((project) =>
		project.targetDate !== null
			? project.targetDate.startsWith("2021-01") ||
			  project.targetDate.startsWith("2021-02") ||
			  project.targetDate.startsWith("2021-03")
			: null
	)
	const Q2_2021 = linear.team.projects.nodes.filter((project) =>
		project.targetDate !== null
			? project.targetDate.startsWith("2021-04") ||
			  project.targetDate.startsWith("2021-05") ||
			  project.targetDate.startsWith("2021-06")
			: null
	)
	const Q3_2021 = linear.team.projects.nodes.filter((project) =>
		project.targetDate !== null
			? project.targetDate.startsWith("2021-07") ||
			  project.targetDate.startsWith("2021-08") ||
			  project.targetDate.startsWith("2021-09")
			: null
	)
	const backlog = linear.team.projects.nodes.filter(
		(project) => project.targetDate === null && project.state !== "canceled"
	)

	return (
		<Layout>
			<SEO
				pageTitle="Meeshkan Roadmap"
				pageDescription="The Meeshkan roadmap communicating where we are headed as a product."
				pageUrl="https://meeshkan.com/roadmap/"
			/>
			<SingleSection>
				<Flex justify="center" mb={3} mt={12}>
					<Badge
						colorScheme="cyan"
						letterSpacing="widest"
						fontSize="14px"
						fontWeight={600}
						rounded="sm"
						padding="0px 4px"
						minH="auto"
					>
						MEESHKAN - ROADMAP
					</Badge>
				</Flex>
				<Heading
					as="h1"
					textStyle="h1"
					mb={6}
					textAlign={["left", "left", "center"]}
				>
					We’ve got a lot planned!
				</Heading>
				<Text
					textAlign={["left", "left", "center"]}
					fontSize={["lg", "xl", "2xl"]}
					lineHeight="short"
					mb={4}
				>
					This roadmap is directly connected to our project management software.
					Our roadmap is serious, not just for show!
				</Text>

				<Flex
					as="form"
					action="/success/"
					name="roadmap-updates"
					data-netlify="true"
					method="post"
					data-netlify-honeypot="bot-field"
					direction={["column", "column", "row"]}
					justify="center"
					alignItems="flex-end"
				>
					<input type="hidden" name="bot-field" />
					<input type="hidden" name="form-name" value="roadmap-updates" />
					<FormControl
						isRequired
						mr={[0, 0, 4]}
						mb={[4, 4, 0]}
						w="100%"
						maxW={["full", "full", "400px"]}
					>
						<FormLabel htmlFor="email" fontWeight={700}>
							Email
						</FormLabel>
						<Input
							type="email"
							name="email"
							aria-label="Enter your business email"
							placeholder="Your email"
							fontWeight={500}
						/>
					</FormControl>
					<Button type="submit" w={["100%", "100%", "auto"]}>
						Recieve updates
					</Button>
				</Flex>
			</SingleSection>

			<SingleSection>
				<Box
					padding={8}
					backgroundColor={useColorModeValue("gray.50", "gray.800")}
					borderRadius="md"
					mb={8}
				>
					<Heading as="h2" fontSize="2xl" mb={4} fontFamily="mono">
						Q4 2020
					</Heading>
					<SimpleGrid columns={[1, 1, 2]} spacing={8}>
						{Q4_2020.map((project, index) => (
							<Milestone
								key={index}
								title={project.name}
								description={project.description}
								state={project.state}
								scope={project.scopeHistory.slice(-1)[0]}
								completedScope={project.completedScopeHistory.slice(-1)[0]}
								link={project.links.nodes}
							/>
						))}
					</SimpleGrid>
				</Box>

				{Q1_2021.length >= 1 ? (
					<Box
						padding={8}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						mb={8}
					>
						<Heading as="h2" fontSize="2xl" mb={4} fontFamily="mono">
							Q1 2021
						</Heading>
						<SimpleGrid columns={[1, 1, 2]} spacing={8}>
							{Q1_2021.map((project, index) => (
								<Milestone
									key={index}
									title={project.name}
									description={project.description}
									state={project.state}
									scope={project.scopeHistory.slice(-1)[0]}
									completedScope={project.completedScopeHistory.slice(-1)[0]}
									link={project.links.nodes}
								/>
							))}
						</SimpleGrid>
					</Box>
				) : null}

				{Q2_2021.length >= 1 ? (
					<Box
						padding={8}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						mb={8}
					>
						<Heading as="h2" fontSize="2xl" mb={4} fontFamily="mono">
							Q2 2021
						</Heading>
						<SimpleGrid columns={[1, 1, 2]} spacing={8}>
							{Q2_2021.map((project, index) => (
								<Milestone
									key={index}
									title={project.name}
									description={project.description}
									state={project.state}
									scope={project.scopeHistory.slice(-1)[0]}
									completedScope={project.completedScopeHistory.slice(-1)[0]}
									link={project.links.nodes}
								/>
							))}
						</SimpleGrid>
					</Box>
				) : null}

				{Q3_2021.length >= 1 ? (
					<Box
						padding={8}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						mb={8}
					>
						<Heading as="h2" fontSize="2xl" mb={4} fontFamily="mono">
							Q3 2020
						</Heading>
						<SimpleGrid columns={[1, 1, 2]} spacing={8}>
							{Q3_2021.map((project, index) => (
								<Milestone
									key={index}
									title={project.name}
									description={project.description}
									state={project.state}
									scope={project.scopeHistory.slice(-1)[0]}
									completedScope={project.completedScopeHistory.slice(-1)[0]}
									link={project.links.nodes}
								/>
							))}
						</SimpleGrid>
					</Box>
				) : null}

				{backlog.length >= 1 ? (
					<Box
						padding={8}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						borderRadius="md"
						mb={8}
					>
						<Heading as="h2" fontSize="2xl" mb={4} fontFamily="mono">
							Backlog
						</Heading>
						<SimpleGrid columns={[1, 1, 2]} spacing={8}>
							{backlog.map((project, index) => (
								<Milestone
									key={index}
									title={project.name}
									description={project.description}
									state={project.state}
									scope={project.scopeHistory.slice(-1)[0]}
									completedScope={project.completedScopeHistory.slice(-1)[0]}
									link={project.links.nodes}
								/>
							))}
						</SimpleGrid>
					</Box>
				) : null}
			</SingleSection>
		</Layout>
	)
}

export default Roadmap
