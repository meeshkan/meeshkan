import React from "react"
import SEO from "../components/molecules/seo"
import { Heading, Text, Button, Flex } from "@chakra-ui/react"
import { SingleSection } from "../components/organisms/singleSection"
import { Link } from "gatsby"
import Layout from "../components/templates/layout"

const SuccessPage = () => (
	<Layout>
		<SEO
			pageTitle="Success"
			pageDescription="You've successfully filled out a form on the Meeshkan website. Rad. We'll be with you shortly."
			pageUrl="https://meeshkan.com/success/"
		/>
		<SingleSection>
			<Heading as="h1" textStyle="h1" textAlign="center" mb={12}>
				Success!
			</Heading>
			<Text textAlign="center" mb={6}>
				We've recieved your form submission and will be back to you, shortly!
			</Text>
			<Flex justify="center">
				<Button
					as={Link}
					// @ts-ignore
					to="/"
				>
					Go back home
				</Button>
			</Flex>
		</SingleSection>
	</Layout>
)

export default SuccessPage
