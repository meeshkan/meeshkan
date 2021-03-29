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
	const activeBackgroundColor = useColorModeValue('gray.100', 'gray.800');
	const activeColor = useColorModeValue('gray.900', 'white');
	const hoverBackgroundColor = useColorModeValue('gray.50', 'gray.800');
	return (
		<Button
			as={Link}
			variant="ghost"
			size="sm"
			fontWeight="500"
			colorScheme="gray"
			_active={{
				backgroundColor: activeBackgroundColor,
				color: activeColor,
			}}
			_hover={{
				backgroundColor: hoverBackgroundColor,
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
