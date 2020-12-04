import React, { PropsWithChildren, forwardRef, ElementType } from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

import TableContext from './table-context';

const defaultBodyComponent = 'tbody';

interface TableBodyProps extends BoxProps {
	as?: ElementType;
}

const TableBody = forwardRef<any, PropsWithChildren<TableBodyProps>>(
	function TableHead(props, ref) {
		const { as: As = defaultBodyComponent, ...other } = props;

		return (
			<TableContext.Provider
				value={{
					variant: 'body',
				}}
			>
				<Box
					display="table-row-group"
					ref={ref}
					as={As}
					{...other}
					backgroundColor={useColorModeValue('white', 'gray.900')}
				/>
			</TableContext.Provider>
		);
	}
);

export default TableBody;
