import { LogoIcon } from '@frontend/chakra-theme';
import { Flex, Button, LightMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

const AuthScreen = () => {
	const mixpanel = useAnalytics();
	const router = useRouter();

	return (
		<Flex align="center" justify="center" direction="column" h="100vh">
			<LogoIcon width="auto" height={10} />
			<LightMode>
				<Button
					colorScheme="blue"
					mt={5}
					onClick={() => {
						mixpanel.track('Sign In');
						router.push(`/api/login${
							router.asPath ? `?redirectTo=${router.asPath}` : ''
						}`);
					}}
				>
					Sign in / Sign up
				</Button>
			</LightMode>
		</Flex>
	);
};

export default AuthScreen;
