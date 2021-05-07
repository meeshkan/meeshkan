import React, { useState } from "react"
import {
	Text,
	Heading,
	Stack,
	Flex,
	Button,
	Code,
	Box,
	ListItem,
	ListIcon,
	List,
	LightMode,
	useColorModeValue,
} from "@chakra-ui/react"
import { useMixpanel } from "gatsby-plugin-mixpanel"
import { SingleSection } from "../components/organisms/singleSection"
import Layout from "../components/templates/layout"
import SEO from "../components/molecules/seo"
import { CheckSquareIcon } from "../../theme/icons"
import SegmentedControl from "../components/molecules/segmented-control"
import LeadForm from "../components/molecules/leadForm"
import { UniversalLink } from "../components/atoms/UniversalLink"

export const Plans = {
	free: {
		monthlyPrice: "0€",
		yearlyPrice: "0€",
		description: "Wait and be notified when a free plan is available.",
		features: [""],
	},

	feedback: {
		monthlyPrice: "45€",
		yearlyPrice: "432€",
		// All feedback plans are free
		discountedMonthly: "0€",
		discountedYearly: "0€",
		description:
			"Have a 30 minute call fortnightly with the Meeshkan team to offer insight into your workflow.",
		features: [
			"User generated tests",
			"30 test runs per month",
			"No-code test creation",
			"Unlimited team members",
			"5 Concurrent Tests",
			"3 month data retention",
		],
	},

	business: {
		monthlyPrice: "75€",
		yearlyPrice: "720€",
		description:
			"This is the perfect plan if you’re a team looking to get some serious UI-testing done.",
		features: [
			"User generated tests",
			"100+ test runs per month",
			"No-code test creation",
			"Unlimited team members",
			"30+ Concurrent Tests",
			"9 month data retention",
			"Video of test cases and outcomes",
		],
	},
}

const PricingPage = () => {
	// Represents billing interval — 0=monthly, 1=yearly
	const [toggleIndex, setToggleIndex] = useState(0)
	const { free, feedback, business } = Plans

	const mixpanel = useMixpanel()

	const iconBlue = useColorModeValue("blue.500", "blue.300")
	const codeBg = useColorModeValue("blue.50", "gray.800")
	const borderGray = useColorModeValue("gray.100", "gray.800")
	const tertiaryText = useColorModeValue("gray.300", "gray.700")
	return (
		<Layout>
			<SEO
				pageTitle="Pricing"
				pageDescription="Pricing tiers for using the automated UI-testing tool, Meeshkan."
				pageUrl="https://meeshkan.com/pricing/"
			/>
			<SingleSection>
				<Heading as="h1" textStyle="h1" textAlign="center" mb={6}>
					Meeshkan Pricing
				</Heading>
				<Text fontSize="2xl" textAlign="center" mb={12} lineHeight="tall">
					Quality assurance isn't all-or-nothing. Our plans scale with your team's needs: for all budgets, any volume of tests, and in as much detail as you need. Everyone deserves more confidence in each release.
				</Text>

				<>
					<Flex justify="center" align="center" mb={6}>
						<Text mr={4} fontWeight="600">
							Billing
						</Text>
						<SegmentedControl
							values={["Monthly", "Yearly -20%"]}
							selectedIndex={toggleIndex}
							setSelectedIndex={setToggleIndex}
						/>
					</Flex>
					<Stack direction={["column", "column", "row"]} w="full" spacing={8}>
						<Flex direction="column" align="center" w="full">
							<Code
								variant="outline"
								background={codeBg}
								h="20px"
								borderRadius="md"
								py={2}
								px={4}
								colorScheme="blue"
								maxW="fit-content"
								mb="-10px"
								zIndex="1"
								fontWeight="700"
							>
								Most popular
							</Code>
							<Box
								p={4}
								w="full"
								borderRadius="lg"
								border="1px solid"
								borderColor={iconBlue}
								boxShadow="0px 8px 24px 0px rgba(149,157,165,0.2)"
							>
								<Flex justify="space-between" mb={4}>
									<Text fontSize="24px" fontWeight="800">
										Feedback
									</Text>
									<Flex>
										<Text
											fontWeight="800"
											fontSize="24px"
											mr={4}
											textDecor="line-through"
											color={tertiaryText}
										>
											{toggleIndex === 0
												? feedback.monthlyPrice
												: feedback.yearlyPrice}
										</Text>
										<Text fontWeight="800" fontSize="24px">
											{toggleIndex === 0
												? feedback.discountedMonthly
												: feedback.discountedYearly}
										</Text>
									</Flex>
								</Flex>
								<Text textAlign="center" color="gray.500" mb={8}>
									{feedback.description}
								</Text>

								<List
									spacing={2}
									sx={{ WebkitColumns: "2", MozColumns: "2", columns: 2 }}
								>
									{feedback.features.map((feature) => (
										<ListItem lineHeight="1.2" fontSize="14px">
											<ListIcon as={CheckSquareIcon} color={iconBlue} />
											{feature}
										</ListItem>
									))}
								</List>
								<Flex direction="column" justify="center" align="center" mt={8}>
									<LightMode>
										<Button
											w="full"
											as={UniversalLink}
											// @ts-ignore
											href="https://app.meeshkan.com"
											aria-label="Go to the Meeshkan webapp to sign up"
										>
											Choose the Feedback plan
										</Button>
									</LightMode>
								</Flex>
							</Box>
						</Flex>

						<Box
							d="flex"
							flexDirection="column"
							justifyContent="space-between"
							p={4}
							w="full"
							borderRadius="lg"
							border="1px solid"
							borderColor="transparent"
							boxShadow="0px 8px 24px 0px rgba(149,157,165,0.2)"
						>
							<Box>
								<Flex justify="space-between" mb={4}>
									<Text fontSize="24px" fontWeight="800">
										Business
									</Text>
									<Flex>
										<Text fontWeight="800" fontSize="24px">
											{toggleIndex === 0
												? business.monthlyPrice
												: business.yearlyPrice}
										</Text>
									</Flex>
								</Flex>
								<Text textAlign="center" color="gray.500" mb={8}>
									{business.description}
								</Text>
								<List
									spacing={2}
									sx={{ WebkitColumns: "2", MozColumns: "2", columns: 2 }}
								>
									{business.features.map((feature) => (
										<ListItem lineHeight="1.2" fontSize="14px">
											<ListIcon as={CheckSquareIcon} color={iconBlue} />
											{feature}
										</ListItem>
									))}
								</List>
							</Box>
							<Button
								as={UniversalLink}
								// @ts-ignore
								href="https://app.meeshkan.com"
								aria-label="Go to the Meeshkan webapp to sign up"
								variant="subtle"
								mt={8}
								w="full"
							>
								Choose the Business plan
							</Button>
						</Box>
					</Stack>
					<Stack
						w="full"
						direction={["column", "column", "row"]}
						align="center"
						justifyContent="space-between"
						p={4}
						mt={8}
						borderRadius="lg"
						border="1px solid"
						borderColor={borderGray}
					>
						<Flex align="baseline" direction={["column", "row"]}>
							<Text fontSize="24px" fontWeight="800" mr={4}>
								Free
							</Text>
							<Text color="gray.500">{free.description}</Text>
						</Flex>

						<LeadForm
							formName="Pricing"
							subtle={true}
							CTA="Subscribe to updates"
						/>
					</Stack>
				</>
			</SingleSection>
		</Layout>
	)
}

export default PricingPage
