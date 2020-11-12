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
	Button,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/core"
import {
	GitHubIcon,
	LinkedInIcon,
	LogoIcon,
	MoonIcon,
	SunIcon,
	TwitterIcon,
} from "../../../theme/icons"

export function Footer() {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Box as="footer" bg={useColorModeValue("gray.50", "gray.800")} p={6}>
			<Box maxW="1000px" mx="auto">
				<Flex wrap="wrap" justify="center">
					<Stack my={4} w={["100%", "25%"]}>
						<Heading as="h4" size="md">
							Company
						</Heading>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/about/"
							aria-label="About the Meeshkan team"
						>
							About us
						</Link>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/contact/"
							aria-label="Contact the Meeshkan team"
						>
							Contact
						</Link>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/pricing/"
							aria-label="Meeshkan product pricing"
						>
							Pricing
						</Link>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/docs/terms-and-conditions/"
							aria-label="Terms and conditions of the Meeshkan product"
							title="terms and conditions"
						>
							T&amp;C
						</Link>
					</Stack>
					<Stack my={4} w={["100%", "25%"]}>
						<Heading as="h4" size="md">
							Resources
						</Heading>

						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/events/confidence-in-your-merge-to-production/"
							aria-label="A landing page for the webinar about confidence merging to production"
						>
							Webinar - Merging to prod
						</Link>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/docs/"
							aria-label="Meeshkan's documentation"
						>
							Documentation
						</Link>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/docs/frequently-asked-questions/"
							aria-label="Frequently asked questions about Meeshkan"
						>
							FAQ
						</Link>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/blog/"
							aria-label="Meeshkan's blog"
						>
							Blog
						</Link>
						<Link
							isExternal
							href="https://gitter.im/Meeshkan/community"
							aria-label="Go to Meeshkan's Gitter community"
						>
							Community
						</Link>
					</Stack>
					<Stack my={4} w={["100%", "25%"]}>
						<Heading as="h4" size="md">
							Related Projects
						</Heading>
						<Link
							isExternal
							href="https://www.unmock.io/"
							aria-label="Go to the Unmock website"
						>
							Unmock
						</Link>
						<Link
							isExternal
							href="https://jaymock.now.sh/"
							aria-label="Go to the Jaymock website"
						>
							Jaymock
						</Link>
						<Link
							isExternal
							href="https://vanity.dev"
							aria-label="Go to the Vanity.dev website"
						>
							Vanity.dev
						</Link>
						<Link
							isExternal
							href="https://not-salesforce.com"
							aria-label="Go to the Not salesforce website."
						>
							Not salesforce
						</Link>
					</Stack>
					<Stack my={4} w={["100%", "25%"]}>
						<Heading as="h4" size="md">
							Use cases
						</Heading>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/use-cases/staging-environments/"
							aria-label="Staging environments"
						>
							Staging environments
						</Link>
						<Link
							// @ts-ignore
							as={GatsbyLink}
							to="/test-graphql/"
							aria-label="A landing page all about testing graphql"
						>
							Testing GraphQL
						</Link>
					</Stack>
				</Flex>
				<Divider title="Meeshkan social links" borderColor="gray.300" my={4} />
				<Flex justifyContent="space-between" align="center">
					<GatsbyLink to="/" aria-label="Meeshkan homepage">
						<LogoIcon
							color={useColorModeValue("gray.900", "white")}
							size="6"
							w="auto"
						/>
					</GatsbyLink>
					<Stack isInline d={["none", "flex"]}>
						<Button
							ml={4}
							size="sm"
							variant="ghost"
							leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
							onClick={toggleColorMode}
							colorScheme="gray"
						>
							{colorMode === "light" ? "dark" : "light"} mode
						</Button>
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
