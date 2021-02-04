import React, { useEffect } from 'react';
import ActionButton from '../atoms/action-button';
import {
	Table as ChakraTable,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/table';
import { useTable, usePagination, useSortBy, Column } from 'react-table';
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
	Skeleton,
	ButtonGroup,
} from '@chakra-ui/react';

type TableProps = {
	columns: Column[];
	data: JSON[];
	fetchData: ({ pageSize, pageIndex, ...rest }: any) => Promise<void>;
	loading?: boolean;
	pageCount: number;
};

const Table = ({
	columns,
	data,
	fetchData,
	loading,
	pageCount: controlledPageCount,
}: TableProps) => {
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
		useSortBy,
		usePagination
	);

	useEffect(() => {
		fetchData({ pageIndex, pageSize });
	}, [fetchData, pageIndex, pageSize]);

	return (
		<>
			<pre>
				<code>
					{JSON.stringify(
						{
							pageIndex,
							pageSize,
							pageCount,
							canNextPage,
							canPreviousPage,
						},
						null,
						2
					)}
				</code>
			</pre>

			<ChakraTable
				{...getTableProps()}
				variant="simple"
				backgroundColor={useColorModeValue('white', 'gray.900')}
				borderTopRightRadius="lg"
				borderBottomRadius="lg"
			>
				<Thead>
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									fontSize="10px"
								>
									{column.render('Header')}
									{/* Add a sort direction indicator */}
									{column.isSorted ? (
										column.isSortedDesc ? (
											<ChevronDownIcon
												aria-label="Decending"
												ml={1}
												w={4}
												h={4}
											/>
										) : (
											<ChevronUpIcon
												aria-label="Ascending"
												ml={1}
												w={4}
												h={4}
											/>
										)
									) : (
										<ChevronDownIcon
											aria-label="placeholder"
											ml={1}
											w={4}
											h={4}
											color="transparent"
										/>
									)}
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()} fontSize="sm">
					{page.map((row) => {
						prepareRow(row);
						return (
							<Tr
								{...row.getRowProps()}
								_hover={{
									cursor: 'pointer',
									backgroundColor: useColorModeValue('gray.50', 'gray.800'),
								}}
							>
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

					{loading && page.length === 0 ? (
						[...Array(pageSize)].map((_, i) => {
							return (
								<Tr key={i} _hover={undefined}>
									{columns.map((col, j) => {
										return (
											<Td key={col.id || j}>
												<Skeleton h={5} />
											</Td>
										);
									})}
								</Tr>
							);
						})
					) : page.length === 0 ? (
						<Tr _hover={undefined}>
							<Td
								textAlign="center"
								p={4}
								rowSpan={pageSize}
								colSpan={columns.length}
							>
								<Text fontSize="md">No Data</Text>
							</Td>
						</Tr>
					) : null}
				</Tbody>
			</ChakraTable>

			<Flex justifyContent="space-between" m={2} alignItems="center" mx="auto">
				<Flex>
					<ButtonGroup isAttached>
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
					</ButtonGroup>
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
						w={20}
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
						defaultValue={10}
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

				<Flex>
					<ButtonGroup isAttached>
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
					</ButtonGroup>
				</Flex>
			</Flex>
		</>
	);
};

export default Table;
