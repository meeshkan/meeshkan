import React from 'react';
import { AspectRatio, useColorModeValue } from '@chakra-ui/react';

const VideoPlayer = ({ children }) => (
	<AspectRatio
		ratio={16 / 9}
		borderRadius="md"
		overflow="hidden"
		border="1px solid"
		borderColor={useColorModeValue('gray.200', 'gray.700')}
	>
		<video controls>
			{children}
			Your browser does not support the video tag.
		</video>
	</AspectRatio>
);

export default VideoPlayer;
