import {
	ListItem,
	Flex,
	Link,
	Avatar,
	useColorModeValue,
} from '@chakra-ui/react';
import truncate from 'truncate';

type LinearListItemProps = {
	title: string;
	author: string;
	avatar: string;
};

const LinearListItem = ({ title, author, avatar }: LinearListItemProps) => {
	return (
		<ListItem as={Flex} align="center" justify="space-between">
			<Link color={useColorModeValue('gray.900', 'gray.200')}>
				{truncate(title, 30)}
			</Link>
			<Avatar size="xs" name={author} src={avatar} ml={4} />
		</ListItem>
	);
};

export default LinearListItem;
