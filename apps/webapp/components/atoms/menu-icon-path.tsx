import { motion } from 'framer-motion';
import {
	AnimationProps,
	SVGPathProperties,
} from 'framer-motion/types/motion/types';

const MenuIconPath = (props: SVGPathProperties & AnimationProps) => (
	<motion.path
		fill="transparent"
		strokeWidth="2"
		stroke="currentColor"
		strokeLinecap="round"
		{...props}
	/>
);

export default MenuIconPath;
