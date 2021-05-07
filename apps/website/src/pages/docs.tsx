import React from "react"
import {
	Heading,
	Box,
	Text,
	List,
	ListItem,
	Button,
	Code,
	Image,
	useColorModeValue,
} from "@chakra-ui/react"
import SEO from "../components/molecules/seo"
import { MDXProvider } from "@mdx-js/react"
import DocsNavigation from "../components/docsComponents/docsNavigation"
import MDXComponents, {
	DocsHeading,
} from "../components/molecules/mdxComponents"
import SideNav from "../components/docsComponents/sideNavigation"
import { UniversalLink } from "../components/atoms/UniversalLink"

const DocsText = ({ children }) => (
	<Text as="p" mt={4} lineHeight="tall">
		{children}
	</Text>
)

const DocsHome = () => {
	return (
		<MDXProvider components={MDXComponents}>
			<SEO
				pageTitle="Docs"
				pageDescription="Documentation to guide you through the Meeshkan core concepts."
				pageUrl={`https://meeshkan.com/docs/`}
			>
				<DocsNavigation />
				<Box>
					<SideNav
						display={["none", null, "block"]}
						maxWidth="18rem"
						width="full"
					/>
					<Box
						pl={[0, null, "18rem"]}
						backgroundColor={useColorModeValue("gray.50", "gray.800")}
						py={2}
					>
						<Box
							as="main"
							minH="92.5vh"
							mx="auto"
							maxWidth="46rem"
							marginBottom="5rem"
							pt={6}
							px={5}
						>
							{/* CONTENT START */}
							<Heading as="h1" textStyle="h1" mb={12} mt={4}>
								Getting started
							</Heading>
							<DocsText>
								Welcome{" "}
								<span role="img" aria-label="waving hand">
									👋
								</span>{" "}
								We're stoked that you're an early adopter and trying out
								Meeshkan. This documentation is here to help guide you through
								our core concepts and understand what you can expect.
							</DocsText>
							<DocsText>
								If you have any questions, you can always{" "}
								<UniversalLink
									to="/contact/"
									color={useColorModeValue("blue.500", "blue.200")}
								>
									contact us for support
								</UniversalLink>
								.
							</DocsText>
							<DocsText>
								<strong>In this section:</strong>
							</DocsText>

							<List styleType="disc" stylePosition="inside" my={4} spacing={3}>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="#what-does-meeshkan-do"
									>
										What does Meeshkan do?
									</UniversalLink>
								</ListItem>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="#creating-your-meeshkan-account"
									>
										Creating your Meeshkan account
									</UniversalLink>
								</ListItem>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="#authorizing-meeshkan-on-github"
									>
										Authorizing Meeshkan on GitHub
									</UniversalLink>
								</ListItem>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="#configuring-your-projects"
									>
										Configuring your projects
									</UniversalLink>
								</ListItem>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="#how-meeshkan-reports-bugs"
									>
										How Meeshkan reports bugs
									</UniversalLink>
								</ListItem>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="#revoking-access"
									>
										Revoking access
									</UniversalLink>
								</ListItem>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="#deleting-your-account"
									>
										Deleting your account
									</UniversalLink>
								</ListItem>
							</List>

							<DocsHeading
								// @ts-expect-error
								as="h2"
								textStyle="h2"
								id="what-does-meeshkan-do"
							>
								What does Meeshkan do?
							</DocsHeading>
							<DocsText>
								Meeshkan is an automated testing and mocking tool. We offer
								first-class support for GraphQL APIs, but Meeshkan is also built
								to handle REST APIs and third-party dependencies.
							</DocsText>
							<DocsText>
								Once installed, Meeshkan runs weekly and submits issues to your
								repository when it finds bugs.
							</DocsText>

							<DocsHeading
								// @ts-expect-error
								as="h2"
								textStyle="h2"
								id="creating-your-meeshkan-account"
							>
								Creating your Meeshkan account
							</DocsHeading>
							<DocsText>
								Almost everything regarding your Meeshkan account (configuration
								settings, test reports, etc.) will be handled in the{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="https://app.meeshkan.com"
								>
									Meeshkan webapp
								</UniversalLink>
								.
							</DocsText>
							<DocsText>
								The following link will take you to the webapp's homepage:
							</DocsText>
							<Button as={UniversalLink} mt={4} to="https://app.meeshkan.com">
								Create your free account
							</Button>
							<DocsText>
								From there, click on{" "}
								<Code colorScheme="cyan" fontSize="inherit">
									Sign up
								</Code>{" "}
								and you'll be guided through the authorization flow. We use{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="https://auth0.com/"
								>
									Auth0
								</UniversalLink>{" "}
								for authentication, so you'll be routed to one of their pages
								first before{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="#authorizing-meeshkan-on-github"
								>
									continuing with GitHub
								</UniversalLink>
								.
							</DocsText>
							<DocsText>It should look similar to this:</DocsText>
							<Image
								src={`https://user-images.githubusercontent.com/26869552/88674552-3e0a2b80-d0ea-11ea-9bb0-b6dc7e8adfe8.png`}
								alt={`Screenshot of the initial Auth0 page you hit when you click sign up. It says "Welcome, log in to Meeshkan to continue to Meeshkan webapp" followed by a button that says "Continue with GitHub"`}
								rounded="md"
							/>

							<DocsHeading
								// @ts-expect-error
								as="h2"
								textStyle="h2"
								id="authorizing-meeshkan-on-github"
							>
								Authorizing Meeshkan on GitHub
							</DocsHeading>
							<DocsText>
								To run the tests, Meeshkan must gain permission to access your
								repository code. To do this, we use a{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="https://developer.github.com/apps/differences-between-apps/"
								>
									Github App
								</UniversalLink>
								. That's why you're asked to continue with GitHub in the
								authorization flow when you sign up for Meeshkan.
							</DocsText>
							<DocsText>
								Here's what that'll look like if you substitute{" "}
								<Code colorScheme="cyan" fontSize="inherit">
									Unmock
								</Code>{" "}
								for your organization name:
							</DocsText>
							<Image
								src={`https://user-images.githubusercontent.com/26869552/81223394-36a11d80-8fe6-11ea-91db-d7c4224b7894.png`}
								alt={`Screenshot of the Meeshkan authorization flow on GitHub. At the top, it says 'Install & Authorize on your organization Unmock'.`}
								rounded="md"
							/>
							<DocsText>
								After this, you'll land on the webapp homepage{" "}
								<span role="img" aria-label="party popper">
									🎉
								</span>
							</DocsText>
							<DocsText>
								For more detailed information about the permissions we require,
								please read our{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="/docs/required-permissions/"
								>
									Required permissions
								</UniversalLink>{" "}
								page.
							</DocsText>

							<DocsHeading
								// @ts-expect-error
								as="h2"
								textStyle="h2"
								id="configuring-your-projects"
							>
								Configuring your projects
							</DocsHeading>
							<DocsText>
								Each project has configuration settings that will allow Meeshkan
								tests to run automatically. If you'd like tests to run on every
								commit, please enter your build settings!
							</DocsText>
							<Image
								src={`https://media.graphcms.com/FdmqxNNqT5iWaT31FXEA`}
								alt={`Configuration UI`}
								rounded="md"
							/>
							<DocsText>
								You can find your project's configuration at
								<Code colorScheme="cyan" fontSize="inherit">
									{`https://app.meeshkan.com/{yourTeam}/{yourProject}
									/configuration`}
								</Code>
								.
							</DocsText>

							<DocsHeading
								// @ts-expect-error
								as="h3"
								textStyle="h3"
								id="build-settings"
							>
								Build settings
							</DocsHeading>
							<DocsText>
								Please add credentials for your local server, and not your live
								endpoints. Testing against production credentials can cause
								permanent data damage.
							</DocsText>
							<List styleType="disc" stylePosition="inside" my={4} spacing={3}>
								<ListItem lineHeight="1.6">
									<strong>Root directory</strong>: The path to your app in your
									repository. For instance, if your app lives in the home
									directory, then you would use `./` as your root directory.
								</ListItem>
								<ListItem lineHeight="1.6">
									<strong>Build command</strong>: The command(s) your app
									framework provides for compiling your code.{" "}
									<Code
										colorScheme="cyan"
										fontSize="inherit"
									>{`npm install && npm start`}</Code>{" "}
									is an example build command for a repository that uses NPM and
									provides a "start" script.
								</ListItem>
								<ListItem lineHeight="1.6">
									<strong>OpenAPI location</strong>: The path or endpoint to
									your repository's <em>OpenAPI specification</em> (such as{" "}
									<Code colorScheme="cyan" fontSize="inherit">
										http://localhost:8000/api/openapi
									</Code>
									).
								</ListItem>
								<ListItem lineHeight="1.6">
									<strong>GraphQL endpoint</strong>: The path or endpoint to
									your repository's <em>GraphQL schema</em> (such as{" "}
									<Code colorScheme="cyan" fontSize="inherit">
										http://localhost:8000/api/graphql
									</Code>
									).
								</ListItem>
							</List>

							<DocsHeading
								// @ts-expect-error
								as="h4"
								textStyle="h4"
								id="docker"
							>
								Docker
							</DocsHeading>
							<DocsText>
								In several cases, you might want to 'dockerize' your project and
								provide your{" "}
								<Code colorScheme="cyan" fontSize="inherit">
									docker-compose up
								</Code>{" "}
								command (or equivalent) as the Meeshkan <em>build command</em>.
								Here is a list of a few resources that may be useful in the
								'dockerization' process:
							</DocsText>
							<List styleType="disc" stylePosition="inside" my={4} spacing={3}>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="https://docs.docker.com/get-started/"
									>
										Docker's <em>Get Started</em> Guide
									</UniversalLink>
								</ListItem>
								<ListItem lineHeight="1.6">
									<UniversalLink
										color={useColorModeValue("blue.500", "blue.200")}
										to="https://nodejs.org/en/docs/guides/nodejs-docker-webapp/"
									>
										Node.js's <em>Dockerizing a Node.js web app</em> Guide
									</UniversalLink>
								</ListItem>
							</List>

							<DocsHeading
								// @ts-expect-error
								as="h2"
								textStyle="h2"
								id="how-meeshkan-reports-bugs"
							>
								How Meeshkan reports bugs
							</DocsHeading>
							<DocsText>
								Meeshkan runs{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="/docs/faq/#what-is-property-based-testing"
								>
									property-based tests
								</UniversalLink>{" "}
								on your repository and reports any bugs discovered in the
								process.
							</DocsText>
							<DocsText>
								If no bugs were found, you won't hear anything.
							</DocsText>
							<DocsText>
								When Meeshkan finds a bug, your Meeshkan testing branch check
								will link to the test in question. This issue will outline which
								command found the bug, the response, and, in some cases, a{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="/docs/how-meeshkan-works/#suggested-fixes"
								>
									suggestion for how to resolve it
								</UniversalLink>
								.
							</DocsText>
							<Image
								src={`https://media.graphcms.com/1cB1gX9SvSestn25tohj`}
								alt={`Test failure page`}
								rounded="md"
							/>
							<DocsText>
								Here's an example issue filed by the Meeshkan GitHub bot
								(anonymized for privacy):
							</DocsText>
							<Image
								src={`https://user-images.githubusercontent.com/26869552/81219610-4e75a300-8fe0-11ea-9760-a41cb1a1812c.png`}
								alt={`Screenshot of an example issue filed by the Meeshkan bot.`}
								rounded="md"
							/>

							<DocsHeading
								// @ts-expect-error
								as="h2"
								textStyle="h2"
								id="deleting-your-account"
							>
								Deleting your account
							</DocsHeading>
							<DocsText>
								If you'd like to delete your Meeshkan account, please{" "}
								<UniversalLink
									color={useColorModeValue("blue.500", "blue.200")}
									to="/contact/"
								>
									contact our team
								</UniversalLink>
								.
							</DocsText>

							{/* CONTENT END */}
						</Box>
					</Box>
				</Box>
			</SEO>
		</MDXProvider>
	)
}

export default DocsHome
