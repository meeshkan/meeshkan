import React from "react"
import {
	SimpleGrid,
	Text,
	Heading,
	Stack,
	Flex,
	Button,
	Code,
	Box,
} from "@chakra-ui/core"
import { XmarkIcon, CheckmarkIcon } from "../../theme/icons"
import { Card } from "../components/atoms/card"
import { useMixpanel } from "gatsby-plugin-mixpanel"
import { UniversalLink } from "../components/atoms/UniversalLink"
import { SingleSection } from "../components/organisms/singleSection"
import Layout from "../components/templates/layout"
import SEO from "../components/molecules/seo"

type PricingProps = {
	title: string
	subtitle?: string
	price: string
	yesFeatures?: Array<string>
	noFeatures?: Array<string>
	hasCTA: boolean
	mixpanel: any
	CTA?: string
}

const PricingCard = ({
	title,
	subtitle,
	price,
	yesFeatures,
	noFeatures,
	hasCTA,
	mixpanel,
	CTA,
}: PricingProps) => (
	<Card>
		<Heading
			as="h3"
			fontSize="2xl"
			fontWeight={900}
			mb={4}
			d="flex"
			justifyContent="center"
			alignItems="center"
		>
			{title}
			<Code colorScheme="cyan" fontSize="md" ml={3} lineHeight="initial">
				{subtitle}
			</Code>
		</Heading>
		<Text textAlign="center" fontSize="xl" fontWeight={600}>
			{price} <span style={{ color: "#616E7C", fontWeight: 400 }}>/month</span>
		</Text>

		<Stack spacing={2} mt={4}>
			{yesFeatures &&
				yesFeatures.map((feature, index) => (
					<Flex key={index} align="top">
						<CheckmarkIcon color="cyan.500" mr={3} mt={2} />
						<Text>{feature}</Text>
					</Flex>
				))}

			{noFeatures &&
				noFeatures.map((feature, index) => (
					<Flex key={index} align="center">
						<XmarkIcon color="red.500" mr={3} />
						<Text>{feature}</Text>
					</Flex>
				))}
		</Stack>

		{hasCTA && (
			<Box mt={8}>
				<Flex pos="absolute" bottom={4} right={6} left={6}>
					<Button
						as={UniversalLink}
						// @ts-expect-error
						href="https://app.meeshkan.com"
						aria-label="Create a free account on Meeshkan."
						variant={CTA === `Sign up for Pro` ? "solid" : "outline"}
						w="full"
						onClick={() => {
							mixpanel.track(`Create an account - ${title}`, {
								to: "https://app.meeshkan.com",
								from: "https://meeshkan.com/pricing",
								c2a: `Create an account - ${title}`,
							})
						}}
					>
						{CTA}
					</Button>
				</Flex>
			</Box>
		)}
	</Card>
)

const PricingPage = () => {
	const mixpanel = useMixpanel()
	return (
		<Layout>
			<SEO
				pageTitle="Pricing"
				pageDescription="Pricing tiers for using the automated testing tool, Meeshkan."
				pageUrl="https://meeshkan.com/pricing/"
			/>
			<SingleSection>
				<Heading as="h1" textStyle="h1" textAlign="center" mb={6}>
					Meeshkan Pricing
				</Heading>
				<Text fontSize="2xl" textAlign="center" mb={12} lineHeight="tall">
					Quality assurance isn't all-or-nothing. Our pricing scales with your
					team's need, and we have a generous free tier that integrates
					seamlessly into your software engineer's day-to-day flow.
				</Text>
				<SimpleGrid columns={3} spacing={8}>
					<PricingCard
						title="Free"
						subtitle="for Individuals"
						CTA="Create a free account"
						price="$0 Forever"
						mixpanel={mixpanel}
						yesFeatures={[
							"Endpoint testing for REST and GraphQL services",
							"Basic reports",
							"100 testing hours",
							"GitHub integration",
						]}
						hasCTA={true}
					/>
					<PricingCard
						title="Pro"
						subtitle="for Teams"
						price="Free in Beta"
						mixpanel={mixpanel}
						yesFeatures={[
							"All free features",
							"Unlimited projects",
							"1000 testing hours",
							"3 concurrent tests",
							"Premium reports",
							"30 day history retention",
						]}
						hasCTA={true}
						CTA="Sign up for Pro"
					/>
					<PricingCard
						title="Business"
						subtitle="starting at"
						hasCTA={true}
						CTA="Sign up for Business"
						mixpanel={mixpanel}
						price="Chat with us"
						yesFeatures={[
							"All Pro features",
							"Unlimited projects",
							"Unlimited testing hours",
							"Unlimited history",
							"GitLab & Bitbucket import",
							"Custom build pipelines",
							"In-cluster testing for k8s",
							"Role based permissions",
							"Jira/Linear integration",
						]}
					/>
				</SimpleGrid>
			</SingleSection>
		</Layout>
	)
}

export default PricingPage
