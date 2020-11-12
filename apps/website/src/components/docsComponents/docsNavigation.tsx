import React, { useRef } from "react"
import { Link } from "gatsby"
import {
	Stack,
	Code,
	IconButton,
	Box,
	Drawer,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	useDisclosure,
	useColorMode,
} from "@chakra-ui/core"
import {
	HamburgerIcon,
	LogoIcon,
	MoonIcon,
	SunIcon,
} from "../../../theme/icons"
import SideNavContent from "../docsComponents/sideNavigation"
import { AnimatedLogo } from "../molecules/animatedLogo"

const DocsNavigation = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { colorMode, toggleColorMode } = useColorMode()
	const btnRef = useRef()
	return (
		<Stack
			as="nav"
			isInline
			justify="space-between"
			align="center"
			bg={colorMode === "light" ? "whiteAlpha.800" : "blackAlpha.800"}
			py={4}
			px={6}
			position="sticky"
			top={0}
		>
			<Link
				to="/"
				aria-label="Meeshkan homepage"
				style={{ display: "flex", alignItems: "center" }}
			>
				<AnimatedLogo />
				<Link to="/docs/">
					<Code ml={3} colorScheme="cyan" fontWeight={900}>
						Docs
					</Code>
				</Link>
			</Link>
			{/* Search bar - temporarily removed until functionality is fixed */}
			{/* <Stack isInline display={["none", "none", "block"]}>
        <InputGroup size="sm" minW={200}>
          <InputLeftElement
            children={<Icon name="search" color="gray.300" />}
          />
          <Input
            type="search"
            placeholder="Search"
            className="algolia-search-bar"
          />
        </InputGroup>
      </Stack> */}

			{/* Mobile Nav | Button & Menu Drawer */}
			<Box>
				<IconButton
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
					aria-label="Color mode toggle"
					colorScheme="gray"
					size="xs"
					mr={2}
				/>
				<IconButton
					display={["inline-block", "inline-block", "none"]}
					ref={btnRef}
					colorScheme="gray"
					icon={<HamburgerIcon />}
					aria-label="Open the navigation menu"
					onClick={onOpen}
					size="xs"
				/>
			</Box>
			<Drawer
				placement="right"
				onClose={onClose}
				isOpen={isOpen}
				finalFocusRef={btnRef}
				size="xs"
			>
				<DrawerContent bg="gray.900">
					<DrawerHeader>
						<DrawerCloseButton
							color="gray.200"
							onClick={onClose}
							aria-label="Close the navigation menu"
						/>
					</DrawerHeader>
					<DrawerBody py={2}>
						<Stack justify="center" align="center">
							<SideNavContent
								contentHeight="90vh"
								borderRightWidth="0px"
								width="100%"
							/>
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Stack>
	)
}

export default DocsNavigation
