import React, { useState } from "react"
import {
	Stack,
	Box,
	Text,
	Flex,
	IconButton,
	DarkMode,
	useColorMode,
} from "@chakra-ui/react"
import { motion, useReducedMotion } from "framer-motion"
import {
	CheckmarkIcon,
	XmarkIcon,
	SunIcon,
	MoonIcon,
} from "../../../../theme/icons"

const Test = ({ success, testCase, priority, animate, colorMode }) => {
	const MotionBox = motion.custom(Box)

	const shouldReduceMotion = useReducedMotion()

	const transition = {
		duration: 2,
		ease: "easeInOut",
		times: [0, 0.2, 0.5, 0.8, 1],
		loop: shouldReduceMotion ? null : Infinity,
		repeatDelay: 1,
	}

	const mark = {
		light: {
			success: { stroke: "cyan.500", background: "cyan.50" },
			failure: { stroke: "red.500", background: "red.50" },
			text: { cyan: "cyan.500", yellow: "yellow.500", red: "red.500" },
		},
		dark: {
			success: { stroke: "cyan.100", background: "rgba(51, 204, 174, 0.25)" },
			failure: { stroke: "red.100", background: "rgba(220, 24, 83, 0.25)" },
			text: { cyan: "cyan.200", yellow: "yellow.200", red: "red.200" },
		},
	}

	return (
		<MotionBox
			w="100%"
			p={3}
			mx="auto"
			borderRadius="md"
			initial={{ y: 0, scale: 1, opacity: 1 }}
			animate={animate}
			transition={transition}
			backgroundColor={colorMode === "light" ? "white" : "gray.900"}
			d="flex"
			alignItems="center"
			justifyContent="space-between"
			boxShadow="0px 8px 24px rgba(149, 157, 165, 0.2)"
		>
			<Flex alignItems="center">
				<Box
					boxSize={8}
					mr={4}
					rounded="full"
					backgroundColor={
						success
							? mark[colorMode].success.background
							: mark[colorMode].failure.background
					}
					d="flex"
					alignItems="center"
					justifyContent="center"
				>
					{success === true ? (
						<CheckmarkIcon color={mark[colorMode].success.stroke} />
					) : (
						<XmarkIcon color={mark[colorMode].failure.stroke} />
					)}
				</Box>
				<Text
					color={colorMode === "light" ? "gray.700" : "gray.200"}
					fontSize={["8px", "8px", "sm"]}
					fontWeight={600}
				>
					{testCase}
				</Text>
			</Flex>
			{priority && (
				<Text
					color={
						priority >= 4
							? mark[colorMode].text.cyan
							: priority >= 3
							? mark[colorMode].text.yellow
							: priority >= 0
							? mark[colorMode].text.red
							: "gray.500"
					}
					fontSize="sm"
					fontWeight={900}
				>
					{`P` + priority}
				</Text>
			)}
		</MotionBox>
	)
}

const PrioritizeTests = () => {
	// const [colorMode, setColorMode] = useState("light" || "dark")
	const { colorMode, toggleColorMode } = useColorMode()
	const tests = [
		{
			success: false,
			testCase: "User cannot send negative value of currency",
			priority: 3,
			animate: {
				y: [0, 0, 74, 74, 74],
			},
		},
		{
			success: false,
			testCase: "User can only see their own data",
			priority: 1,
			animate: {
				y: [0, 0, -64, -64, -64],
			},
		},
		{
			success: true,
			testCase: "User authenticated as root can remove client",
			priority: 5,
			animate: {
				y: [0, 0, 10, 10, 10],
				opacity: [1, 1, 1, 0.5, 0.5],
			},
		},
		{
			success: true,
			testCase: "User authenticated can send money to a client.",
			priority: 5,
			animate: {
				y: [0, 0, 10, 10, 10],
				opacity: [1, 1, 1, 0.5, 0.5],
			},
		},
		{
			success: false,
			testCase: "Only root user authenticated can view all client data",
			priority: 1,
			animate: {
				y: [0, -180, -246, -246, -246],
				scale: [1, 1, 0.95, 0.95, 0.95],
			},
		},
	]
	return (
		<>
			<Stack
				w={[300, 360, 460]}
				h={380}
				backgroundColor={colorMode === "light" ? "gray.50" : "gray.800"}
				borderRadius="md"
				p={4}
				spacing={4}
			>
				{tests.map((test, index) => (
					<Test
						key={index}
						success={test.success}
						testCase={test.testCase}
						priority={test.priority}
						animate={test.animate}
						colorMode={colorMode}
					/>
				))}
				<IconButton
					aria-label="color mode icon"
					// @ts-ignore
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
					colorScheme="gray"
				/>
			</Stack>
		</>
	)
}

export default PrioritizeTests
