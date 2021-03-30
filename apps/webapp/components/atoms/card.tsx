import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

const Card = (props: BoxProps) => {
	const backgroundColor = useColorModeValue('white', 'gray.900');
	return (
		<Box
			p={4}
			rounded="lg"
			bg={backgroundColor}
			{...props}
		/>
	);
};

export default Card;
