import React, { FC } from 'react';
import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';

type TablePaginationProps = FlexProps;

const TablePagination: FC<TablePaginationProps> = ({ children, ...rest }) => {
	return (
		<Flex
			borderTopWidth="1px"
			overflowX="hidden"
			overflowY="hidden"
			backgroundColor={useColorModeValue('white', 'gray.900')}
			borderBottomRadius="lg"
			{...rest}
		>
			{children}
		</Flex>
	);
};

TablePagination.defaultProps = {
	p: 2,
	flexDirection: 'column',
};

export default TablePagination;
