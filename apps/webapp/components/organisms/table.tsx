import React, { useEffect } from 'react';
import ActionButton from '../atoms/action-button';
import {
	Table as ChakraTable,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/table';
import { useTable, usePagination } from 'react-table';
import { AnimatePresence } from 'framer-motion';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
} from '@chakra-ui/icons';
import {
	Flex,
	Text,
	IconButton,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Tooltip,
	useColorModeValue,
	NumberDecrementStepper,
} from '@chakra-ui/react';

const Table = ({
	columns,
	data,
	fetchData,
	loading,
	pageCount: controlledPageCount,
}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
			manualPagination: true,
			pageCount: controlledPageCount,
		},
		usePagination
	);

	useEffect(() => {
		fetchData({ pageIndex, pageSize });
	}, [fetchData, pageIndex, pageSize]);

	return (
		<>
			<ChakraTable
				{...getTableProps()}
				variant="simple"
				backgroundColor={useColorModeValue('white', 'gray.900')}
				borderRadius="lg"
			>
				<Thead>
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th {...column.getHeaderProps()}>
									{column.render('Header')}
									{/* Add a sort direction indicator */}
									{column.isSorted ? (
										column.isSortedDesc ? (
											<ChevronDownIcon ml={1} w={4} h={4} />
										) : (
											<ChevronUpIcon ml={1} w={4} h={4} />
										)
									) : (
										' '
									)}
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<Td {...cell.getCellProps()} py={3}>
											{cell.render('Cell')}
										</Td>
									);
								})}
							</Tr>
						);
					})}
				</Tbody>
			</ChakraTable>

			<Flex justifyContent="space-between" m={2} alignItems="center" w="100%">
				<Flex>
					<Tooltip label="First Page">
						<IconButton
							colorScheme="gray"
							onClick={() => gotoPage(0)}
							isDisabled={!canPreviousPage}
							aria-label=""
							icon={<ArrowLeftIcon h={3} w={3} />}
							mr={4}
						/>
					</Tooltip>
					<Tooltip label="Previous Page">
						<IconButton
							colorScheme="gray"
							onClick={previousPage}
							isDisabled={!canPreviousPage}
							aria-label=""
							icon={<ChevronLeftIcon h={6} w={6} />}
						/>
					</Tooltip>
				</Flex>

				<Flex alignItems="center">
					<Text mr={8}>
						Page{' '}
						<Text fontWeight="bold" as="span">
							{pageIndex + 1}
						</Text>{' '}
						of{' '}
						<Text fontWeight="bold" as="span">
							{controlledPageCount}
						</Text>
					</Text>
					<Text>Go to page:</Text>{' '}
					<NumberInput
						ml={2}
						mr={8}
						w={28}
						min={1}
						max={pageOptions.length}
						onChange={(value) => {
							const page = parseInt(value) >= 1 ? parseInt(value) - 1 : 0;
							gotoPage(page);
						}}
						defaultValue={pageIndex + 1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<Select
						w={32}
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</Select>
				</Flex>

				{/* <Flex mx={8} alignItems="center">
					<Text>Page:</Text>{' '}
					<NumberInput
						size="sm"
						mx={2}
						w={20}
						min={1}
						max={controlledPageCount}
						onChange={(value) => {
							const page = parseInt(value) >= 1 ? parseInt(value) - 1 : 1;
							gotoPage(page);
						}}
						defaultValue={pageIndex + 1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<Text fontWeight="bold" as="span">
						of {controlledPageCount}
					</Text>
				</Flex> */}

				<Flex>
					<Tooltip label="Next Page">
						<IconButton
							colorScheme="gray"
							onClick={nextPage}
							isDisabled={!canNextPage}
							aria-label=""
							icon={<ChevronRightIcon h={6} w={6} />}
						/>
					</Tooltip>
					<Tooltip label="Last Page">
						<IconButton
							colorScheme="gray"
							onClick={() => gotoPage(pageCount - 1)}
							isDisabled={!canNextPage}
							aria-label=""
							icon={<ArrowRightIcon h={3} w={3} />}
							ml={4}
						/>
					</Tooltip>
				</Flex>
			</Flex>
		</>
	);
};

export default Table;
