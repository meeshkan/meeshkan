import {
    ListItem,
    Flex,
    Text,
} from '@chakra-ui/react';
import { useColorFromNumber } from '../../hooks/use-color-from-number';

type ConfidenceBreakdownItemProps = {
    value: number;
    description: string;
};

const ConfidenceBreakdownItem = ({ value, description }: ConfidenceBreakdownItemProps) => {
	const colorFromValue = useColorFromNumber('decimal');
	value = (Math.round(value * 100) / 100).toFixed(2);
	return (
		<ListItem as={Flex} align="center" lineHeight="tall">
			<Text as="span" mr={3} color={colorFromValue(value)} w="45px">
				{value > 0 ? `+${value}` : value}
			</Text>
			{description}
		</ListItem>
	);
};

export default ConfidenceBreakdownItem;
