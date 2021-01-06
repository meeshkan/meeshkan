import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { ListItem, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useColorFromNumber } from '../../hooks/use-color-from-number';

type ConfidenceBreakdownItemProps = {
	value: number;
	description: string;
};

const ConfidenceBreakdownItem = ({
	value,
	description,
}: ConfidenceBreakdownItemProps) => {
	const colorFromValue = useColorFromNumber('decimal');
	const valueAsString = (Math.round(value * 100) / 100).toFixed(2);
	return (
		<ListItem
			as={Flex}
			align="start"
			lineHeight="tall"
			borderBottom="1px solid"
			borderBottomColor={useColorModeValue('gray.100', 'gray.800')}
			pb={3}
		>
			<Text
				as="span"
				mr={3}
				color={colorFromValue(value)}
				flex="0 0 50px"
				fontSize="sm"
			>
				{value > 0 ? `+${valueAsString}` : valueAsString}
			</Text>
			{description}
		</ListItem>
	);
};

export default ConfidenceBreakdownItem;
