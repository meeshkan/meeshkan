import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
	Flex,
	FlexProps,
	Text,
	Badge,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import commaNumber from 'comma-number';
import { useColorFromNumber } from '../../hooks/use-color-from-number';

type StatCardProps = {
	title: string;
	value?: number;
	isPercentage?: boolean;
	percentageChange?: number;
	dataPoints?: number;
	isNA?: boolean;
} & FlexProps;

const StatCard = ({
	title,
	value,
	isPercentage = true,
	percentageChange,
	dataPoints,
	isNA = false,
	...props
}: StatCardProps) => {
	const colorFromValue = useColorFromNumber();
	const grayColor = useColorModeValue('gray.600', 'gray.200');
	const isPositiveChange = percentageChange >= 0;
	const valueColor = isNA || !isPercentage ? grayColor : colorFromValue(value);

	return (
		<Flex {...props}>
			<Stat>
				<StatLabel fontSize="md">{title}</StatLabel>
				<StatNumber mt={4} mb={3}>
					<Heading
						color={valueColor}
						fontSize="5xl"
						fontWeight={800}
						d="inline"
					>
						{isNA
							? 'N/A'
							: isPercentage
							? value.toPrecision(3)
							: commaNumber(value)}
					</Heading>
					{isPercentage && !isNA && (
						<Text fontSize="md" fontWeight={300} d="inline">
							/100
						</Text>
					)}
				</StatNumber>
				<StatHelpText>
					{isNA ? (
						<Text as="span" fontStyle="italic">
							coming soon!
						</Text>
					) : (
						<>
							<Badge
								variant="subtle"
								colorScheme={isPositiveChange ? 'cyan' : 'red'}
								rounded="lg"
								mr={2}
								fontSize="sm"
								p={2}
							>
								{isPositiveChange ? <ArrowUpIcon /> : <ArrowDownIcon />}
								{Math.abs(percentageChange).toFixed(2)}%
							</Badge>
							<Badge
								variant="subtle"
								colorScheme="gray"
								fontWeight={400}
								rounded="lg"
								textTransform="none"
								p={2}
								fontSize="sm"
							>
								from {commaNumber(dataPoints)} data points
							</Badge>
						</>
					)}
				</StatHelpText>
			</Stat>
		</Flex>
	);
};

export default StatCard;
