import React, { ReactNode, useContext } from 'react';
import { Stack, useColorModeValue } from '@chakra-ui/react';
import { Analytics } from '@lightspeed/react-mixpanel-script';
import { UserContext } from '../../utils/user';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children, ...props }: LayoutProps) => {
	const user = useContext(UserContext);

	return (
		<Analytics
			appName="Meeshkan-webapp"
			identity={user.idToken}
			eventData={{ project: user.project }}
			profileData={{
				$avatar: user.avatar,
				$email: user.email,
				$distinct_id: user.idToken,
				$first_name: user.firstName,
				$last_name: user.lastName,
				$created: user.createdAt,
				// $transactions: "" add stripe here
			}}
		>
			<Stack
				p={[0, 6, 6, 6]}
				bg={useColorModeValue('gray.100', 'gray.800')}
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
		</Analytics>
	);
};
export default Layout;
