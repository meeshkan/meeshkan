import React, { useState } from 'react';
import { AspectRatio, Button, Text, useColorModeValue } from '@chakra-ui/react';
import VideoPlayer from '../../atoms/video-player';
import { generateVideo } from 'apps/webapp/utils/user-story-helpers';

type VideoProps = {
	video: string | null;
	startEventId: string;
	endEventId: string;
	userStoryId: string;
};

export const UserStoryVideo = ({
	video,
	startEventId,
	endEventId,
	userStoryId,
}: VideoProps) => {
	const aspectRatioBorderColor = useColorModeValue('gray.300', 'gray.700');
	const [loading, setLoading] = useState(false);
	return (
		<>
			{video ? (
				<VideoPlayer
					src={video}
					onStart={() => mixpanel.track('User story video play started')}
					onEnded={() => mixpanel.track('User story video play finished')}
				/>
			) : (
				<AspectRatio
					ratio={16 / 9}
					display="flex"
					justifyContent="center"
					alignItems="center"
					border="1px solid"
					borderRadius="lg"
					borderColor={aspectRatioBorderColor}
				>
					<>
						<Button
							colorScheme="gray"
							isLoading={loading}
							loadingText="Generating video"
							onClick={() => {
								generateVideo(
									startEventId,
									endEventId,
									userStoryId,
									setLoading
								);
							}}
						>
							Generate Video
						</Button>
						{loading ? (
							<Text textAlign="center" mt={8}>
								A video should be generated in 15-30 seconds.
							</Text>
						) : null}
					</>
				</AspectRatio>
			)}
		</>
	);
};
