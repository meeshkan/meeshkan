import { useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import MotionButton from '../atoms/motion-button';
import { transparentize } from '@chakra-ui/theme-tools';

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 300, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 300 },
		},
	},
};

const NavButton = (props) => {
	const [isMobile] = useMediaQuery('(max-width: 30em)');
	return (
		<MotionButton
			size="sm"
			variant="ghost"
			colorScheme="gray"
			width="100%"
			justifyContent="flex-start"
			alignItems="center"
			fontWeight={500}
			fontSize="16px"
			color={useColorModeValue('gray.500', 'gray.300')}
			_active={{
				backgroundColor: useColorModeValue('gray.100', 'gray.900'),
				color: useColorModeValue('gray.900', 'white'),
			}}
			_hover={{
				backgroundColor: useColorModeValue(
					'gray.50',
					transparentize('gray.900', 0.5)
				),
			}}
			variants={isMobile ? variants : {}}
			{...props}
		/>
	);
};

export default NavButton;
