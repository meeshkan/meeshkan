import { Button, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@frontend/chakra-theme';

const ColorModeButton = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Button
			size="sm"
			leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
			onClick={toggleColorMode}
			w="100%"
			colorScheme="gray"
		>
			{colorMode === 'light' ? 'dark' : 'light'} mode
		</Button>
	);
};

export default ColorModeButton;
