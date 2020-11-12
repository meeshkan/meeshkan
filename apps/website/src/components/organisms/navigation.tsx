import React, { useRef } from "react"
import { Link } from "gatsby"
import {
	Stack,
	IconButton,
	useDisclosure,
	Drawer,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Button,
	DrawerFooter,
	Flex,
	Divider,
	useColorModeValue,
	useColorMode,
} from "@chakra-ui/core"
import NavLink from "../atoms/navLink"
import { UniversalLink } from "../atoms/UniversalLink"
import { motion } from "framer-motion"
import {
	LogoIcon,
	HamburgerIcon,
	TwitterIcon,
	GitHubIcon,
	LinkedInIcon,
} from "../../../theme/icons"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { AnimatedLogo } from "../molecules/animatedLogo"

function SignUpLink() {
	return (
		<Button
			as={UniversalLink}
			// @ts-ignore
			href="https://app.meeshkan.com"
			aria-label="Log in to the Meeshkan webapp"
			variant="ghost"
			lineHeight="normal"
			ml={[0, 0, 8]}
		>
			Sign up
		</Button>
	)
}
function LogInLink() {
	return (
		<Button
			as={UniversalLink}
			// @ts-ignore
			href="https://app.meeshkan.com"
			aria-label="Log in to the Meeshkan webapp"
			variant="ghost"
			fontWeight={600}
			lineHeight="normal"
			colorScheme="gray"
		>
			Log in <ArrowForwardIcon ml={2} />
		</Button>
	)
}

export function Navigation() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef()

	return (
		<Stack
			as="nav"
			isInline
			justify="space-between"
			align="center"
			p={4}
			pos="fixed"
			zIndex={1000}
			top={0}
			right={0}
			left={0}
			backgroundColor={useColorModeValue("whiteAlpha.800", "blackAlpha.800")}
			style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
			borderBottom="1px solid"
			borderBottomColor={useColorModeValue("gray.50", "gray.900")}
		>
			<Link to="/" aria-label="Meeshkan home">
				<AnimatedLogo />
			</Link>

			{/* Desktop & Tablet */}
			<Stack isInline display={["none", "none", "flex"]}>
				<NavLink text="Pricing" path="/pricing/" />
				<NavLink text="Blog" path="/blog/" />
				<NavLink text="Roadmap" path="/roadmap/" />
				<NavLink text="Docs" path="/docs/" />
				<Flex>
					<SignUpLink />
					<Divider
						orientation="vertical"
						borderColor={useColorModeValue("gray.100", "gray.700")}
					/>
					<LogInLink />
				</Flex>
			</Stack>

			{/* Mobile */}
			<IconButton
				aria-label="Open the navigation menu"
				variant="ghost"
				ref={btnRef}
				onClick={onOpen}
				icon={<HamburgerIcon />}
				display={["block", "block", "none"]}
			/>
			<Drawer
				placement="right"
				onClose={onClose}
				isOpen={isOpen}
				finalFocusRef={btnRef}
				size="sm"
			>
				<DrawerContent shadow="none">
					<DrawerCloseButton
						size="md"
						onClick={onClose}
						aria-label="Close the navigation menu"
					/>
					<DrawerHeader p={4}>
						<Link to="/" aria-label="Meeshkan homepage">
							<LogoIcon h={6} w="auto" />
						</Link>
					</DrawerHeader>
					<DrawerBody
						py={6}
						backgroundColor="whiteAlpha.300"
						style={{
							backdropFilter: "blur(4px)",
							WebkitBackdropFilter: "blur(4px)",
						}}
					>
						<Stack align="center">
							<NavLink text="Pricing" path="/pricing/" />
							<NavLink text="Blog" path="/blog/" />
							<NavLink text="Docs" path="/docs/" />
							<Divider w="50%" borderColor="gray.100" />
							<SignUpLink />
							<LogInLink />
						</Stack>
					</DrawerBody>
					<DrawerFooter d="flex" justifyContent="center">
						<Stack isInline>
							<IconButton
								as={Link}
								// @ts-ignore
								href="https://twitter.com/meeshkan"
								isExternal
								aria-label="Twitter"
								icon={<TwitterIcon />}
								rounded="sm"
								color="gray.500"
							/>
							<IconButton
								as={Link}
								// @ts-ignore
								href="https://www.linkedin.com/company/meeshkan/"
								isExternal
								aria-label="LinkedIn"
								icon={<LinkedInIcon />}
								rounded="sm"
								color="gray.500"
							/>
							<IconButton
								as={Link}
								// @ts-ignore
								href="https://github.com/meeshkan"
								isExternal
								aria-label="GitHub"
								icon={<GitHubIcon />}
								rounded="sm"
								color="gray.500"
							/>
						</Stack>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Stack>
	)
}
