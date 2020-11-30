import { LogoIcon } from '@frontend/chakra-theme';
import { Flex, Spinner } from '@chakra-ui/react';

const LoadingScreen = () => {
	return (
		<Flex align="center" justify="center" direction="column" h="100vh">
			<LogoIcon width="auto" height={10} />
			<Spinner size="xl" mt={5} />
		</Flex>
	);
};

export default LoadingScreen;
