import {
	Box,
	Stack,
	Flex,
	Text,
	Badge,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	Select,
	SimpleGrid,
	Heading,
	Divider,
	useColorModeValue
} from '@chakra-ui/react';
import Card from '../atoms/card'
import StatCard from '../molecules/stat-card'
import GridCard from '../molecules/grid-card'

const Grid = (props) => {
	return (
		<Stack
			p={[6, 6, 0, 0]}
			w="100%"
			h="100%"
			rounded="lg"
			spacing={6}
			{...props}
		>
			<Flex
				align="center"
				justify="space-between"
			>
				<Heading
					as="h2"
					fontSize="md"
					lineHeight="short"
				>
					Last 7 Days
				</Heading>
				<Flex align="center">
					<Heading
						as="h2"
						fontSize="md"
						display="inline"
						lineHeight="short"
						color={useColorModeValue('gray.600', 'gray.400')}
						mr={3}
					>
						Release
					</Heading>
					<Select
						placeholder="v0.0.1"
						variant="outline"
						rounded="md"
						size="sm"
					/>
				</Flex>
			</Flex>
			<Flex h="100%" w="100%" direction={['column', 'column', 'row', 'row']}>
				<Stack spacing={6} h="100%" w="100%" flex="1">
					<Flex
						as={Card}
						justify="space-between"
						align={['center', 'stretch', 'stretch', 'stretch']}
						direction={['column', 'row', 'row', 'row']}
					>
						<StatCard
							title="Confidence Score"
							value={98}
							percentageChange={19}
							dataPoints={4036}
						/>
						<StatCard
							title="Test Coverage"
							value={68}
							percentageChange={-2}
							dataPoints={2227}
							my={[8, 0, 0, 0]}
						/>
						<StatCard
							isPercentage={false}
							title="Test Run"
							value={71897}
							percentageChange={12}
							dataPoints={70946}
						/>
					</Flex>
					<Flex flex="1" w="full">
						<SimpleGrid
							columns={[1, 1, 2, 2]}
							spacingX={6}
							spacingY={6}
							w="100%"
							h="100%"
						>
							<Card height={['200px', '150px', 'auto', "auto"]} />
							<Card height={['200px', '150px', 'auto', "auto"]} />
							<Card height={['200px', '150px', 'auto', "auto"]} />
							<Card height={['200px', '150px', 'auto', "auto"]} />
						</SimpleGrid>
					</Flex>
				</Stack>
				<Flex
					mt={[6, 6, 0, 0]}
					ml={[0, 0, 6, 6]}
				>
					<SimpleGrid
						columns={1}
						spacingX={6}
						spacingY={6}
						w="100%"
						h="100%"
					>
						<GridCard title="Activity" />
						<GridCard title="Linear Tickets" />
					</SimpleGrid>
				</Flex>
			</Flex>
		</Stack>
	);
};

export default Grid;
