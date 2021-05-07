import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
	Box,
	Heading,
	Link,
	Stack,
	Flex,
	Divider,
	IconButton,
	useColorModeValue,
} from "@chakra-ui/react"
import {
	GitHubIcon,
	LinkedInIcon,
	LogoIcon,
	TwitterIcon,
} from "../../../theme/icons"

export function Footer() {
	return (
		<Box
			as="footer"
			bg={useColorModeValue("white", "gray.900")}
			borderTop="1px solid"
			borderTopColor={useColorModeValue("gray.100", "gray.800")}
			p={6}
		>
			<Box maxW="1000px" mx="auto">
				<Flex wrap="wrap" justify="center">
					<Stack my={4} w={["100%", "33%"]}>
						<Heading as="h4" size="md">
							Company
						</Heading>
						<Link
							as={GatsbyLink}
							to="/about-us/"
							aria-label="About the Meeshkan team"
						>
							About us
						</Link>
						<Link
							as={GatsbyLink}
							to="/about-us/jobs/"
							aria-label="Careers the Meeshkan team is hiring for."
						>
							Careers
						</Link>
						<Link
							as={GatsbyLink}
							to="/contact/"
							aria-label="Contact the Meeshkan team"
						>
							Contact
						</Link>
						<Link
							as={GatsbyLink}
							to="/changelog/"
							aria-label="Updates on the development of Meeshkan"
						>
							Changelog
						</Link>
					</Stack>
					<Stack my={4} w={["100%", "33%"]}>
						<Heading as="h4" size="md">
							Resources
						</Heading>

						<Link
							as={GatsbyLink}
							to="/events/confidence-in-your-merge-to-production/"
							aria-label="A landing page for the webinar about confidence merging to production"
						>
							Webinar - Merging to prod
						</Link>
						<Link as={GatsbyLink} to="/blog/" aria-label="Meeshkan's blog">
							Blog
						</Link>
						<Link
							as={GatsbyLink}
							to="/FAQ/"
							aria-label="Frequently asked questions"
						>
							FAQ
						</Link>
					</Stack>
					<Stack my={4} w={["100%", "33%"]}>
						<Heading as="h4" size="md">
							Use cases
						</Heading>
						<Link
							as={GatsbyLink}
							to="/use-cases/staging-environments/"
							aria-label="Staging environments"
						>
							Staging environments
						</Link>
						<Link
							as={GatsbyLink}
							to="/test-graphql/"
							aria-label="A landing page all about testing graphql"
						>
							Testing GraphQL
						</Link>
					</Stack>
				</Flex>
				<Divider
					title="Meeshkan social links"
					borderColor={useColorModeValue("gray.200", "gray.700")}
					my={4}
				/>
				<Flex justifyContent="space-between" align="center">
					<GatsbyLink to="/" aria-label="Meeshkan homepage">
						<LogoIcon
							color={useColorModeValue("gray.900", "white")}
							size="6"
							w="auto"
						/>
					</GatsbyLink>
					<Stack isInline d={["none", "flex"]}>
						{/* @ts-ignore */}
						<IconButton
							as={Link}
							variant="ghost"
							isExternal
							href="https://twitter.com/meeshkan"
							aria-label="Twitter"
							icon={<TwitterIcon />}
							size="sm"
							colorScheme="gray"
						/>
						<IconButton
							as={Link}
							variant="ghost"
							isExternal
							href="https://www.linkedin.com/company/meeshkan/"
							aria-label="LinkedIn"
							icon={<LinkedInIcon />}
							colorScheme="gray"
							size="sm"
						/>
						<IconButton
							as={Link}
							variant="ghost"
							isExternal
							href="https://github.com/meeshkan"
							aria-label="GitHub"
							icon={<GitHubIcon />}
							colorScheme="gray"
							size="sm"
						/>
					</Stack>
				</Flex>
			</Box>
		</Box>
	)
}
