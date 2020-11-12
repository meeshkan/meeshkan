import React, { useState } from "react"
import { Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/core"
import { useForm } from "react-hook-form"

const RequestAccessForm = () => {
	const { handleSubmit, register, formState } = useForm()
	const [formSubmit, setFormSubmit] = useState(false)

	function onSubmit(values) {
		let sendgridData = JSON.stringify({
			list_ids: ["065bb90b-9652-4905-85df-a6c49fb825cd"],
			contacts: [
				{
					email: values.email,
				},
			],
		})

		fetch("https://api.sendgrid.com/v3/marketing/contacts", {
			method: "PUT",
			body: sendgridData,
			headers: {
				authorization: `Bearer ${process.env.GATSBY_SENDGRID_API_KEY}`,
				"content-type": "application/json",
			},
		}).then(() => setFormSubmit(true))
	}

	return (
		<>
			<Flex
				as="form"
				onSubmit={handleSubmit(onSubmit)}
				direction={["column", "column", "row"]}
				justify="center"
				alignItems="flex-end"
				my={12}
			>
				<input
					type="hidden"
					name="formName"
					value="request-alpha-1"
					ref={register}
				/>
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
						ref={register}
						aria-label="Enter your business email"
						borderRadius="sm"
						placeholder="Your email"
						isDisabled={formSubmit}
						fontWeight={500}
					/>
				</FormControl>
				<Button
					type="submit"
					isLoading={formState.isSubmitting}
					isDisabled={formSubmit}
					w={["100%", "100%", "auto"]}
				>
					{formSubmit ? "Submitted" : "Request access"}
				</Button>
			</Flex>
		</>
	)
}

export default RequestAccessForm
