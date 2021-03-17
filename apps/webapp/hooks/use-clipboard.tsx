import { useEffect } from 'react';
import { useClipboard as useChakraClipboard, useToast } from '@chakra-ui/react';

type ClipboardProps = {
	toastTitle: string;
	toastMessage: string;
	text: string;
	status: 'info' | 'success' | 'warning' | 'error';
};

export const useClipboard = ({
	toastTitle,
	toastMessage,
	text,
	status,
}: ClipboardProps) => {
	const toast = useToast();
	const { hasCopied, onCopy } = useChakraClipboard(text);

	useEffect(() => {
		if (hasCopied) {
			toast({
				position: 'bottom-right',
				title: toastTitle,
				description: toastMessage,
				isClosable: true,
				variant: 'clean',
				status: status,
			});
		}
	}, [hasCopied, toast, toastMessage, status, toastTitle]);

	return { hasCopied, onCopy };
};
