import { Box, useColorModeValue } from '@chakra-ui/react';

const Grid = (props) => {
	return (
		<Box
			p={8}
			bg={useColorModeValue('white', 'gray.900')}
			w="100%"
			h="100%"
			rounded="lg"
			{...props}
		/>
	);
};

export default Grid;
