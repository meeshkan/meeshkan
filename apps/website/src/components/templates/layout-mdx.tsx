import React from "react"
import { Navigation } from "../organisms/navigation"
import { Footer } from "../organisms/footer"
import { Box, IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "../../../theme/icons"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "../molecules/mdxComponents"
import { SingleSection } from "../organisms/singleSection"

type LayoutProps = {
	children: Object
}

const Layout = ({ children }: LayoutProps) => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<>
			<MDXProvider components={MDXComponents}>
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
					<SingleSection>
						<main>{children}</main>
					</SingleSection>
				</Box>
				<Footer />
			</MDXProvider>
		</>
	)
}

export default Layout
