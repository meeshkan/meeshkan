import React, { ReactNode, useState, useContext } from 'react';
import { UserContext } from '../../utils/user';
import { Stack, useColorModeValue } from '@chakra-ui/react';
import SideBar from '../../components/organisms/sidebar';
import './layout.module.css';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children, ...props }: LayoutProps) => {
	const { projects } = useContext(UserContext);
	const [project, setProject] = useState(projects[0] || { id: -1, name: '' });
	return (
		<Stack
			p={[0, 6, 6, 6]}
			bg={useColorModeValue('gray.100', 'gray.800')}
			w="100%"
			h={['100%', '100%', '100%', '100vh']}
			d="flex"
			direction={['column', 'column', 'column', 'row']}
			spacing={[0, 6, 6, 6]}
			{...props}
		>
			<SideBar project={project} setProject={setProject} />
			{children}
		</Stack>
	);
};
export default Layout;
