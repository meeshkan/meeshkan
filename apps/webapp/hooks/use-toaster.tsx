import { useToast, IToast } from '@chakra-ui/react';

type ToasterProps = Omit<IToast, 'position' | 'isClosable' | 'variant'>;

export const useToaster = (options?: ToasterProps) => {
	return useToast({
		position: 'bottom-right',
		isClosable: true,
		variant: 'clean',
		...options
	});
};
