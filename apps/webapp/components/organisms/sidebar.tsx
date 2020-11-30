import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { useCycle } from 'framer-motion';
import MotionStack from '../atoms/motion-stack';
import SideBarHeader from '../molecules/sidebar-header';
import SideBarBody from '../molecules/sidebar-body';

const SideBar = (props) => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const [isSmallScreen] = useMediaQuery('(max-width: 62em)');
	const stackSmallHeight = isOpen ? '100vh' : 'auto';

	return (
		<MotionStack
			p={4}
			as="nav"
			rounded="lg"
			bg={useColorModeValue('white', 'gray.900')}
			w="100%"
			maxW={['100%', '100%', '100%', '256px']}
			h={[stackSmallHeight, '100%', '100%', '100%']}
			animate={isOpen ? 'open' : 'closed'}
			initial={false}
			{...props}
		>
			<Flex direction="column" h="full">
				<SideBarHeader toggle={() => toggleOpen()} />
				{(isOpen || !isSmallScreen) && <SideBarBody />}
			</Flex>
		</MotionStack>
	);
};

export default SideBar;
