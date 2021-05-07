import React from "react"
import {
	Box,
	Flex,
	Text,
	SimpleGrid,
	useColorModeValue,
	Divider,
	Stack,
} from "@chakra-ui/react"
import { transparentize } from "@chakra-ui/theme-tools"

type DashStatProps = {
	title?: string
	score?: number
	move?: "up" | "mid" | "down"
}

const DashStat = ({ title, score, move }: DashStatProps) => {
	return (
		<>
			<Box w={["80px", "100px"]}>
				<Text fontSize="sm">{title}</Text>
				<Text
					fontWeight={900}
					color={
						score > 100
							? useColorModeValue("gray.500", "gray.300")
							: score > 85
							? useColorModeValue("cyan.500", "cyan.300")
							: useColorModeValue("yellow.500", "yellow.300")
					}
				>
					{score}
				</Text>
				<Box
					d="inline-block"
					h="6px"
					w="18px"
					// @ts-ignore
					backgroundColor={
						move === "up"
							? "transparentCyan.300"
							: transparentize("red.500", 0.5)
					}
					borderRadius="sm"
					mr={2}
				/>
				<Box
					d="inline-block"
					h="6px"
					w="32px"
					// @ts-ignore
					backgroundColor={transparentize(`gray.500`, 0.3)}
					borderRadius="sm"
				/>
			</Box>
		</>
	)
}

const ChangeItem = ({ move }: DashStatProps) => {
	return (
		<Flex py={2}>
			<Box
				d="inline-block"
				h="6px"
				w="18px"
				// @ts-ignore
				backgroundColor={
					move === "up"
						? "transparentCyan.300"
						: move === "mid"
						? transparentize("yellow.500", 0.5)
						: transparentize("red.500", 0.5)
				}
				borderRadius="sm"
				mr={2}
			/>
			<Box
				d="inline-block"
				h="6px"
				w={`${Math.random() * (195 - 80) + 80}px`}
				// @ts-ignore
				backgroundColor={transparentize(`gray.500`, 0.3)}
				borderRadius="sm"
			/>
		</Flex>
	)
}

export const MockDashboard = () => {
	return (
		<Box w="100%" h="100%">
			<Flex
				justify="space-between"
				backgroundColor={useColorModeValue("white", "gray.900")}
				boxShadow="0px 0px 24px 0px rgba(149, 157, 165, 0.2)"
				w="100%"
				p="8px"
				borderRadius="lg"
			>
				<DashStat title="Confidence score" score={98} move="up" />
				<DashStat title="Test coverage" score={81} move="down" />
				<DashStat title="Tests ran" score={71897} move="up" />
			</Flex>
			<Flex mt={4}>
				<Box
					flex="1"
					mr={4}
					backgroundColor={useColorModeValue("white", "gray.900")}
					boxShadow="0px 0px 24px 0px rgba(149, 157, 165, 0.2)"
					w="100%"
					borderRadius="lg"
					p={3}
				>
					<Text fontSize="sm" fontWeight={700} mb={1}>
						Confidence change
					</Text>
					<Divider borderColor={useColorModeValue("gray.100", "gray.800")} />
					<ChangeItem move="down" />
					<ChangeItem move="up" />
					<ChangeItem move="up" />
					<ChangeItem move="mid" />
					<ChangeItem move="down" />
				</Box>
				<Box
					backgroundColor={useColorModeValue("white", "gray.900")}
					boxShadow="0px 0px 24px 0px rgba(149, 157, 165, 0.2)"
					w="100%"
					borderRadius="lg"
					p={3}
				>
					<Text fontSize="sm" fontWeight={700} mb={1}>
						Test suite state
					</Text>
					<Divider borderColor={useColorModeValue("gray.100", "gray.800")} />
					<Flex
						mt={2}
						direction={["column", "row"]}
						align={["center", "auto"]}
						justify="space-around"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 112 112"
							height="64px"
							width="64px"
						>
							<path
								d="M 112 56 C 112 86.928 86.928 112 56 112 C 25.072 112 0 86.928 0 56 C 0 25.072 25.072 0 56 0 C 86.928 0 112 25.072 112 56 Z M 11.2 56 C 11.2 80.742 31.258 100.8 56 100.8 C 80.742 100.8 100.8 80.742 100.8 56 C 100.8 31.258 80.742 11.2 56 11.2 C 31.258 11.2 11.2 31.258 11.2 56 Z"
								fill="rgb(212, 219, 247)"
							></path>
							<path
								d="M 112 56 C 112 80.26 96.378 101.761 73.305 109.258 C 50.232 116.754 24.956 108.541 10.696 88.914 C -3.563 69.287 -3.563 42.711 10.696 23.084 C 24.956 3.457 50.232 -4.756 73.305 2.74 L 69.844 13.393 C 51.385 7.395 31.164 13.966 19.756 29.668 C 8.348 45.369 8.348 66.631 19.756 82.333 C 31.164 98.035 51.386 104.605 69.844 98.608 C 88.303 92.61 100.8 75.409 100.8 56 Z"
								fill="rgb(38, 74, 217)"
							></path>
							<path
								d="M 73.35 2.755 C 86.893 7.168 98.245 16.576 105.096 29.063 L 95.277 34.45 C 89.796 24.461 80.714 16.935 69.881 13.404 L 73.35 2.756 Z"
								fill="rgb(125, 146, 232)"
							></path>
							<path
								d="M 104.978 28.851 C 107.827 33.991 109.85 39.547 110.971 45.315 L 99.977 47.451 C 99.08 42.837 97.462 38.392 95.183 34.28 L 104.978 28.85 Z"
								fill="rgb(27, 52, 152)"
							></path>
						</svg>
						<Stack ml={[0, 4]} mt={[4, 0]} spacing={0}>
							<Flex align="center">
								<Box
									h={2}
									w={2}
									borderRadius="sm"
									backgroundColor="blue.500"
									mr={2}
								/>
								<Text fontSize="10px">80% Passing</Text>
							</Flex>
							<Flex align="center">
								<Box
									h={2}
									w={2}
									borderRadius="sm"
									backgroundColor="blue.300"
									mr={2}
								/>
								<Text fontSize="10px">12% Running</Text>
							</Flex>
							<Flex align="center">
								<Box
									h={2}
									w={2}
									borderRadius="sm"
									backgroundColor="blue.100"
									mr={2}
								/>
								<Text fontSize="10px">5% Failing</Text>
							</Flex>
							<Flex align="center">
								<Box
									h={2}
									w={2}
									borderRadius="sm"
									backgroundColor="blue.700"
									mr={2}
								/>
								<Text fontSize="10px">3% Run error</Text>
							</Flex>
						</Stack>
					</Flex>
				</Box>
			</Flex>
		</Box>
	)
}
