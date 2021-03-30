import { FC } from 'react';
import {
	Text,
	Flex,
	ListItem,
	ListIcon,
	useColorModeValue,
} from '@chakra-ui/react';
import { IconProps } from '@chakra-ui/icon';

type ActivityListItemProps = {
	title: string;
	subtitle: string;
	icon: FC<IconProps>;
};

const ActivityListItem = ({ title, subtitle, icon }: ActivityListItemProps) => {
	const titleColor = useColorModeValue('gray.900', 'gray.200');
	return (
		<ListItem as={Flex} align="center">
			<ListIcon as={icon} ml={2} mr={4} />
			<Flex direction="column">
				<Text color={titleColor}>{title}</Text>
				<Text fontSize="sm">{subtitle}</Text>
			</Flex>
		</ListItem>
	);
};

export default ActivityListItem;
