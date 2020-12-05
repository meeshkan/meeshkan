import React, { MouseEvent, FC } from 'react';
import { IconButton } from '@chakra-ui/react';

type TableIconButtonProps = {
	icon: any;
	onClick: ((event: MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
	isDisabled: boolean;
	colorScheme?: string;
};

const TableIconButton: FC<TableIconButtonProps> = ({
	icon,
	onClick,
	isDisabled,
	children,
	colorScheme,
	...rest
}) => {
	return (
		<IconButton
			size="sm"
			{...rest}
			icon={icon}
			onClick={() => onClick}
			colorScheme="gray"
			variant="ghost"
			isDisabled={isDisabled}
			aria-label="Table Icon button"
		>
			{children}
		</IconButton>
	);
};

export default TableIconButton;
