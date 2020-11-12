import { Flex, Image, Text, Box, Code, DarkMode } from '@chakra-ui/core'

type CardProps = {
	title: string,
	tag?: string,
	width?: string,
	height?: string,
}

const colorSchemePerTag = {
	blog: 'cyan',
	docs: 'blue',
	'use-cases': 'yellow',
}

const Card = ({ title, tag, width, height }: CardProps) => {
	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			h="100vh"
			userSelect="none"
		>
			<Box
				w={`${width}px`}
				h={`${height}px`}
				bg="gray.800"
				overflow="hidden"
			>
				<Flex
					justifyContent="center"
					flexDirection="column"
					alignItems="center"
					h="100%"
					w="100%"
				>
					<Image
						src="/static/images/logo.svg"
						mb={4}
					/>
					<Text
						as="span"
						color="gray.500"
						mb={6}
						fontWeight={500}
					>
						Pre-release workflow for confidence in your merge to production
					</Text>
					<Flex
						alignItems="center"
						flexDirection="column"
						boxShadow="rgba(0, 0, 0, 0.25) 0px 30px 60px"
						border="1px solid"
						borderColor="gray.500"
						borderRadius="4px"
						w="75%"
					>
						<Image
							src="/static/images/window-controls.svg"
							w="100%"
						/>
						<Flex
							justify="center"
							align="center"
							textAlign="center"
							w="100%"
							p={5}
							backgroundColor="gray.900"
						>
							<Box>
								{tag && (
									<DarkMode>
										<Code
											textTransform="uppercase"
											colorScheme={Object.keys(colorSchemePerTag).includes(tag)
												? colorSchemePerTag[tag]
												: 'red'
											}
											fontStyle="italic"
											fontWeight={600}
											py={2}
											mb={3}
										>
											{tag}
										</Code>
									</DarkMode>
								)}
								<Text
									fontWeight={900}
									fontSize="3xl"
									letterSpacing={1}
									color="gray.50"
									lineHeight="tall"
								>
									{title || process.env.TITLE_PLACEHOLDER}
								</Text>
							</Box>
						</Flex>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	)
}

export default Card
