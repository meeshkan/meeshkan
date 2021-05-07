import React from "react"
import {
	Button,
	Flex,
	FormControl,
	Input,
	LightMode,
	useColorModeValue,
} from "@chakra-ui/react"

type LeadFormProps = {
	formName: string
	subtle?: boolean
	CTA?: string
}

const LeadForm = ({ formName, subtle, CTA }: LeadFormProps) => {
	return (
		<Flex
			as="form"
			name={formName}
			data-netlify="true"
			method="post"
			action="/success/"
			data-netlify-honeypot="bot-field"
			maxW="600px"
			w="full"
			mx={["none", "none", "auto"]}
			border="1px solid"
			borderColor={useColorModeValue("gray.300", "gray.700")}
			borderRadius="xl"
			p={2}
			transition="all 0.2s"
			_hover={{ borderColor: useColorModeValue("gray.400", "gray.600") }}
			_focusWithin={{
				borderColor: useColorModeValue("blue.400", "blue.600"),
			}}
			direction={["column", "column", "row"]}
		>
			<input type="hidden" name="bot-field" />
			<input type="hidden" name="form-name" value={formName} />
			<FormControl isRequired>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="shipit@meeshkan.com"
					_placeholder={{
						color: useColorModeValue("gray.500", "gray.400"),
					}}
					mr={4}
					border="none"
					_focus={{}}
					mb={[4, 4, 0]}
				/>
			</FormControl>
			{subtle ? (
				<Button minW="fit-content" type="submit" variant="subtle">
					{CTA || "Get early access"}
				</Button>
			) : (
				<LightMode>
					<Button minW="fit-content" type="submit">
						{CTA || "Get early access"}
					</Button>
				</LightMode>
			)}
		</Flex>
	)
}

export default LeadForm
