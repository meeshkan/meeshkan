import { useEffect } from 'react';
import { useClipboard as useChakraClipboard } from '@chakra-ui/react';
import { useToaster } from './use-toaster';

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
	const toaster = useToaster();
	const { hasCopied, onCopy } = useChakraClipboard(text);

	useEffect(() => {
		if (hasCopied) {
			toaster({
				title: toastTitle,
				description: toastMessage,
				status: status,
			});
		}
	}, [hasCopied, toaster, toastMessage, status, toastTitle]);

	return { hasCopied, onCopy };
};
