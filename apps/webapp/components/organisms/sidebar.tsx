import { useEffect } from 'react';
import {
	Box,
	Flex,
	StackProps,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCycle } from 'framer-motion';
import { MotionStack } from '../atoms/motion';
import SideBarHeader from '../molecules/sidebar-header';
import SideBarBody from '../molecules/sidebar-body';

const SideBar = (props: StackProps) => {
	const { pathname } = useRouter();
	const [isOpen, toggleOpen] = useCycle(false, true);
	const [isSmallScreen] = useMediaQuery('(max-width: 62em)');
	const stackSmallHeight = isOpen ? '100%' : 'auto';
	const backgroundColor = useColorModeValue('white', 'gray.900');

	/**
	 * The dependency array is purposefully missing `isOpen` & `toggleOpen`.
	 * Otherwise, the hooks body would be triggered more often than desired,
	 * which wouldn't allow the navigation dropdown to open on medium screens.
	 */
	useEffect(() => {
		if (isOpen) {
			toggleOpen();
		}
	}, [pathname]);

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
			<Flex direction="column" h="full" overflowY="auto" p={2}>
				<SideBarHeader toggle={() => toggleOpen()} />
				{(isOpen || !isSmallScreen) && (
					<Box flex="1">
						<SideBarBody />
					</Box>
				)}
			</Flex>
		</MotionStack>
	);
};

export default SideBar;
