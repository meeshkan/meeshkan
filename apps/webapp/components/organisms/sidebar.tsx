import { useEffect } from 'react';
import {
	Flex,
	StackProps,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCycle } from 'framer-motion';
import MotionStack from '../atoms/motion-stack';
import SideBarHeader from '../molecules/sidebar-header';
import SideBarBody from '../molecules/sidebar-body';

const SideBar = (props: StackProps) => {
	const { pathname } = useRouter();
	const [isOpen, toggleOpen] = useCycle(false, true);
	const [isSmallScreen] = useMediaQuery('(max-width: 62em)');
	const stackSmallHeight = isOpen ? '100%' : 'auto';
	const backgroundColor = useColorModeValue('white', 'gray.900');

	useEffect(() => {
		if (isOpen) {
			toggleOpen();
		}
	}, [pathname, isOpen, toggleOpen]);

	return (
		<MotionStack
			p={4}
			as="nav"
			borderRadius={[0, '0.5rem', '0.5rem', '0.5rem']}
			bg={backgroundColor}
			w="100%"
			maxW={['100%', '100%', '100%', '256px']}
			h={[stackSmallHeight, '100%', '100%', '100%']}
			position={['fixed', 'static', 'static', 'static']}
			top={[0, 'auto', 'auto', 'auto']}
			zIndex={10}
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
