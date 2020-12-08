import React, { forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';

export const Bar = forwardRef(function Bar(props, ref) {
	return (
		<Box
			as="span"
			pos="absolute"
			h="1"
			bg="blue.500"
			// @ts-ignore
			ref={ref}
			{...props}
		/>
	);
});

const MotionBox = motion.custom(Box);
const MotionBar = motion.custom(Bar);

const variants: Variants = {
	active: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
		transition: {
			when: 'afterChildren',
		},
	},
};

const bar1Variants: Variants = {
	active: {
		left: ['-5%', '130%'],
		width: ['5%', '100%'],
		transition: {
			duration: 2,
			ease: 'easeInOut',
			repeat: Infinity,
		},
	},
	// exit: {
	//   left: '130%',
	//   width: '100%',
	//   transition: {
	//     duration: 2,
	//     ease: 'easeInOut',
	//   },
	// },
};

const bar2Variants: Variants = {
	active: {
		left: ['-80%', '110%'],
		width: ['80%', '10%'],
		transition: {
			duration: 0.5,
			delay: 0.5,
			ease: 'easeInOut',
			repeat: Infinity,
		},
	},
	exit: {
		left: '110%',
		width: '10%',
		transition: {
			duration: 0.5,
			delay: 0.5,
			ease: 'easeInOut',
		},
	},
};

function LinearProgressBar() {
	return (
		<MotionBox
			pos="absolute"
			w="75.6%"
			h="1"
			overflow="hidden"
			role="progressbar"
			variants={variants}
			animate="active"
			exit="exit"
		>
			<Box as="span" pos="absolute" w="full" h="1" bg="blue.100" />
			<MotionBar variants={bar1Variants} />
			<MotionBar variants={bar2Variants} />
		</MotionBox>
	);
}

export default LinearProgressBar;
