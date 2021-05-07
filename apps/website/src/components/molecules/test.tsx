import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { CheckmarkIcon, XmarkIcon } from "../../../theme/icons"

type TestProps = {
	success: boolean
	colorMode: "light" | "dark"
	testCase: String
	priority?: Number
}

const TestComponent = ({
	success,
	colorMode,
	testCase,
	priority,
}: TestProps) => {
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
		<>
			<Box
				w="100%"
				p={3}
				mx="auto"
				borderRadius="md"
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
			</Box>
		</>
	)
}

export default TestComponent
