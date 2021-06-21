import React, { useState, PointerEvent } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { MotionFlex } from './motion';
import { DragHandleIcon } from '@frontend/chakra-theme';
import { useDragControls } from 'framer-motion';
// import { Position, useMeasurePosition } from '../../utils/use-measure-position';

type StoryStepProps = {
	stepNumber: number;
	stepName: string;
	selected: boolean;
};

export const SideStep = ({
	stepNumber,
	stepName,
	selected,
}: StoryStepProps) => {
	const hoverBackgroundColor = useColorModeValue('white', 'gray.900');
	const selectedBlue = useColorModeValue('blue.500', 'blue.300');
	const [isDragging, setDragging] = useState(false);
	const dragControls = useDragControls();
	function startDrag(event: PointerEvent<HTMLDivElement>) {
		dragControls.start(event, { snapToCursor: true });
		setDragging(true);
	}

	return (
		<MotionFlex
			layout
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			m={2}
			drag="y"
			dragListener={false}
			onDragEnd={() => {
				setDragging(false);
			}}
			zIndex={isDragging ? 3 : 1}
			dragControls={dragControls}
		>
			<Flex
				justify="center"
				align="center"
				borderRadius="full"
				h={6}
				w={6}
				fontWeight="600"
				fontSize="sm"
				mt={2}
				mr={4}
				backgroundColor={isDragging ? selectedBlue : 'transparent'}
				color={isDragging ? hoverBackgroundColor : 'inherit'}
			>
				{stepNumber}
			</Flex>
			<Flex
				p={3}
				borderRadius="lg"
				w="full"
				border="1px solid"
				borderColor={isDragging ? selectedBlue : 'transparent'}
				backgroundColor={isDragging ? hoverBackgroundColor : 'transparent'}
				_hover={{
					backgroundColor: hoverBackgroundColor,
				}}
				sx={{
					':hover #drag-handle': {
						display: 'inline-flex',
					},
				}}
			>
				<Text flex="1" fontWeight="400" lineHeight="1.4" fontSize="md">
					{stepName}
				</Text>
				<Box
					onPointerDown={startDrag}
					onPointerUp={() => {
						setDragging(false);
					}}
				>
					<DragHandleIcon id="drag-handle" display="none" color="gray.300" />
				</Box>
			</Flex>
		</MotionFlex>
	);
};
