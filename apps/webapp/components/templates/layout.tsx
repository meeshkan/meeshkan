import { ReactNode } from 'react';
import { Stack, useColorModeValue } from '@chakra-ui/react';
import './layout.module.css';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children, ...props }: LayoutProps) => {
	return (
		<Stack
			p={[0, 6, 8, 8]}
			bg={useColorModeValue('gray.100', 'gray.800')}
			w="100%"
			h={['100%', '100vh', '100vh', '100vh']}
			d="flex"
			direction={['column', 'row', 'row', 'row']}
			spacing={[0, 6, 8, 8]}
			{...props}
		>
			{children}
		</Stack>
	);
};

export default Layout;
