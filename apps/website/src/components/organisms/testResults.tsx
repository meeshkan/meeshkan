import React from "react"
import {
	Box,
	Heading,
	Accordion,
	AccordionItem,
	AccordionButton,
	Flex,
	Text,
	AccordionIcon,
	AccordionPanel,
	Code,
} from "@chakra-ui/react"
import CodeBlock from "../molecules/codeBlock"
import prettier from "prettier/standalone"
import parserGraphql from "prettier/parser-graphql"

type TestProps = {
	testResults: Object
	exchangeLength: number
	test: boolean
}

const TestResults = ({ testResults, exchangeLength, test }: TestProps) => {
	return (
		<>
			<Box
				my={8}
				p={8}
				backgroundColor="gray.50"
				borderRadius="4px"
				maxW="1000px"
				maxH="700px"
				overflow="auto"
				mx="auto"
			>
				<Heading mb={4} fontWeight={900} fontSize="xl">
					Test Results:
				</Heading>
				{exchangeLength >= 1 ? (
					testResults.commands.map((command, index) => (
						<Accordion key={index}>
							{command.exchange.map((exchange, index) => (
								<AccordionItem
									key={index}
									border="none"
									mb={8}
									borderRadius="sm"
									backgroundColor="white"
								>
									<Box
										border="none"
										mb={8}
										borderRadius="sm"
										backgroundColor="white"
									>
										<AccordionButton
											_hover={{
												backgroundColor: "none",
											}}
											_focus={{
												outline: "none",
												borderBottom: "1px solid",
											}}
											_active={{
												borderBottom: "1px solid",
											}}
											borderRadius="sm"
											p={4}
											justifyContent="space-between"
										>
											<Flex>
												<Text fontWeight={600} mr={2}>
													{exchange.meta.apiType === "graphql"
														? JSON.parse(exchange.request.body)[
																"query"
														  ].startsWith("query")
															? "QUERY"
															: JSON.parse(exchange.request.body)[
																	"query"
															  ].startsWith("mutation")
															? "MUTATION"
															: JSON.parse(exchange.request.body)[
																	"query"
															  ].startsWith("subscription")
															? "SUBSCRIPTION"
															: exchange.request.method.toUpperCase()
														: exchange.request.method.toUpperCase()}
												</Text>
												<Text fontWeight={600}>{exchange.meta.path}</Text>
											</Flex>
											<AccordionIcon />
										</AccordionButton>
										<AccordionPanel py={4}>
											<Flex>
												{exchange.response.statusCode && (
													<Code
														fontWeight={700}
														mb={2}
														fontSize="md"
														colorScheme="gray"
													>
														HTTP status code: {exchange.response.statusCode}
													</Code>
												)}
											</Flex>
											{exchange.request.body && (
												<>
													<Heading as="h4" textStyle="h4" my={4}>
														Request body:
													</Heading>
													<CodeBlock className="graphql" copyButton={false}>
														{prettier.format(
															JSON.parse(exchange.request.body)["query"],
															{
																parser: "graphql",
																plugins: [parserGraphql],
															}
														)}
													</CodeBlock>
												</>
											)}
											{exchange.response.body && (
												<>
													<Heading as="h4" textStyle="h4" my={4}>
														Response body:
													</Heading>
													{exchange.response.body.startsWith("{") !== true ? (
														<CodeBlock className="html" copyButton={false}>
															{exchange.response.body}
														</CodeBlock>
													) : (
														<CodeBlock className="json" copyButton={false}>
															{JSON.stringify(
																JSON.parse(exchange.response.body),
																null,
																2
															)}
														</CodeBlock>
													)}
												</>
											)}
										</AccordionPanel>
									</Box>
								</AccordionItem>
							))}
						</Accordion>
					))
				) : (
					<Text>
						Could not build graphql tests. Endpoint schema does not contain any
						queries, mutations or subscriptions.
					</Text>
				)}
			</Box>
		</>
	)
}

export default TestResults
