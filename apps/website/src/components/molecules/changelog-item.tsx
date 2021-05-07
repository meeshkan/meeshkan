import React from "react"
import {
	Box,
	Code,
	Link as ChakraLink,
	Stack,
	useColorModeValue,
	Text,
} from "@chakra-ui/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

type ChangelogItemProps = {
	version: string
	date: string
	slug: string
	body: any
}

const ChangelogItem = ({ version, date, slug, body }: ChangelogItemProps) => {
	return (
		<Stack
			as="article"
			direction="row"
			spacing={12}
			maxW="800px"
			mt={16}
			pb={16}
			mx="auto"
			_notLast={{
				borderBottom: "1px solid",
				borderBottomColor: useColorModeValue("gray.200", "gray.700"),
			}}
		>
			<Box>
				<Code
					colorScheme="cyan"
					fontWeight="700"
					p={2}
					borderRadius="md"
					mb={2}
				>
					v{version}
				</Code>
				<Text>
					<ChakraLink to={`/changelog/${slug}`} as={Link}>
						{date}
					</ChakraLink>
				</Text>
			</Box>

			<Box flex="1">
				<MDXRenderer>{body}</MDXRenderer>
			</Box>
		</Stack>
	)
}

export default ChangelogItem
