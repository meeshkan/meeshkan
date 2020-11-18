import {
	Box,
	Flex,
	Text,
	Badge,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	Heading,
	useColorModeValue
} from '@chakra-ui/react';
import Card from '../atoms/card'
import StatCard from '../molecules/stat-card'

const Grid = (props) => {
	return (
		<Box
			p={[8, 0, 0, 0]}
			bg={useColorModeValue('white', 'gray.900')}
			w="100%"
			h="100%"
			rounded="lg"
			{...props}
		>
			<Card>
				<Flex
					justify="space-between"
					align={['center', 'center', 'stretch', 'stretch']}
					direction={['column', 'column', 'row', 'row']}
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
						my={[8, 2, 0, 0]}
					/>
					<StatCard
						isPercentage={false}
						title="Test Run"
						value={71897}
						percentageChange={12}
						dataPoints={70946}
					/>
				</Flex>
			</Card>
		</Box>
	);
};

export default Grid;
