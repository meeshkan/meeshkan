import {
	ListItem,
	Button,
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
		<Button
			as={Link}
			variant="ghost"
			size="sm"
			fontWeight="500"
			colorScheme="gray"
			_active={{
				backgroundColor: useColorModeValue('gray.100', 'gray.800'),
				color: useColorModeValue('gray.900', 'white'),
			}}
			_hover={{
				backgroundColor: useColorModeValue('gray.50', 'gray.800'),
				textDecoration: 'none',
			}}
			w="full"
			d="flex"
			alignItems="center"
			justifyContent="space-between"
		>
			<ListItem>{truncate(title, 30)}</ListItem>
			<Avatar size="xs" name={author} src={avatar} ml={4} />
		</Button>
	);
};

export default LinearListItem;
