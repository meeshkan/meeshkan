import React from "react"
import {
	Box,
	BoxProps,
	Heading,
	Link,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"

type SectionProps = {
	children?: Object
	heading?: string
	anchor?: string
	text?: string
	hero?: boolean
	props?: any
}

export const SingleSection = ({
	children,
	heading,
	anchor,
	text,
	hero,
	...props
}: SectionProps & BoxProps) => (
	<Box as="section" maxW="1200px" mx="auto" py={16} {...props}>
		{heading ? (
			<Heading as="h2" textStyle="h2" textAlign="center" mb={6}>
				{anchor ? (
					<Link id={anchor} _hover={{ textDecoration: "none", cursor: "auto" }}>
						{heading}
					</Link>
				) : (
					heading
				)}
			</Heading>
		) : null}
		{text ? (
			<Text
				textAlign="center"
				fontSize={["md", "lg", "xl"]}
				lineHeight="mid"
				maxW="600px"
				mx="auto"
				color={useColorModeValue("gray.600", "gray.300")}
				mb={6}
			>
				{text}
			</Text>
		) : null}
		{children != null ? children : null}
	</Box>
)
