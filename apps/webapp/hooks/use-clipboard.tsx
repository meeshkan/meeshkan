import { useEffect } from 'react';
import {
	Box,
	useClipboard as useChakraClipboard,
	useToast,
} from '@chakra-ui/react';

export const useClipboard = (text: string, toastMessage: string) => {
	const toast = useToast();
	const { hasCopied, onCopy } = useChakraClipboard(text);

	useEffect(() => {
		if (hasCopied) {
			toast({
				position: 'bottom-right',
				render: () => (
					<Box
						color="white"
						p={4}
						bg="blue.500"
						borderRadius="md"
						fontSize="md"
					>
						{toastMessage}
					</Box>
				),
				duration: 2000,
				isClosable: true,
			});
		}
	}, [hasCopied, toast, toastMessage]);

	return { hasCopied, onCopy };
}