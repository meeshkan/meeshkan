import React, { MouseEvent, FC, ReactElement } from 'react';
import { IconButton } from '@chakra-ui/react';

type TableIconButtonProps = {
	icon: ReactElement;
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
			aria-label="Table icon button"
		>
			{children}
		</IconButton>
	);
};

export default TableIconButton;
