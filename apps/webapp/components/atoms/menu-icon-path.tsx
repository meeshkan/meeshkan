import { motion } from 'framer-motion';

const MenuIconPath = (props) => (
	<motion.path
		fill="transparent"
		strokeWidth="2"
		stroke="currentColor"
		strokeLinecap="round"
		{...props}
	/>
);

export default MenuIconPath;
