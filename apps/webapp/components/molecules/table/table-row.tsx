import React, { forwardRef, ElementType } from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

const DEFAULT_ROW_COMPONENT = 'tr';

interface TableRowProps extends BoxProps {
	as?: ElementType;
	isSelected?: boolean;
}

const TableRow = forwardRef<typeof Box, TableRowProps>((props, ref) => {
	const { as: As = DEFAULT_ROW_COMPONENT, isSelected, ...other } = props;

	return (
		<Box
			role="group"
			// @ts-ignore
			ref={ref}
			as={As}
			_hover={{
				cursor: 'pointer',
				backgroundColor: isSelected
					? 'pink.50'
					: useColorModeValue('gray.50', 'gray.800'),
			}}
			bg={isSelected ? 'pink.100' : undefined}
			{...other}
		/>
	);
});

export default TableRow;
