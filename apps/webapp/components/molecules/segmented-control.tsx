import React, {
	ReactNode,
	MouseEventHandler,
	Dispatch,
	SetStateAction,
} from 'react';
import {
	Stack,
	Box,
	Flex,
	useColorModeValue,
	BoxProps,
} from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';
import MotionBox from '../atoms/motion-box';

type SegmentedControlTabProps = {
	children?: ReactNode;
	onSelect?: MouseEventHandler<HTMLDivElement>;
	disabled?: boolean;
	selected: boolean;
};

function SegmentedControlTab({
	onSelect,
	children,
	disabled,
	selected,
}: SegmentedControlTabProps) {
	return (
		<Flex
			position="relative"
			justify="center"
			backgroundColor="transparent"
			zIndex={0}
			cursor="pointer"
			userSelect="none"
			role="button"
			onClick={!disabled ? onSelect : undefined}
		>
			<Box
				px={2}
				py={3}
				textAlign="center"
				color={
					selected
						? useColorModeValue('gray.900', 'white')
						: useColorModeValue('gray.700', 'gray.200')
				}
			>
				{children}
			</Box>
		</Flex>
	);
}

type SegmentedControlProps = {
	values: string[];
	disabled?: boolean;
	selectedIndex: number;
	setSelectedIndex: Dispatch<SetStateAction<number>>;
	attached?: boolean;
	props?: BoxProps;
};

const SegmentedControl = ({
	values,
	disabled,
	selectedIndex,
	setSelectedIndex,
	attached = false,
	props,
}: SegmentedControlProps) => {
	return (
		<AnimateSharedLayout>
			<Stack
				direction="row"
				align="center"
				backgroundColor={useColorModeValue('gray.200', 'gray.700')}
				p={1}
				borderTopRadius="lg"
				borderBottomRadius={attached === true ? 0 : 'lg'}
				w="max-content"
				fontWeight="700"
				{...props}
			>
				{values.map((value, index) => {
					const selected = selectedIndex === index;
					return (
						<SegmentedControlTab
							selected={selected}
							disabled={disabled}
							key={index}
							onSelect={() => setSelectedIndex(index)}
						>
							{value}
							{selected && (
								<MotionBox
									layoutId="slider"
									position="absolute"
									px={2}
									py={3}
									top="0px"
									left="0px"
									right="0px"
									bottom="0px"
									borderRadius="md"
									backgroundColor={useColorModeValue('white', 'gray.900')}
									cursor="default"
									width="100%"
									userSelect="none"
									zIndex="-1"
									boxShadow="0px 1px 2px 0px rgba(149, 157, 165, 0.2)"
								/>
							)}
						</SegmentedControlTab>
					);
				})}
			</Stack>
		</AnimateSharedLayout>
	);
};

export default SegmentedControl;
