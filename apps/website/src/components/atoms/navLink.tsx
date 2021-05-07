import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Button, useColorModeValue } from "@chakra-ui/react"

type NavLinkProps = {
	text: string
	path: string
}

const NavLink = ({ text, path, ...props }: NavLinkProps) => (
	<Button
		{...props}
		variant="ghost"
		color={useColorModeValue("gray.500", "gray.400")}
		as={GatsbyLink}
		to={path}
		colorScheme="gray"
		fontWeight={600}
		lineHeight="normal"
	>
		{text}
	</Button>
)

export default NavLink
