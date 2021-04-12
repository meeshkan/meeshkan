import { LogoIcon } from '@frontend/chakra-theme';
import { Flex, Button, LightMode } from '@chakra-ui/react';
import { goToLogin } from '../../utils/user';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

const AuthScreen = () => {
	const mixpanel = useAnalytics();

	return (
		<Flex align="center" justify="center" direction="column" h="100vh">
			<LogoIcon width="auto" height={10} />
			<LightMode>
				<Button
					colorScheme="blue"
					mt={5}
					onClick={() => {
						mixpanel.track('Sign In');
						goToLogin();
					}}
				>
					Sign in / Sign up
				</Button>
			</LightMode>
		</Flex>
	);
};

export default AuthScreen;
