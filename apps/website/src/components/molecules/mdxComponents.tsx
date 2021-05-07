import React from "react"
import {
	Heading,
	Text,
	Image,
	ListItem,
	Box,
	Divider,
	Code,
	Alert,
	useColorModeValue,
	UnorderedList,
	OrderedList,
	HeadingProps,
	TextProps,
	AlertProps,
	CodeProps,
	DividerProps,
	LinkProps,
	ImageProps,
	BoxProps,
	ListProps,
	ListItemProps,
} from "@chakra-ui/react"
import CodeBlock from "./codeBlock"
import { UniversalLink } from "../atoms/UniversalLink"
import Video from "../atoms/video"
import RequestAccess from "./requestAccessForm"

type DocsHeadingProps = {
	id?: string
	children: Object
}

export const DocsHeading = ({ id, children, ...props }: DocsHeadingProps) => (
	<>
		<Heading
			mb={4}
			mt={8}
			letterSpacing="wide"
			id={id}
			sx={{
				"&[id]:before": {
					display: "block",
					height: " 6rem",
					marginTop: "-6rem",
					visibility: "hidden",
					content: `""`,
				},
				"&[id]:hover a": { opacity: 1 },
			}}
			pointerEvents="auto"
			{...props}
		>
			<a href={`#${id}`}>{children}</a>
			<Box
				aria-label="anchor"
				as="a"
				color={useColorModeValue("gray.200", "gray.700")}
				fontWeight="normal"
				outline="none"
				_focus={{ opacity: 1, boxShadow: "outline" }}
				opacity={0}
				ml={2}
				href={`#${id}`}
			>
				#
			</Box>
		</Heading>
	</>
)

const components = {
	h1: (props?: HeadingProps) => (
		<Heading {...props} as="h1" textStyle="h1" mb={12}>
			{props.children}
		</Heading>
	),
	h2: (props?: HeadingProps) => (
		<DocsHeading as="h2" textStyle="h2" {...props}>
			{props.children}
		</DocsHeading>
	),
	h3: (props?: HeadingProps) => (
		<DocsHeading as="h3" textStyle="h3" {...props}>
			{props.children}
		</DocsHeading>
	),
	h4: (props?: HeadingProps) => (
		<DocsHeading as="h4" textStyle="h4" {...props}>
			{props.children}
		</DocsHeading>
	),
	h5: (props: HeadingProps) => (
		<DocsHeading
			as="h5"
			textStyle="h5"
			fontSize="md"
			fontWeight="600"
			{...props}
		>
			{props.children}
		</DocsHeading>
	),
	h6: (props?: HeadingProps) => (
		<DocsHeading
			as="h6"
			textStyle="h6"
			fontSize="sm"
			fontWeight="500"
			{...props}
		>
			{props.children}
		</DocsHeading>
	),
	p: (props?: TextProps) => (
		<Text as="p" mt={4} lineHeight="tall" {...props}>
			{props.children}
		</Text>
	),
	blockquote: (props?: AlertProps) => (
		<Alert
			my={6}
			variant="left-accent"
			status="info"
			borderRadius="lg"
			css={{ "> *:first-of-type": { marginTop: 0 } }}
			{...props}
		>
			{props.children}
		</Alert>
	),
	inlineCode: (props?: CodeProps) => (
		<Code
			colorScheme="cyan"
			fontSize="inherit"
			borderRadius="md"
			px={2}
			py={0}
			fontWeight="500"
			{...props}
		/>
	),
	hr: (props?: DividerProps) => (
		<Divider borderColor="gray.100" my={6} {...props} />
	),
	a: (props?: LinkProps) => (
		<UniversalLink
			// @ts-expect-error
			color={useColorModeValue("blue.500", "blue.200")}
			{...props}
		/>
	),
	img: (props?: ImageProps) => <Image {...props} rounded="lg" />,
	pre: (props?: BoxProps) => (
		<Box my="2em" fontSize="inherit" rounded="sm" {...props} />
	),
	code: CodeBlock,
	ul: (props?: ListProps) => (
		<UnorderedList mt={4} spacing={3} {...props}>
			{props.children}
		</UnorderedList>
	),
	ol: (props?: ListProps) => (
		<OrderedList my={8} spacing={3} {...props}>
			{props.children}
		</OrderedList>
	),
	li: (props?: ListItemProps) => (
		<ListItem _last={{ mb: 8 }} lineHeight="1.6" {...props}>
			{props.children}
		</ListItem>
	),
	table: (props?: BoxProps) => (
		<Box as="table" textAlign="left" mt={6} width="full" {...props} />
	),
	// tr:,
	td: (props?: BoxProps) => (
		<Box
			as="td"
			p={2}
			borderTopWidth="1px"
			borderColor="inherit"
			fontSize="sm"
			whiteSpace="normal"
			{...props}
		/>
	),
	th: (props?: BoxProps) => (
		<Box as="th" p={2} fontWeight="semibold" fontSize="sm" {...props} />
	),
	thematicBreak: (props?: BoxProps) => <Box height={6} {...props} />,
	Video,
	RequestAccess,
}

export default components
