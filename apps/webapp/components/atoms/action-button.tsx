import React from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';

interface ActionButtonProps extends IconButtonProps {
	onClick?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
	'aria-label': string;
}

const ActionButton = ({ icon, onClick, ...props }: ActionButtonProps) => {
	return (
		<IconButton
			icon={icon}
			size="sm"
			colorScheme="gray"
			variant="ghost"
			onClick={(e) => {
				e.stopPropagation();
				onClick?.(e);
			}}
			{...props}
		/>
	);
};
export default ActionButton;
