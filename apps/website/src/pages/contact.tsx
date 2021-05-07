import React from "react"
import {
	Heading,
	FormLabel,
	Input,
	Textarea,
	InputGroup,
	InputLeftAddon,
	Button,
	FormControl,
	Box,
} from "@chakra-ui/react"
import { SingleSection } from "../components/organisms/singleSection"
import SEO from "../components/molecules/seo"
import Layout from "../components/templates/layout"

const ContactPage = () => (
	<Layout>
		<SEO
			pageTitle="Contact"
			pageDescription="Get in contact with us!"
			pageUrl="https://meeshkan.com/contact/"
		/>
		<SingleSection>
			<Heading as="h1" textStyle="h1" textAlign="center" mb={12}>
				Get in contact with us!
			</Heading>
			<Box
				as="form"
				action="/success/"
				maxW="750px"
				mx="auto"
				name="contact"
				data-netlify="true"
				method="post"
				data-netlify-honeypot="bot-field"
			>
				<input type="hidden" name="bot-field" />
				<input type="hidden" name="form-name" value="contact" />

				<FormControl isRequired>
					<FormLabel htmlFor="name" fontWeight={700}>
						Name
					</FormLabel>
					<Input type="text" name="name" id="name" mb={4} />
				</FormControl>

				<FormControl isRequired w="100%">
					<FormLabel htmlFor="email" fontWeight={700}>
						Email
					</FormLabel>
					<Input type="email" name="email" id="email" mb={4} />
				</FormControl>

				<FormControl w="100%">
					<FormLabel htmlFor="website" fontWeight={700}>
						Which company are you from?
					</FormLabel>
					<InputGroup mb={4}>
						<InputLeftAddon children="https://" />
						<Input
							type="url"
							name="website"
							id="website"
							placeholder="company-site"
						/>
					</InputGroup>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="message" fontWeight={700}>
						Message
					</FormLabel>
					<Textarea id="message" name="message" resize="none" mb={4} />
				</FormControl>

				<Button mt={4} type="submit" isFullWidth>
					Submit
				</Button>
			</Box>
		</SingleSection>
	</Layout>
)

export default ContactPage
