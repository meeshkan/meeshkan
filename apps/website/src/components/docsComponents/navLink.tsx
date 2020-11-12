import { Box, Heading } from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"
import React, { forwardRef } from "react"
import { useLocation } from "@reach/router"

type NavLinkProps = {
	children: any
	href: string
}

const NavLink = ({ children, href, ...props }: NavLinkProps) => {
	let isActive = false
	let location = useLocation()

	if (location.pathname === href) {
		isActive = true
	} else {
		isActive = false
	}

	return (
		<GatsbyLink to={href} {...props}>
			{typeof children === "function" ? children(isActive) : children}
		</GatsbyLink>
	)
}

export const stringToUrl = (str, path = "/docs/") => {
	return `${path}${str.toLowerCase().split(" ").join("-")}/`
}

type SideNavLinkProps = {
	children?: string
}

export const SideNavLink = forwardRef(
	({ children, ...props }: SideNavLinkProps, ref) => {
		return (
			<Box
				// @ts-expect-error
				ref={ref}
				mx={-2}
				display="flex"
				cursor="pointer"
				alignItems="center"
				fontSize="lg"
				px={4}
				py={3}
				transition="all 0.2s"
				fontWeight={700}
				outline="none"
				_focus={{ shadow: "outline" }}
				_notFirst={{ mt: 1 }}
				{...props}
			>
				<Box>{children}</Box>
			</Box>
		)
	}
)

type TopNavLinkProps = {
	href: string
}

export const TopNavLink = forwardRef(
	({ href, ...props }: TopNavLinkProps, ref) => {
		const hoverColor = { light: "gray.900", dark: "gray.50" }
		const activeColor = { light: "cyan.500", dark: "cyan.200" }
		const activeBg = { light: "cyan.50", dark: "cyan.800" }
		return (
			<NavLink href={href}>
				{(isActive) => (
					<SideNavLink
						ref={ref}
						aria-current={isActive ? "page" : undefined}
						_hover={{
							color: hoverColor,
							transform: "translateX(2px)",
						}}
						{...(isActive && {
							bg: activeBg.dark,
							rounded: "sm",
							color: activeColor.dark,
							_hover: {
								transform: "translateX(2px)",
							},
							fontWeight: 700,
						})}
						{...props}
					/>
				)}
			</NavLink>
		)
	}
)

export const NavGroupHeading = (props) => (
	<Heading
		color="gray.300"
		fontSize="md"
		letterSpacing="wide"
		mb={2}
		textTransform="uppercase"
		{...props}
	/>
)

type ItemLinkProps = {
	href: string
	children: string
}

export const ItemLink = forwardRef(
	({ href, children, ...props }: ItemLinkProps, ref) => {
		const hoverColor = { light: "gray.900", dark: "gray.50" }
		const activeColor = { light: "cyan.500", dark: "cyan.500" }
		const activeBg = { light: "cyan.50", dark: "gray.800" }

		return (
			<NavLink href={href}>
				{(isActive) => (
					<SideNavLink
						ref={ref}
						aria-current={isActive ? "page" : undefined}
						color="gray.300"
						_hover={{
							color: hoverColor.dark,
							transform: "translateX(2px)",
						}}
						{...(isActive && {
							bg: activeBg.dark,
							rounded: "md",
							color: activeColor.dark,
							_hover: {
								transform: "translateX(2px)",
							},
							fontWeight: 700,
						})}
						{...props}
					>
						{children}
					</SideNavLink>
				)}
			</NavLink>
		)
	}
)
