import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const VideoPlayer = (children) => (
	<Box
		maxW="max-content"
		border="1px solid"
		borderColor={useColorModeValue('gray.200', 'gray.700')}
		borderRadius="md"
		overflow="hidden"
	>
		<video width="320" height="240" controls>
			{children}
			Your browser does not support the video tag.
		</video>
	</Box>
);

export default VideoPlayer;
