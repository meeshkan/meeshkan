import React from "react"
import { Box, Heading, Link, Grid, Text, Code, Flex } from "@chakra-ui/react"

type DoubleSectionProps = {
	children: Object
	heading?: string
	anchor?: string
	text?: string
	reverse?: boolean
	badge?: string
	em?: string
}

export const DoubleSection = ({
	children,
	heading,
	anchor,
	text,
	reverse,
	badge,
	em,
	...props
}: DoubleSectionProps) => (
	<Box as="section" maxW="1200px" mx="auto" py={16} {...props}>
		<Grid
			templateColumns={[
				"repeat(auto-fill, 1fr)",
				"reapeat(auto-fill, 1fr)",
				"reapeat(auto-fill, 1fr)",
				"repeat(2, 1fr)",
			]}
			gap={16}
			gridAutoFlow="dense"
		>
			{reverse ? (
				<Flex justifyContent="center" gridColumn={["1", "1", "2"]}>
					{" "}
					{children}
				</Flex>
			) : (
				<Flex justifyContent="center">{children}</Flex>
			)}
			<Box>
				{badge ? (
					<Code
						colorScheme="cyan"
						fontSize="14px"
						fontWeight={600}
						rounded="sm"
						padding="0px 4px"
						minH="auto"
						mb={3}
					>
						{badge}
					</Code>
				) : null}
				{heading ? (
					<Heading as="h2" textStyle="h3" mb={4}>
						{anchor ? (
							<Link
								id={anchor}
								_hover={{ textDecoration: "none", cursor: "auto" }}
							>
								{heading}{" "}
								{em && (
									<Flex d="inline" color="red.500" fontStyle="italic">
										{em}
									</Flex>
								)}
							</Link>
						) : (
							heading
						)}
					</Heading>
				) : null}
				{text ? (
					<Text textAlign="left" fontSize={["md", "lg", "xl"]} lineHeight="1.4">
						{text}
					</Text>
				) : null}
			</Box>
		</Grid>
	</Box>
)
