import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import TableContext from './table-context';

const defaultHeadComponent = 'thead';

interface TableHeadProps extends BoxProps {
	as?: React.ElementType;
}

const TableHead = React.forwardRef<
	any,
	React.PropsWithChildren<TableHeadProps>
>(function TableHead(props, ref) {
	const { as: As = defaultHeadComponent, ...other } = props;

	return (
		<TableContext.Provider
			value={{
				variant: 'head',
			}}
		>
			<Box display="table-header-group" ref={ref} as={As} {...other} />
		</TableContext.Provider>
	);
});

export default TableHead;
