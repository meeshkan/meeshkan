import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { useCycle } from 'framer-motion';
import MotionStack from '../atoms/motion-stack';
import SideBarHeader from '../molecules/sidebar-header';
import SideBarBody from '../molecules/sidebar-body';

const SideBar = (props) => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const [isMobile] = useMediaQuery('(max-width: 30em)');

	return (
		<MotionStack
			p={4}
			as="nav"
			rounded="lg"
			bg={useColorModeValue('white', 'gray.800')}
			w="100%"
			maxW={['100%', '256px', '256px', '256px']}
			h={[isOpen ? '100vh' : 'auto', '100%', '100%', '100%']}
			animate={isOpen ? 'open' : 'closed'}
			initial={false}
			{...props}
		>
			<Flex direction="column" h="full">
				<SideBarHeader toggle={() => toggleOpen()} />
				{(isOpen || !isMobile) && <SideBarBody />}
			</Flex>
		</MotionStack>
	);
};

export default SideBar;
