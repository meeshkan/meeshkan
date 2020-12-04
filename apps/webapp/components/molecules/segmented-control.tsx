import React from 'react';
import { Stack, Box, Flex } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';

type SegmentedControlTabProps = {
	children?: React.ReactNode;
	selectedIndex?: number;
	onSelect?: React.MouseEventHandler<HTMLDivElement>;
	selected?: boolean;
	disabled?: boolean;
};

function SegmentedControlTab({
	onSelect,
	children,
	disabled,
	selected,
}: SegmentedControlTabProps) {
	return (
		<Flex
			justify="center"
			backgroundColor="transparent"
			zIndex={2}
			cursor="default"
			userSelect="none"
			role="button"
			onClick={!disabled ? onSelect : undefined}
		>
			<Box
				p={2}
				backgroundColor="white"
				borderRadius="md"
				boxShadow="0px 1px 2px 0px rgba(149, 157, 165, 0.2)"
			>
				{children}
			</Box>
		</Flex>
		// <Container role="button" onClick={!disabled ? onSelect : undefined}>
		// 	<Default selected={selected}>{children}</Default>
		// </Container>
	);
}

export interface SegmentedControlChangeEvent {
	nativeEvent: {
		value: string;
		selectedSegmentIndex: number;
	};
}

export type SegmentedControlChangeEventHandler = (
	event: SegmentedControlChangeEvent
) => void;

export type SegmentedValueChangedEventHandler = (value: string) => void;

type SegmentedControlProps = {
	values: string[];
	renderItem?(item: {
		value: string;
		index: number;
		selected: boolean;
	}): React.ReactNode;
	selectedIndex?: number;
	onValueChange?: SegmentedValueChangedEventHandler;
	onChange?: SegmentedControlChangeEventHandler;
	disabled?: boolean;
	style?: React.CSSProperties;
	className?: string;
};

const SegmentedControl = ({
	style,
	className,
	values,
	onChange,
	onValueChange,
	disabled,
	selectedIndex,
	renderItem = (value) => value,
}: SegmentedControlProps) => {
	const handleChange = React.useCallback(
		(index: number) => {
			const event: SegmentedControlChangeEvent = {
				nativeEvent: {
					value: values[index],
					selectedSegmentIndex: index,
				},
			};

			if (typeof onChange === 'function') {
				onChange(event);
			}

			if (typeof onValueChange === 'function') {
				onValueChange(values[index]);
			}
		},
		[values, onChange, onValueChange]
	);
	return (
		<>
			<AnimateSharedLayout>
				<Stack
					direction="row"
					align="center"
					backgroundColor="gray.50"
					p={2}
					borderTopRadius="md"
					w="max-content"
					fontWeight={700}
				>
					{values.map((value, index) => (
						<SegmentedControlTab>
							{selected && <Slider layoutId="slider" />}
						</SegmentedControlTab>
					))}
				</Stack>
			</AnimateSharedLayout>
		</>
	);
};

export default SegmentedControl;
