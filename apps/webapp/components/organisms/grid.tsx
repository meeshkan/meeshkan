import { Box, useColorModeValue } from '@chakra-ui/react';

const Grid = (props) => {
	return (
		<Box
			p={8}
			bg={useColorModeValue('gray.100', 'gray.800')}
			w="100%"
			h="100%"
			rounded="md"
			{...props}
		/>
	);
};

export default Grid;
