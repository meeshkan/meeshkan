import React, { ReactNode } from 'react';
import { Stack, useColorModeValue } from '@chakra-ui/react';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children, ...props }: LayoutProps) => {
	const backgroundColor = useColorModeValue('gray.100', 'gray.800');
	return (
		<Stack
			p={[0, 6, 6, 6]}
			bg={backgroundColor}
			w="100%"
			h={['100%', '100%', '100%', '100vh']}
			mt={[12, 0, 0, 0]}
			d="flex"
			direction={['column', 'column', 'column', 'row']}
			spacing={[0, 6, 6, 6]}
			{...props}
		>
			{children}
		</Stack>
	);
};
export default Layout;
