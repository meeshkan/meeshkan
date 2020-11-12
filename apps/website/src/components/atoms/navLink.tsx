import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Button } from "@chakra-ui/core"

type NavLinkProps = {
	text: string
	path: string
}

const NavLink = ({ text, path, ...props }: NavLinkProps) => (
	<Button
		{...props}
		variant="ghost"
		as={GatsbyLink}
		// @ts-ignore
		to={path}
		colorScheme="gray"
		fontWeight={600}
		lineHeight="normal"
	>
		{text}
	</Button>
)

export default NavLink
