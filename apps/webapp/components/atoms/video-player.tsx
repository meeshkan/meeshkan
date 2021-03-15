import React, { SourceHTMLAttributes } from 'react';
import {
	useBreakpointValue,
	useColorModeValue,
	useToken,
} from '@chakra-ui/react';

type VideoPlayerProps = {
	children: SourceHTMLAttributes<HTMLSourceElement>;
};

const VideoPlayer = ({ children }: VideoPlayerProps) => {
	const [gray200, gray700] = useToken('colors', ['gray.200', 'gray.700']);
	const maxHeight = useBreakpointValue({
		base: '75vw',
		md: '15vw',
	});
	return (
		<video
			style={{
				borderRadius: '6px',
				height: '100%',
				width: '100%',
				maxHeight: maxHeight,
				border: '1px solid',
				borderColor: useColorModeValue(gray200, gray700),
				backgroundColor: 'black',
			}}
			controls
		>
			{children}
			Your browser does not support the video tag.
		</video>
	);
};

export default VideoPlayer;
