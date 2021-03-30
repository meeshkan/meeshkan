import React, { ReactNode, useContext } from 'react';
import { Stack, useColorModeValue } from '@chakra-ui/react';
import { Analytics } from '@lightspeed/react-mixpanel-script';
import { UserContext } from '../../utils/user';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children, ...props }: LayoutProps) => {
	const user = useContext(UserContext);

	const backgroundColor = useColorModeValue('gray.100', 'gray.800');
	return (
		<Analytics
			appName="Meeshkan-webapp"
			identity={user.idToken}
			// This is a 'super property' which attaches information to every event.
			eventData={{
				project: user.project,
				// plan: ''
			}}
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
				bg={backgroundColor}
				w="100%"
				h={['100%', '100%', '100%', '100vh']}
				mt={[12, 0, 0, 0]}
				d="flex"
				direction={['column', 'column', 'column', 'row']}
				spacing={[0, 6, 6, 6]}
				{...props}
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
			</Stack>
		</Analytics>
	);
};
export default Layout;
