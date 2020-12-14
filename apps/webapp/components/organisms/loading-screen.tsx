import { Flex, Spinner, FlexProps } from '@chakra-ui/react';
import { LogoIcon } from '@frontend/chakra-theme';

const LoadingScreen = (props: FlexProps) => {
	return (
		<Flex
			align="center"
			justify="center"
			direction="column"
			w="100%"
			{...props}
		>
			<LogoIcon width="auto" height={10} />
			<Spinner size="xl" mt={5} />
		</Flex>
	);
};

export default LoadingScreen;
