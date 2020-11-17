import React from "react"
import { Navigation } from "../organisms/navigation"
import { Footer } from "../organisms/footer"
import { Stack } from "@chakra-ui/react"

type LayoutProps = {
	children: Object
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Stack minH="90vh" px={6} spacing={0}>
				<Navigation />
				<main>{children}</main>
			</Stack>
			<Footer />
		</>
	)
}

export default Layout
