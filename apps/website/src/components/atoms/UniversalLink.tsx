import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as ChakraLink } from "@chakra-ui/react"

type UniversalLinkProps = {
	children?: any // string or Object
	to: string
	color?: string
}

export const UniversalLink = ({
	children,
	to,
	color,
	...props
}: UniversalLinkProps) => {
	const isInternal = (to) => /^\/(?!\/)/.test(to)
	const isHash = (to) => /^#/.test(to)

	// Use Gatsby Link for internal links, and <a> for others
	if (isInternal(to) || isHash(to)) {
		return (
			<ChakraLink
				// @ts-ignore
				as={GatsbyLink}
				to={to}
				color={color ? color : "inherit"}
				_hover={{ textDecoration: "none" }}
				{...props}
			>
				{children}
			</ChakraLink>
		)
	} else {
		return (
			<ChakraLink
				href={to}
				color={color ? color : "inherit"}
				_hover={{ textDecoration: "none" }}
				{...props}
				// isExternal
			>
				{children}
			</ChakraLink>
		)
	}
}
