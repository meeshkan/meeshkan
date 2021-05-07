import React from "react"
import {
	Heading,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	useColorModeValue,
	ListItem,
	List,
	Button,
	LightMode,
	Flex,
} from "@chakra-ui/react"
import Layout from "../components/templates/layout"
import SEO from "../components/molecules/seo"
import { SingleSection } from "../components/organisms/singleSection"

const FAQpage = () => {
	return (
		<Layout>
			<SEO
				pageTitle="Frequently asked questions"
				pageDescription="Meeshkan answers your frequently asked questions about the webapp and product."
				pageUrl="https://meeshkan.com/FAQ/"
			/>
			<SingleSection
				heading="Frequently asked questions"
				text="You asked and we answered! In this section, we'll dig into the questions
				we've received most often about Meeshkan."
			/>

			<SingleSection>
				<Accordion defaultIndex={[0]} allowMultiple>
					<AccordionItem
						backgroundColor={useColorModeValue("gray.100", "gray.800")}
						border="none"
						p={4}
						borderRadius="lg"
						mb={8}
					>
						<AccordionButton>
							<Box flex="1" textAlign="left" fontWeight={700}>
								What is Meeshkan?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel lineHeight="tall">
							Meeshkan is a workflow tool for testing your staging environments
							with what your users do in production. <br /> <br />
							The webapp provides
							<List listStyleType="disc" listStylePosition="inside" spacing={2}>
								<ListItem lineHeight="tall">
									A script to install into your webapp to record users
								</ListItem>
								<ListItem lineHeight="tall">
									Access to user stories (think of these as grouped and
									prioritized user flows)
								</ListItem>
								<ListItem lineHeight="tall">
									The ability to enter the URL of a staging environment
								</ListItem>
								<ListItem lineHeight="tall">
									Daily or CI test run triggers. Test runs will replay all users
									stories that have been marked as expected.
								</ListItem>
								<ListItem lineHeight="tall">
									Overview of what happened when user stories were replayed
									against your staging environment.
								</ListItem>
							</List>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</SingleSection>
			<SingleSection>
				<Heading as="h3" textStyle="h3" textAlign="center" mb={4}>
					Have a question that's not answered?
				</Heading>
				<Flex justify="center">
					<LightMode>
						<Button
							mx="auto"
							onClick={() => {
								// @ts-ignore
								window.Intercom("showMessages")
							}}
						>
							Chat with us
						</Button>
					</LightMode>
				</Flex>
			</SingleSection>
		</Layout>
	)
}

export default FAQpage
