import React from "react"
import { Navigation } from "../organisms/navigation"
import { Footer } from "../organisms/footer"
import { Box, IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "../../../theme/icons"

type LayoutProps = {
	children: Object
}

const Layout = ({ children }: LayoutProps) => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<>
			<IconButton
				onClick={() => toggleColorMode()}
				title={`Toggle ${colorMode === "dark" ? "light" : "dark"} mode`}
				aria-label="Light/Dark mode toggle"
				icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
				position="fixed"
				left={0}
				top="50vh"
				colorScheme="gray"
				borderLeftRadius="0"
				size="lg"
				zIndex={10}
				display={["none", "none", "flex"]}
			/>
			<Box minH="90vh" px={[4, 4, 6, 8]}>
				<Navigation />
				<main>{children}</main>
			</Box>
			<Footer />
		</>
	)
}

export default Layout
