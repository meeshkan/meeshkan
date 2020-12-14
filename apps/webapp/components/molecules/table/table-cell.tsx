import React, {
	useContext,
	ThHTMLAttributes,
	TdHTMLAttributes,
	PropsWithChildren,
} from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import TableContext from './table-context';

export type TableCellBaseProps = ThHTMLAttributes<HTMLTableHeaderCellElement> &
	TdHTMLAttributes<HTMLTableDataCellElement>;

const TableCell = ({
	children,
	as: As,
	...props
}: PropsWithChildren<BoxProps & TableCellBaseProps>) => {
	const table = useContext(TableContext);
	const isHeadCell = table?.variant === 'head';
	return (
		<Box
			as={As ? As : isHeadCell ? 'th' : 'td'}
			borderBottom={isHeadCell ? '1px solid' : undefined}
			borderBottomColor="gray.300"
			fontSize="sm"
			textAlign="left"
			px={4}
			py={2}
			whiteSpace="nowrap"
			/* The secret sauce */
			/* Each cell should grow equally */
			w="1%"
			/* But "collapsed" cells should be as small as possible */
			_last={{ w: '0.1%' }}
			{...props}
		>
			{children}
		</Box>
	);
};

export default TableCell;
