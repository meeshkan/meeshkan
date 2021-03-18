import { useToast } from '@chakra-ui/react';

type ToasterProps = {
	status?: 'success' | 'info' | 'warning' | 'error';
	title: string;
	description?: string;
};

export const useToaster = () => {
	const toast = useToast();

	const toaster = ({ status = 'info', title, description }: ToasterProps) => {
		toast({
			title: title,
			description: description ? description : null,
			status: status,
			position: 'bottom-right',
			isClosable: true,
			variant: 'clean',
		});
	};
	return toaster;
};
