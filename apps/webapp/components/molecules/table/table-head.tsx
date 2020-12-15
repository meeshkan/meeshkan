import React, { PropsWithChildren, ElementType, forwardRef } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import TableContext from './table-context';

const DEFAULT_HEAD_COMPONENT = 'thead';

interface TableHeadProps extends BoxProps {
	as?: ElementType;
}

const TableHead = forwardRef<any, PropsWithChildren<TableHeadProps>>(
	function TableHead(props, ref) {
		const { as: As = DEFAULT_HEAD_COMPONENT, ...other } = props;

		return (
			<TableContext.Provider
				value={{
					variant: 'head',
				}}
			>
				<Box display="table-header-group" ref={ref} as={As} {...other} />
			</TableContext.Provider>
		);
	}
);

export default TableHead;
