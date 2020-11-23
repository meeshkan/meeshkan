import {
    ListItem,
    Flex,
    Text,
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
			<Text color={useColorModeValue('gray.900', 'gray.200')}>
				{truncate(title, 30)}
			</Text>
			<Avatar
				size="xs"
				name={author}
				src={avatar}
				ml={4}
			/>
		</ListItem>
	);
};

export default LinearListItem;
