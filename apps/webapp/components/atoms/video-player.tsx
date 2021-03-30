import React from 'react';
import {
	useBreakpointValue,
	useColorModeValue,
	useToken,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { BaseReactPlayerProps } from 'react-player/base';
import { PlayIcon } from '@frontend/chakra-theme';

type VideoPlayerProps = {
	src: string;
	performant?: boolean;
};

const VideoPlayer = ({
	src,
	performant = false,
	onStart,
	onEnded,
}: VideoPlayerProps & BaseReactPlayerProps) => {
	const [gray100, gray200, gray700, gray800] = useToken('colors', [
		'gray.100',
		'gray.200',
		'gray.700',
		'gray.800',
	]);
	const borderColor = useColorModeValue(gray200, gray700);
	const backgroundColor = useColorModeValue(gray100, gray800);
	const maxHeight = useBreakpointValue({
		base: '75vw',
		md: '15vw',
	});

	return (
		<ReactPlayer
			light={performant ? true : false}
			playIcon={<PlayIcon boxSize={12} color="white" />}
			controls
			loop
			onStart={onStart}
			onEnded={onEnded}
			url={src}
			style={{
				maxWidth: 'fit-content',
				maxHeight: maxHeight,
				borderRadius: 8,
				border: '1px solid',
				borderColor,
				overflow: 'hidden',
				backgroundColor,
			}}
		/>
	);
};

export default VideoPlayer;
