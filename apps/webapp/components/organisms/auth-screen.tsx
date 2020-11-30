import { LogoIcon } from '@frontend/chakra-theme';
import { Flex, Button } from '@chakra-ui/react';
import { goToLogin } from '../../utils/user';

const AuthScreen = () => {
	return (
		<Flex align="center" justify="center" direction="column" h="100vh">
			<LogoIcon width="auto" height={10} />
			<Button colorScheme="red" mt={5} onClick={() => goToLogin()}>
				Sign in / Sign up
			</Button>
		</Flex>
	);
};

export default AuthScreen;
