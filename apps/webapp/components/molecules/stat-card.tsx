import {
	Flex,
	FlexProps,
	Text,
	Badge,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import commaNumber from 'comma-number';
import { useColorFromValue } from '../../hooks/use-color-from-value'

type StatCardProps = {
	title: string;
	value: number;
	isPercentage?: boolean;
	percentageChange: number;
	dataPoints: number;
} & FlexProps;

const StatCard = ({
	title,
	value,
	isPercentage = true,
	percentageChange,
	dataPoints,
	...props
}: StatCardProps) => {
    const colorFromValue = useColorFromValue();
    const grayColor = useColorModeValue('gray.600', 'gray.200');
	const isPositiveChange = percentageChange >= 0;
	const valueColor = isPercentage
		? colorFromValue(value)
		: grayColor;

	return (
		<Flex {...props}>
			<Stat>
				<StatLabel fontSize="md">{title}</StatLabel>
				<StatNumber mt={4} mb={3}>
					<Heading
						color={valueColor}
						fontSize="4xl"
						fontWeight={800}
						d="inline"
					>
						{isPercentage ? value : commaNumber(value)}
					</Heading>
					{isPercentage && (
						<Text fontSize="md" fontWeight={300} d="inline">
							/100
						</Text>
					)}
				</StatNumber>
				<StatHelpText>
					<Badge
						variant="subtle"
						colorScheme={isPositiveChange ? 'cyan' : 'red'}
						rounded="lg"
						mr={2}
					>
						<StatArrow type={isPositiveChange ? 'increase' : 'decrease'} />
						{Math.abs(percentageChange)}%
					</Badge>
					<Badge
						variant="subtle"
						colorScheme="gray"
						fontWeight={400}
						rounded="lg"
						textTransform="none"
						p={2}
					>
						from {commaNumber(dataPoints)} data points
					</Badge>
				</StatHelpText>
			</Stat>
		</Flex>
	);
};

export default StatCard;
