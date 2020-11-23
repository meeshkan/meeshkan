import {
	Text,
    Flex,
	ListItem,
	ListIcon,
	useColorModeValue,
} from '@chakra-ui/react';

type ActivityListItemProps = {
    title: string;
    subtitle: string;
    icon: string;
};

const ActivityListItem = ({ title, subtitle, icon }: ActivityListItemProps) => {
	return (
		<ListItem as={Flex} align="center">
			<ListIcon as={icon} ml={2} mr={4} />
			<Flex direction="column">
				<Text color={useColorModeValue('gray.900', 'gray.200')}>{title}</Text>
				<Text fontSize="sm">{subtitle}</Text>
			</Flex>
		</ListItem>
	);
};

export default ActivityListItem;
