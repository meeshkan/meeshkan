import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { MotionListItem } from './motion';
import { DragHandleIcon } from '@frontend/chakra-theme';
import { AxisBox2D, BoxDelta, useDragControls } from 'framer-motion';
import { ScriptCommand } from '@frontend/meeshkan-types';
import { Position, useMeasurePosition } from '../../hooks/use-measure-position';

type StoryStepProps = {
	stepNumber: number;
	stepName: string;
	scriptCommand: ScriptCommand;
	selectedStep: Number;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
	updatePosition: (index: number, pos: Position) => void;
	updateOrder: (index: number, dragOffset: number) => void;
	index: number
};

export const SideStep = ({
	stepNumber,
	stepName,
	scriptCommand,
	selectedStep,
	setSelectedStep,
	updatePosition,
	updateOrder,
	index
}: StoryStepProps) => {
	const hoverBackgroundColor = useColorModeValue('white', 'gray.900');
	const selectedBlue = useColorModeValue('blue.500', 'blue.300');
	const [isDragging, setDragging] = useState(false);
	const ref = useMeasurePosition((pos: Position) => updatePosition(index, pos));
	const dragControls = useDragControls();
	function startDrag(
		event:
			| MouseEvent
			| React.MouseEvent<Element, MouseEvent>
			| React.TouchEvent<Element>
			| React.PointerEvent<Element>
			| TouchEvent
			| PointerEvent
	) {
		dragControls.start(event, { snapToCursor: true });
		setDragging(true);
	}

	return (
		<MotionListItem
			as={Flex}
			ref={ref}
			layout
			initial={false}
			whileTap={{
				transform: 'rotate(-1deg)'
			}}
			zIndex={isDragging ? 3 : 1}
			drag="y"
			dragListener={false}
			onDragEnd={() => {
				setDragging(false);
			}}
			dragControls={dragControls}
			onViewportBoxUpdate={(_viewportBox: AxisBox2D, delta: BoxDelta) => {
				return isDragging && updateOrder(index, delta.y.translate);
			}}
			cursor="pointer"
			my={3}
			onClick={() => setSelectedStep(scriptCommand.sIndex)}
			transition={{ type: "tween", duration: 0.1 }}
		>
			<Flex
				justify="center"
				align="center"
				borderRadius="full"
				h={6}
				w={6}
				minW={6}
				fontWeight="600"
				fontSize="sm"
				mt={2}
				mr={4}
				backgroundColor={
					selectedStep === scriptCommand?.sIndex ? selectedBlue : 'transparent'
				}
				color={
					selectedStep === scriptCommand?.sIndex
						? hoverBackgroundColor
						: 'inherit'
				}
			>
				{stepNumber}
			</Flex>
			<Box
				d="flex"
				p={3}
				borderRadius="lg"
				w="full"
				border="1px solid"
				borderColor={
					selectedStep === scriptCommand?.sIndex ? selectedBlue : 'transparent'
				}
				backgroundColor={hoverBackgroundColor}
				_hover={{
					boxShadow: 'sm',
				}}
				// _active={{ transform: 'rotate(-1deg)' }}
				sx={{
					':hover #drag-handle': {
						visibility: 'visible',
					},
				}}
			>
				<Text
					flex="1"
					fontWeight="400"
					lineHeight="1.4"
					fontSize="md"
					wordBreak="break-all"
				>
					{stepName}
				</Text>
				<Box
					cursor="grab"
					_active={{ cursor: 'grabbing' }}
					onPointerDown={startDrag}
					onPointerUp={() => {
						setDragging(false);
					}}
				>
					<DragHandleIcon
						id="drag-handle"
						visibility="hidden"
						color="gray.300"
					/>
				</Box>
			</Box>
		</MotionListItem>
	);
};
