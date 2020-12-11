import React from 'react';
import {
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	TableIconButton,
	TablePagination,
	LinearProgressBar,
} from '../molecules/table';
import ActionButton from '../atoms/action-button';
import {
	Text,
	Select,
	Stack,
	Box,
	Skeleton,
	useColorModeValue,
	ButtonGroup,
	Flex,
} from '@chakra-ui/react';
import {
	usePagination,
	useSortBy,
	useTable,
	Column,
	useMountedLayoutEffect,
} from 'react-table';
import { AnimatePresence } from 'framer-motion';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	DeleteIcon,
	EditIcon,
} from '@chakra-ui/icons';

type TableProps<T extends object = {}> = {
	data: any;
	initialPageSize?: number;
	initialPageIndex?: number;
	totalCount?: number;
	loading?: boolean;
	columns: Column<T>[];
	onPaginate?: ({
		pageIndex,
		pageSize,
	}: {
		pageIndex: number;
		pageSize: number;
	}) => void;
	onEdit?: (id: string) => void;
	onRemove?: (id: string) => void;
	getRowId?: (row: any, relativeIndex: number, parent: any) => string;
	defaultGroupByColumnIds?: string[];
	getRowProps?: (row: any) => void;
};

const defaultPropGetter = () => ({});

const Table = ({
	columns,
	data,
	initialPageIndex,
	initialPageSize,
	totalCount,
	loading,
	onPaginate,
	onRemove,
	onEdit,
	getRowId,
	getRowProps = defaultPropGetter,
}: TableProps) => {
	const controlledPageCount = totalCount
		? Math.ceil(totalCount / initialPageSize)
		: 1;

	const hasActions = !!(onEdit || onRemove);

	const _getRowId = () => {
		if (getRowId) {
			return getRowId;
		}
		return (row: any) => {
			return row.id;
		};
	};

	const {
		getTableProps,
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
		visibleColumns,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: initialPageIndex,
				pageSize: initialPageSize,
			},
			manualPagination: true,
			pageCount: controlledPageCount,
			getRowId: _getRowId(),
		},
		useSortBy,
		usePagination,

		// Here we will use a plugin to add our selection column
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				if (!hasActions) {
					return columns;
				}

				return [
					...columns,
					...(hasActions
						? [
								{
									id: 'actions',
									// Don't show any header
									Header: () => null,
									// Render action icons in every cell in the last column
									Cell: ({ row }: any) => (
										<Box
											display="flex"
											justifyContent="center"
											mx={1}
											opacity={0}
											_groupHover={{ opacity: 1 }}
										>
											{onEdit && (
												<ActionButton
													aria-label="Edit"
													icon={<EditIcon />}
													ml={1}
													onClick={() => {
														onEdit(row.id);
													}}
												/>
											)}
											{onRemove && (
												<ActionButton
													aria-label="Delete"
													icon={<DeleteIcon />}
													ml={1}
												/>
											)}
										</Box>
									),
								},
						  ]
						: []),
				];
			});
		}
	);

	// this prevents calling paginate on first mount
	useMountedLayoutEffect(() => {
		if (onPaginate) {
			onPaginate({ pageIndex, pageSize });
		}
	}, [onPaginate, pageIndex, pageSize]);

	return (
		<>
			<Box
				maxW="full"
				display="block"
				overflowX="auto"
				overflowY="auto"
				maxH="64vh"
				css={{
					'::-webkit-scrollbar': {
						width: 0,
						height: 0,
					},
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
			>
				<Box
					as="table"
					// Make sure the inner table is always as wide as needed
					w="full"
					{...(getTableProps() as any)}
				>
					<TableHead pos="sticky" top={0}>
						{headerGroups.map((headerGroup) => (
							<TableRow {...(headerGroup.getHeaderGroupProps() as any)}>
								{headerGroup.headers.map((column) => {
									return (
										<TableCell
											bg={useColorModeValue('gray.200', 'gray.700')}
											w="1%"
											{...(column.getHeaderProps() as any)}
											{...column.getSortByToggleProps()}
										>
											<Flex align="baseline">
												<Text fontSize="md" fontWeight="medium">
													{column.render('Header')}
												</Text>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<ChevronDownIcon size={20} />
													) : (
														<ChevronUpIcon size={20} />
													)
												) : (
													''
												)}
											</Flex>
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableHead>

					<TableBody>
						<AnimatePresence exitBeforeEnter>
							{loading && page.length > 0 && (
								<TableRow>
									<TableCell p={0} colSpan={visibleColumns.length}>
										<LinearProgressBar key="progress" />
									</TableCell>
								</TableRow>
							)}
						</AnimatePresence>
						{page.map((row, key) => {
							prepareRow(row);
							return (
								<TableRow
									key={key}
									// Merge user row props in
									{...(row.getRowProps() as any)}
									role="group"
								>
									{row.cells.map((cell) => {
										return (
											<TableCell
												w="1%"
												_last={hasActions ? { w: '0.1%', p: 0 } : undefined}
												whiteSpace="nowrap"
												{...(cell.getCellProps() as any)}
											>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
						{loading && page.length === 0 ? (
							[...Array(pageSize)].map((_, i) => {
								return (
									<TableRow key={i} _hover={undefined}>
										{columns.map((col, j) => {
											return (
												<TableCell key={col.id || j}>
													<Skeleton h={5} />
												</TableCell>
											);
										})}
										{hasActions && (
											<TableCell _last={{ w: '0.5%' }}>
												<Skeleton h={5} />
											</TableCell>
										)}
									</TableRow>
								);
							})
						) : page.length === 0 ? (
							<TableRow _hover={undefined}>
								<TableCell
									textAlign="center"
									p={4}
									rowSpan={pageSize}
									colSpan={hasActions ? columns.length + 1 : columns.length}
								>
									<Text fontSize="md">No Data</Text>
								</TableCell>
							</TableRow>
						) : null}
					</TableBody>
				</Box>
			</Box>
			{onPaginate && (
				<TablePagination
					justifyContent="center"
					flexDirection="row"
					roundedBottom="lg"
				>
					<Stack isInline spacing={2}>
						<ButtonGroup isAttached mr={4}>
							<TableIconButton
								onClick={() => gotoPage(0)}
								isDisabled={!canPreviousPage}
								icon={<ArrowLeftIcon />}
							/>
							<TableIconButton
								isDisabled={!canPreviousPage}
								onClick={() => previousPage()}
								icon={<ChevronLeftIcon />}
							/>
						</ButtonGroup>
					</Stack>
					<Stack isInline flexWrap="nowrap" justify="center" align="center">
						<Text whiteSpace="nowrap" fontSize="md">
							Page {pageIndex + 1} of {pageOptions.length}
						</Text>
						<Select
							size="sm"
							borderRadius="md"
							value={pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}
							isDisabled={loading}
						>
							{[5, 10, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</Select>
					</Stack>
					<Stack isInline spacing={2}>
						<ButtonGroup isAttached ml={4}>
							<TableIconButton
								isDisabled={!canNextPage}
								onClick={() => nextPage()}
								icon={<ChevronRightIcon />}
							/>
							<TableIconButton
								onClick={() => gotoPage(pageCount - 1)}
								isDisabled={!canNextPage}
								icon={<ArrowRightIcon />}
							/>
						</ButtonGroup>
					</Stack>
				</TablePagination>
			)}
		</>
	);
};

export default Table;
