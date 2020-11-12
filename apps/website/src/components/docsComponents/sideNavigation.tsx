import React from "react"
import { Box, Stack } from "@chakra-ui/core"
import items from "./items"
import { ItemLink, stringToUrl } from "./navLink"

export const SideNavContent = ({ contentHeight = "calc(100vh)", ...props }) => {
	return (
		<Box position="relative" overflowY="auto" bg="gray.900" pt={8} {...props}>
			<Stack
				as="nav"
				spacing={4}
				height={contentHeight}
				aria-label="Docs navigation"
				px={6}
			>
				<ItemLink key="Getting Started" href="/docs/">
					Getting started
				</ItemLink>
				{items.map((link) => (
					<ItemLink key={link} href={stringToUrl(link)}>
						{link}
					</ItemLink>
				))}
			</Stack>
		</Box>
	)
}
const SideNavContainer = (props) => (
	<Box
		position="fixed"
		left={0}
		width="100%"
		height="100%"
		top="rem"
		right={0}
		{...props}
	/>
)

const SideNav = (props) => {
	return (
		<SideNavContainer {...props}>
			<SideNavContent />
		</SideNavContainer>
	)
}

export default SideNav
