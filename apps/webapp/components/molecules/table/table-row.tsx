import React, { forwardRef } from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';

const defaultRowComponent = 'tr';

interface TableRowProps extends BoxProps {
	as?: React.ElementType;
	isSelected?: boolean;
}

const TableRow = forwardRef<typeof Box, TableRowProps>(function TableHead(
	props,
	ref
) {
	const { as: As = defaultRowComponent, isSelected, ...other } = props;

	return (
		<Box
			role="group"
			// @ts-ignore
			ref={ref}
			as={As}
			__hover={{
				cursor: 'pointer',
				backgroundColor: isSelected
					? 'pink.50'
					: useColorModeValue('gray.50', transparentize('gray.800', 0.5)),
			}}
			bg={isSelected ? 'pink.100' : undefined}
			{...other}
		/>
	);
});

export default TableRow;
