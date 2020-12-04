import React from 'react';
import { Stack, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { AnimateSharedLayout, motion } from 'framer-motion';

const MotionBox = motion.custom(Box);

type SegmentedControlTabProps = {
	children?: React.ReactNode;
	onSelect?: React.MouseEventHandler<HTMLDivElement>;
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
			cursor="default"
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
};

const SegmentedControl = ({ values, disabled }: SegmentedControlProps) => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	return (
		<>
			<AnimateSharedLayout>
				<Stack
					direction="row"
					align="center"
					backgroundColor={useColorModeValue('gray.200', 'gray.700')}
					p={2}
					borderTopRadius="md"
					w="max-content"
					fontWeight={700}
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
										top="2px"
										left="0px"
										right="0px"
										bottom="2px"
										borderRadius="6px"
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
		</>
	);
};

export default SegmentedControl;
