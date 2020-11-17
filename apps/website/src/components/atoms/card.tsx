import React from "react"
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { UniversalLink } from "./UniversalLink"

type CardProps = {
	children?: Object
	heading?: string
	body?: string
	link?: string
	label?: string
	backgroundColor?: string
	shadow?: boolean
	padding?: number
}

export const Card = ({
	children,
	heading,
	body,
	link,
	label,
	backgroundColor,
	shadow = false,
	padding = 6,
}: CardProps) => {
	return (
		<>
			{link ? (
				<Box
					as={UniversalLink}
					// @ts-ignore
					to={link}
					aria-label={label}
					borderRadius="md"
					backgroundColor={
						backgroundColor
							? backgroundColor
							: useColorModeValue("gray.50", "gray.800")
					}
					p={padding}
					position="relative"
					boxShadow={
						shadow ? "0px 0px 24px 0px rgba(149, 157, 165, 0.2)" : "none"
					}
				>
					{heading ? (
						<Heading as="h3" textStyle="h4" mb={4}>
							{heading}
						</Heading>
					) : null}
					{body ? <Text mb={6}>{body}</Text> : null}
					{children}
				</Box>
			) : (
				<Box
					borderRadius="md"
					backgroundColor={
						backgroundColor
							? backgroundColor
							: useColorModeValue("gray.50", "gray.800")
					}
					p={padding}
					position="relative"
					boxShadow={
						shadow ? "0px 0px 24px 0px rgba(149, 157, 165, 0.2)" : "none"
					}
				>
					{heading ? (
						<Heading as="h3" textStyle="h4" mb={4}>
							{heading}
						</Heading>
					) : null}
					{body ? <Text mb={6}>{body}</Text> : null}
					{children}
				</Box>
			)}
		</>
	)
}
