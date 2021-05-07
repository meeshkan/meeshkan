import React, {
	ReactNode,
	MouseEventHandler,
	Dispatch,
	SetStateAction,
} from "react"
import { Stack, Box, Flex, useColorModeValue, BoxProps } from "@chakra-ui/react"
import { AnimateSharedLayout, motion } from "framer-motion"

const MotionBox = motion(Box)

type SegmentedControlTabProps = {
	children?: ReactNode
	onSelect?: MouseEventHandler<HTMLDivElement>
	disabled?: boolean
	selected: boolean
}

function SegmentedControlTab({
	onSelect,
	children,
	disabled,
	selected,
}: SegmentedControlTabProps) {
	const selectedColor = useColorModeValue("gray.900", "white")
	const color = useColorModeValue("gray.700", "gray.200")
	return (
		<Flex
			position="relative"
			justify="center"
			backgroundColor="transparent"
			zIndex={0}
			cursor="pointer"
			userSelect="none"
			role="button"
			onClick={!disabled ? onSelect : undefined}
		>
			<Box p={3} textAlign="center" color={selected ? selectedColor : color}>
				{children}
			</Box>
		</Flex>
	)
}

type SegmentedControlProps = {
	values: string[]
	disabled?: boolean
	selectedIndex: number
	setSelectedIndex: Dispatch<SetStateAction<number>>
	attached?: boolean
	props?: BoxProps
}

const SegmentedControl = ({
	values,
	disabled,
	selectedIndex,
	setSelectedIndex,
	attached = false,
	props,
}: SegmentedControlProps) => {
	const stackBackgroundColor = useColorModeValue("gray.200", "gray.700")
	const boxBackgroundColor = useColorModeValue("white", "gray.900")
	return (
		<AnimateSharedLayout>
			<Stack
				direction="row"
				align="center"
				backgroundColor={stackBackgroundColor}
				p={1}
				borderTopRadius="lg"
				borderBottomRadius={attached === true ? 0 : "lg"}
				w="max-content"
				fontWeight="700"
				{...props}
			>
				{values.map((value, index) => {
					const selected = selectedIndex === index
					return (
						<SegmentedControlTab
							selected={selected}
							disabled={disabled}
							key={index}
							onSelect={() => setSelectedIndex(index)}
						>
							{value}
							{selected && (
								<MotionBox
									layoutId="slider"
									position="absolute"
									px={2}
									py={3}
									top="0px"
									left="0px"
									right="0px"
									bottom="0px"
									borderRadius="md"
									backgroundColor={boxBackgroundColor}
									cursor="default"
									width="100%"
									userSelect="none"
									zIndex="-1"
									boxShadow="0px 1px 2px 0px rgba(149, 157, 165, 0.2)"
								/>
							)}
						</SegmentedControlTab>
					)
				})}
			</Stack>
		</AnimateSharedLayout>
	)
}

export default SegmentedControl
