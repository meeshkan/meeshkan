import React, { useContext, useEffect, useMemo } from 'react';
import {
	Table as ChakraTable,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/table';
import { useTable, usePagination, useSortBy, Column } from 'react-table';
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
import { useRouter } from 'next/router';
import { createSlug } from '../../utils/createSlug';
import { UserContext } from '../../utils/user';
import {
	DoubleArrowLeftIcon,
	ArrowLeftIcon,
	DoubleArrowRightIcon,
	ArrowRightIcon,
} from '@frontend/chakra-theme';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

type TableProps = {
	columns: Column[];
	data: JSON[];
	fetchData: ({ pageSize, pageIndex }: any) => Promise<void>;
	loading?: boolean;
	pageCount: number;
};

const Table = ({
	columns,
	data,
	loading,
	pageCount: controlledPageCount,
	fetchData,
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
		// useSortBy,
		usePagination
	);

	useEffect(() => {
		fetchData({ pageIndex, pageSize });
	}, [fetchData, pageIndex, pageSize]);

	const { project } = useContext(UserContext);
	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);
	const router = useRouter();

	return (
		<>
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
									{
										...column.getHeaderProps(/*column.getSortByToggleProps()*/)
									}
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
								borderBottom="1px solid"
								borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
								_last={{ border: 0 }}
								_hover={{
									cursor: 'pointer',
									backgroundColor: useColorModeValue('gray.50', 'gray.800'),
									borderBottom: '1px solid',
									borderBottomColor: useColorModeValue('gray.100', 'gray.700'),
								}}
								onClick={() => {
									router.push(
										`/${slugifiedProjectName}/user-stories/${row.original.id}`
									);
								}}
							>
								{row.cells.map((cell) => {
									return (
										<Td border={0} {...cell.getCellProps()} py={3}>
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
								<Tr
									key={i}
									_hover={undefined}
									borderBottom="1px solid"
									borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
									_last={{ border: 0 }}
								>
									{columns.map((col, j) => {
										return (
											<Td key={col.id || j} py={3} border={0}>
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
								py={3}
								rowSpan={pageSize}
								colSpan={columns.length}
							>
								<Text fontSize="md">No User Stories</Text>
							</Td>
						</Tr>
					) : null}
				</Tbody>
			</ChakraTable>

			<Flex justifyContent="space-between" mt={4} alignItems="center" mx="auto">
				<Flex>
					<ButtonGroup isAttached colorScheme="gray" variant="link">
						<Tooltip label="First Page">
							<IconButton
								onClick={() => gotoPage(0)}
								isDisabled={!canPreviousPage}
								aria-label="First page"
								icon={<DoubleArrowLeftIcon h={4} w={4} />}
							/>
						</Tooltip>
						<Tooltip label="Previous Page">
							<IconButton
								onClick={previousPage}
								isDisabled={!canPreviousPage}
								aria-label="Previous page"
								icon={<ArrowLeftIcon h={4} w={4} />}
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
					{/* <Text>Go to page:</Text>{' '}
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
					</NumberInput> */}
					<Select
						size="sm"
						borderRadius="md"
						w={24}
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
					<ButtonGroup isAttached colorScheme="gray" variant="link">
						<Tooltip label="Next Page">
							<IconButton
								onClick={nextPage}
								isDisabled={!canNextPage}
								aria-label="Next page"
								icon={<ArrowRightIcon h={4} w={4} />}
							/>
						</Tooltip>
						<Tooltip label="Last Page">
							<IconButton
								onClick={() => gotoPage(pageCount - 1)}
								isDisabled={!canNextPage}
								aria-label="Last page"
								icon={<DoubleArrowRightIcon h={4} w={4} />}
							/>
						</Tooltip>
					</ButtonGroup>
				</Flex>
			</Flex>
		</>
	);
};

export default Table;
